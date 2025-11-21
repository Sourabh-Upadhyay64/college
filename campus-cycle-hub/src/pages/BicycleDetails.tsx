import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Flag, Edit, Trash2 } from "lucide-react";

const BicycleDetails = () => {
  const { id } = useParams();
  const isOwner = false; // This would come from auth context

  // Mock data
  const bicycle = {
    id: "1",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1200",
    ],
    title: "Mountain Bike - Trek X5",
    price: 15000,
    condition: "Good",
    type: "Mountain Bike",
    gearType: "21-Speed Gear",
    purchaseYear: "2022",
    description:
      "Well-maintained mountain bike perfect for campus trails and city roads. Smooth gears, comfortable seat, and excellent brakes. Regularly serviced. Selling because graduating soon.",
    seller: {
      name: "Rahul S.",
      email: "r***l@college.edu",
    },
  };

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
                  src={bicycle.images[0]}
                  alt={bicycle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {bicycle.images.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img src={img} alt={`View ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
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
                <h3 className="font-semibold mb-2">Seller Information</h3>
                <p className="text-sm text-muted-foreground mb-1">{bicycle.seller.name}</p>
                <p className="text-sm text-muted-foreground">{bicycle.seller.email}</p>
              </Card>

              {isOwner ? (
                <div className="flex gap-3">
                  <Button className="flex-1 rounded-full" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Listing
                  </Button>
                  <Button className="flex-1 rounded-full" variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full rounded-full bg-gradient-primary border-0" size="lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with Seller
                  </Button>
                  <Button variant="outline" className="w-full rounded-full" size="lg">
                    <Flag className="w-4 h-4 mr-2" />
                    Report Listing
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
