import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export const handler = async (event: any) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const { message, systemPrompt, bookingMode, faqContent, services } = body;

    const isEstonian =
      /[õäöüÕÄÖÜ]/.test(message) ||
      message.toLowerCase().includes("broneeri") ||
      message.toLowerCase().includes("millised") ||
      message.toLowerCase().includes("homme") ||
      message.toLowerCase().includes("saadaval") ||
      message.toLowerCase().includes("kell");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const today = new Date().toISOString().split("T")[0];

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      tools: [
        {
          type: "function",
          name: "check_availability",
          description: "Check available time slots for a given date",
          strict: true,
          parameters: {
            type: "object",
            properties: {
              date: { type: "string" },
            },
            required: ["date"],
            additionalProperties: false,
          },
        },
        {
          type: "function",
          name: "create_booking",
          description: "Create a new booking",
          strict: true,
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              service: { type: "string" },
              date: { type: "string" },
              time: { type: "string" },
            },
            required: ["name", "email", "service", "date", "time"],
            additionalProperties: false,
          },
        },
        {
          type: "function",
          name: "get_business_info",
          description: "Answer business FAQs using the CMS knowledge",
          strict: true,
          parameters: {
            type: "object",
            properties: {},
            additionalProperties: false,
          },
        },
      ],
      input: [
        {
          role: "system",
          content: `
Current date: ${today}

${systemPrompt || "You are a professional receptionist."}

Business FAQ:
${faqContent || "No extra FAQ provided."}

Booking mode:
${bookingMode || "full_booking"}

Available services:
${JSON.stringify(services || [], null, 2)}

Rules:
- Today's date is ${today}
- When user says "tomorrow", calculate it from today's date
- Use realistic future dates, not past years
- If the user asks about services or business details, answer clearly
- If the user asks about availability, use check_availability
- If the user provides booking details, use create_booking
- Always reply in the same language as the user
- If the user writes in Estonian, reply only in Estonian
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const functionCall = response.output.find(
      (item: any) => item.type === "function_call"
    ) as any;

    if (functionCall?.name === "check_availability") {
      const args = JSON.parse(functionCall.arguments || "{}");

      const { data: existingBookings } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("booking_date", args.date);

      const allSlots = ["10:00", "12:00", "14:00", "16:00"];
      const bookedTimes = existingBookings?.map((b) => b.booking_time) || [];
      const availableSlots = allSlots.filter(
        (slot) => !bookedTimes.includes(slot)
      );

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply: availableSlots.length
            ? isEstonian
              ? `Saadaval ajad kuupäeval ${args.date}: ${availableSlots.join(", ")}`
              : `Available times on ${args.date}: ${availableSlots.join(", ")}`
            : isEstonian
            ? `Kuupäeval ${args.date} ei ole vabu aegu`
            : `No availability on ${args.date}`,
        }),
      };
    }

    if (functionCall?.name === "create_booking") {
      const args = JSON.parse(functionCall.arguments || "{}");

      const { data: service } = await supabase
        .from("services")
        .select("*")
        .ilike("name", `%${args.service}%`)
        .limit(1)
        .single();

      if (!service) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reply: isEstonian
              ? `Teenust "${args.service}" ei leitud.`
              : `Service "${args.service}" not found.`,
          }),
        };
      }

      const { data: existingBooking } = await supabase
        .from("bookings")
        .select("id")
        .eq("booking_date", args.date)
        .eq("booking_time", args.time)
        .limit(1)
        .maybeSingle();

      if (existingBooking) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reply: isEstonian
              ? `Vabandust, ${args.time} kuupäeval ${args.date} on juba broneeritud. Palun vali teine aeg.`
              : `Sorry, ${args.time} on ${args.date} is already booked. Please choose another available time.`,
          }),
        };
      }

      await supabase.from("bookings").insert([
        {
          customer_name: args.name,
          customer_email: args.email,
          service_name: service.name,
          service_id: service.id,
          booking_date: args.date,
          booking_time: args.time,
          status: "confirmed",
          created_by: "ai",
        },
      ]);

      console.log("about to call send-booking-email");

      const siteUrl =
  process.env.URL || "http://localhost:8888";

const emailResponse = await fetch(
  `${siteUrl}/.netlify/functions/send-booking-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: args.name,
            customerEmail: args.email,
            serviceName: service.name,
            bookingDate: args.date,
            bookingTime: args.time,
            ownerEmail: process.env.OWNER_EMAIL,
            teamSlug: process.env.TEAM_SLUG || "team",
          }),
        }
      );

      const emailData = await emailResponse.json();
      console.log("email function status:", emailResponse.status);
      console.log("email function response:", emailData);

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply: isEstonian
            ? `Broneering kinnitatud: ${args.name}, ${args.date} kell ${args.time}, teenus: ${service.name}.`
            : `Booking confirmed for ${args.name} on ${args.date} at ${args.time} for ${service.name}.`,
        }),
      };
    }

    if (functionCall?.name === "get_business_info") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply:
            faqContent ||
            (isEstonian
              ? "Pakume teenuseid ettetellimisel. Küsi hindade, kestuse ja saadavuse kohta."
              : "We offer services by appointment. Please ask about pricing, duration, and availability."),
        }),
      };
    }

    const reply =
      response.output_text?.trim() ||
      (isEstonian
        ? "Vabandust, ma ei suutnud vastust koostada."
        : "Sorry, I could not generate a response.");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (error: any) {
    console.error("chat-handler error:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error?.message || "Server error",
      }),
    };
  }
};