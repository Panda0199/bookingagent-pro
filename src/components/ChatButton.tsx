import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatButton = () => {
  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 p-0 shadow-xl animate-float"
      onClick={() => alert("Chat assistant coming soon!")}
      aria-label="Chat with Assistant"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default ChatButton;
