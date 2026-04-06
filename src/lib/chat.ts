import { supabase } from "./supabase";

export const createSessionId = () => {
  const existing = localStorage.getItem("bookingagent_session_id");
  if (existing) return existing;

  const newId = crypto.randomUUID();
  localStorage.setItem("bookingagent_session_id", newId);
  return newId;
};

export const saveChatMessage = async ({
  session_id,
  role,
  message,
  detected_language,
  tool_called,
}: {
  session_id: string;
  role: string;
  message: string;
  detected_language?: string;
  tool_called?: string | null;
}) => {
  const { error } = await supabase.from("chat_history").insert([
    {
      session_id,
      role,
      message,
      detected_language: detected_language || "en",
      tool_called: tool_called || null,
    },
  ]);

  if (error) throw error;
};

export const getChatHistory = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("chat_history")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
};