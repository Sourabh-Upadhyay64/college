import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BicycleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bicycle, setBicycle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Get current user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }

    // Fetch bicycle details
    fetchBicycleDetails();
  }, [id]);

  const fetchBicycleDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bicycles/${id}`);
      const data = await response.json();

      if (data.success) {
        setBicycle(data.data.bicycle);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load bicycle details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching bicycle:', error);
      toast({
        title: "Error",
        description: "Failed to load bicycle details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChatWithSeller = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to chat with the seller",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bicycleId: id })
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/chat/${data.data.chat._id}`);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to start chat",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      toast({
        title: "Error",
        description: "Failed to start chat",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading bicycle details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!bicycle) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Bicycle Not Found</h2>
            <p className="text-muted-foreground mb-4">The bicycle you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/explore')}>Back to Explore</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isOwner = currentUser && bicycle.seller && currentUser.id === bicycle.seller._id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-medium">
                <img
                  src={bicycle.images[currentImageIndex] || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200"}
                  alt={bicycle.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setCurrentImageIndex((currentImageIndex + 1) % bicycle.images.length)}
                />
              </div>
              {bicycle.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {bicycle.images.map((img: string, index: number) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer transition-all ${
                        currentImageIndex === index ? 'ring-2 ring-primary' : 'hover:opacity-80'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-3xl font-bold">{bicycle.title}</h1>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {bicycle.condition}
                  </Badge>
                </div>
                <p className="text-4xl font-bold text-primary">₹{bicycle.price.toLocaleString()}</p>
              </div>

              <Card className="p-6 space-y-4 border-border/50">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Type</p>
                    <p className="font-medium">{bicycle.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Gear</p>
                    <p className="font-medium">{bicycle.gearType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Purchase Year</p>
                    <p className="font-medium">{bicycle.purchaseYear}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Condition</p>
                    <p className="font-medium">{bicycle.condition}</p>
                  </div>
                </div>
              </Card>

              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{bicycle.description}</p>
              </div>

              <Card className="p-6 bg-muted/30 border-border/50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Seller Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{bicycle.seller?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{bicycle.seller?.email}</span>
                  </div>
                  {bicycle.seller?.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{bicycle.seller?.phone}</span>
                    </div>
                  )}
                </div>
              </Card>

              {!isOwner && (
                <div className="space-y-3">
                  <Button 
                    className="w-full rounded-full bg-gradient-primary border-0" 
                    size="lg"
                    onClick={handleChatWithSeller}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with Seller
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BicycleDetails;
