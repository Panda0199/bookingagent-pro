import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "@/lib/chat";

export const useChatHistory = (sessionId: string) => {
  return useQuery({
    queryKey: ["chat-history", sessionId],
    queryFn: () => getChatHistory(sessionId),
    enabled: !!sessionId,
  });
};