import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Image } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState("");

  // Mock data
  const messages = [
    {
      id: "1",
      sender: "buyer",
      text: "Hi, is this bicycle still available?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: "seller",
      text: "Yes, it's available! Would you like to see it?",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      sender: "buyer",
      text: "Great! Can we meet tomorrow at the campus ground?",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      sender: "seller",
      text: "Sure, how about 4 PM?",
      timestamp: "10:36 AM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-4 px-4 h-screen flex flex-col">
        <div className="container mx-auto max-w-4xl flex-1 flex flex-col">
          <div className="mb-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Back to listings
            </Link>
          </div>

          <Card className="flex-1 flex flex-col shadow-medium border-border/50 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  R
                </div>
                <div>
                  <h3 className="font-semibold">Rahul S.</h3>
                  <p className="text-sm text-muted-foreground">Mountain Bike - Trek X5</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.sender === "seller"
                        ? "bg-gradient-primary text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "seller" ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full shrink-0">
                  <Image className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="rounded-full"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-full bg-gradient-primary border-0 shrink-0"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
