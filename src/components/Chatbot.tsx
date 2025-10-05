import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { askGemini } from "@/lib/gemini";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      // Prompt engineering: always instruct Gemini to answer as a space weather/NASA expert for kids
      const prompt = `You are "AstroBot", a friendly chatbot for kids, expert in space weather. Use real NASA data and simple language.\n\nUser: ${input}\n\nAstroBot:`;
      const answer = await askGemini(prompt);
      setMessages((msgs) => [...msgs, { role: "bot", text: answer || "Sorry, I couldn't find an answer." }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-aurora p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => setOpen(true)}
        aria-label="Open AstroBot Chatbot"
      >
        <Sparkles className="h-7 w-7 text-white" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>AstroBot: Space Weather Chat</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto mb-2">
            {messages.length === 0 && (
              <div className="text-muted-foreground text-center text-sm">Ask me anything about the Sun, solar flares, auroras, or NASA space weather!</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
                <span className={msg.role === "user" ? "bg-primary text-white px-2 py-1 rounded-lg inline-block" : "bg-muted px-2 py-1 rounded-lg inline-block"}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">AstroBot is thinking...</div>}
          </div>
          <DialogFooter>
            <form
              className="flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                className="flex-1 border rounded px-2 py-1"
                type="text"
                placeholder="Type your question..."
                value={input}
                style={{ color: "black" }}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                Send
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
