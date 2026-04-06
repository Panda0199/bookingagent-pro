import { useEffect, useRef, useState } from "react";
import { createSessionId, getChatHistory, saveChatMessage } from "@/lib/chat";
import { sendChatMessageToAI } from "@/lib/chatApi";
import { useServices } from "@/hooks/useServices";
import { useAgentSettings } from "@/hooks/useAgentSettings";

type ChatMessage = {
  id: string;
  role: string;
  message: string;
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: services } = useServices();
  const { data: agentSettings } = useAgentSettings();

  useEffect(() => {
    const id = createSessionId();
    setSessionId(id);
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      if (!sessionId) return;

      try {
        const history = await getChatHistory(sessionId);
        const formatted = (history || []).map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          message: msg.message,
        }));
        setMessages(formatted);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };

    loadHistory();
  }, [sessionId, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || !sessionId) return;

    setSending(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      message: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      await saveChatMessage({
        session_id: sessionId,
        role: "user",
        message: trimmed,
        detected_language: "en",
        tool_called: null,
      });

      const aiReply = await sendChatMessageToAI({
        message: trimmed,
        systemPrompt:
          agentSettings?.system_prompt ||
          "You are a professional receptionist.",
        bookingMode: agentSettings?.booking_mode || "full_booking",
        faqContent: agentSettings?.faq_content || "",
        services: services || [],
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        message: aiReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      await saveChatMessage({
        session_id: sessionId,
        role: "assistant",
        message: aiReply,
        detected_language: "en",
        tool_called: null,
      });
    } catch (error: any) {
      console.error("Chat send failed:", error);

      const errorText =
        error?.message ||
        "Sorry, something went wrong while contacting the assistant.";

      const assistantErrorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        message: errorText,
      };

      setMessages((prev) => [...prev, assistantErrorMessage]);

      try {
        await saveChatMessage({
          session_id: sessionId,
          role: "assistant",
          message: errorText,
          detected_language: "en",
          tool_called: null,
        });
      } catch (saveError) {
        console.error("Failed to save assistant error message:", saveError);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black text-white px-5 py-3 shadow-lg"
      >
        {isOpen ? "Close Chat" : "Chat with Assistant"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border bg-white shadow-2xl">
          <div className="border-b px-4 py-3">
            <h3 className="font-semibold">BookingAgent Pro Assistant</h3>
            <p className="text-xs text-gray-500">
              Ask about services, availability, or appointments
            </p>
          </div>

          <div className="h-[360px] overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-sm text-gray-500">
                Hello. How can I help you today?
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-black text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.message}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t p-3 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={sending}
              className="rounded-xl bg-black text-white px-4 py-2 text-sm"
            >
              {sending ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;