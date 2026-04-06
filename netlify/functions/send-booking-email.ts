import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
  try {
    console.log("send-booking-email invoked");

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    console.log("send-booking-email body:", body);

    const {
      customerName,
      customerEmail,
      serviceName,
      bookingDate,
      bookingTime,
      ownerEmail,
      teamSlug,
    } = body;

    const subject = `[BOOKING-2026] ${teamSlug} Booking Confirmation`;

    const customerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Booking Confirmed</h2>
        <p>Hello ${customerName},</p>
        <p>Your booking has been confirmed.</p>
        <ul>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${bookingDate}</li>
          <li><strong>Time:</strong> ${bookingTime}</li>
        </ul>
        <p>We look forward to seeing you.</p>
      </div>
    `;

    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Booking Received</h2>
        <ul>
          <li><strong>Customer:</strong> ${customerName}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${bookingDate}</li>
          <li><strong>Time:</strong> ${bookingTime}</li>
        </ul>
      </div>
    `;

    const customerResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: customerEmail,
      subject,
      html: customerHtml,
    });

    console.log("customer email result:", customerResult);

    const ownerResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: ownerEmail,
      subject,
      html: ownerHtml,
    });

    console.log("owner email result:", ownerResult);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        customerResult,
        ownerResult,
      }),
    };
  } catch (error: any) {
    console.error("send-booking-email error:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: error?.message || "Email sending failed",
      }),
    };
  }
};