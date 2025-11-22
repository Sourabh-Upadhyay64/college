import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

    fetchChats();
  }, []);

  const fetchChats = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/chats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setChats(data.data.chats);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load chats",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast({
        title: "Error",
        description: "Failed to load chats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOtherUser = (chat: any) => {
    return currentUser?.id === chat.buyer._id ? chat.seller : chat.buyer;
  };

  const getLastMessage = (chat: any) => {
    if (chat.messages.length === 0) return "No messages yet";
    const lastMsg = chat.messages[chat.messages.length - 1];
    return lastMsg.content;
  };

  const getUnreadCount = (chat: any) => {
    if (!currentUser) return 0;
    return chat.messages.filter((msg: any) => 
      msg.sender._id !== currentUser.id && !msg.read
    ).length;
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading chats...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">
              Conversations about your bicycles
            </p>
          </div>

          {chats.length === 0 ? (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                <p className="text-sm">
                  Start a conversation by contacting a seller or wait for buyers to reach out.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => {
                const otherUser = getOtherUser(chat);
                const lastMessage = getLastMessage(chat);
                const unreadCount = getUnreadCount(chat);

                return (
                  <Card
                    key={chat._id}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/chat/${chat._id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>
                          {otherUser.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">
                              {otherUser.name}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate">
                              {otherUser.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTime(chat.lastMessage)}
                            </span>
                            {unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {unreadCount > 9 ? '9+' : unreadCount}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground truncate">
                            {chat.bicycle.title}
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            ₹{chat.bicycle.price?.toLocaleString()}
                          </span>
                        </div>

                        <p className={`text-sm truncate ${unreadCount > 0 ? 'font-semibold' : 'text-muted-foreground'}`}>
                          {lastMessage}
                        </p>
                      </div>

                      {chat.bicycle.images?.[0] && (
                        <img
                          src={chat.bicycle.images[0]}
                          alt={chat.bicycle.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;
