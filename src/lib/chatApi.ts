export const sendChatMessageToAI = async ({
  message,
  systemPrompt,
  bookingMode,
  faqContent,
  services,
}: {
  message: string;
  systemPrompt: string;
  bookingMode: string;
  faqContent: string;
  services: any[];
}) => {
  const response = await fetch("/.netlify/functions/chat-handler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      systemPrompt,
      bookingMode,
      faqContent,
      services,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to get AI response");
  }

  return data.reply as string;
};