import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ArrowLeft, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/config/api";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [chat, setChat] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }

    fetchChat();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChat = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/api/chats/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setChat(data.data.chat);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load chat",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      toast({
        title: "Error",
        description: "Failed to load chat",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || sending) return;

    const token = localStorage.getItem('token');
    setSending(true);

    try {
      const response = await fetch(`${API_URL}/api/chats/${id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: message })
      });

      const data = await response.json();

      if (data.success) {
        setChat(data.data.chat);
        setMessage("");
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading chat...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Chat Not Found</h2>
            <p className="text-muted-foreground mb-4">The chat you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/explore')}>Back to Explore</Button>
          </div>
        </div>
      </div>
    );
  }

  const otherUser = currentUser?.id === chat.buyer._id ? chat.seller : chat.buyer;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20 pb-4 px-4">
        <div className="container mx-auto max-w-4xl h-full flex flex-col">
          {/* Chat Header */}
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar>
                  <AvatarFallback>
                    {otherUser.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{otherUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{otherUser.email}</p>
                </div>
              </div>
              
              {/* Bicycle Info */}
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
                onClick={() => navigate(`/bicycle/${chat.bicycle._id}`)}
              >
                <img 
                  src={chat.bicycle.images?.[0] || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100"} 
                  alt={chat.bicycle.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="text-right">
                  <p className="text-sm font-medium line-clamp-1">{chat.bicycle.title}</p>
                  <p className="text-sm text-primary font-semibold">₹{chat.bicycle.price?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Messages Container */}
          <Card className="flex-1 p-4 overflow-hidden flex flex-col" style={{maxHeight: 'calc(100vh - 250px)'}}>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chat.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                </div>
              ) : (
                chat.messages.map((msg: any, index: number) => {
                  const isOwnMessage = msg.sender._id === currentUser?.id;
                  
                  return (
                    <div
                      key={index}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {msg.sender.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className={`p-3 rounded-2xl ${
                              isOwnMessage
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm break-words">{msg.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 px-2">
                            {new Date(msg.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                disabled={sending}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!message.trim() || sending}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
