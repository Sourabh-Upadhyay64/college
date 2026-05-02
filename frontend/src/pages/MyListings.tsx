import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Product {
  _id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  images: string[];
  status: string;
}

const MyListings = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to view your listings",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/products/my-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setListings(data.data.products);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load your listings",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fetch listings error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Success",
          description: "Listing deleted successfully",
        });
        fetchMyListings(); // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete listing",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  const handleMarkSold = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "sold" }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Success",
          description: "Product marked as sold",
        });
        fetchMyListings(); // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 animate-fade-in-up flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Listings</h1>
              <p className="text-muted-foreground">Manage your product listings</p>
            </div>
            <Link to="/sell">
              <Button className="rounded-full bg-gradient-primary border-0">Add New Listing</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">You haven't listed any products yet</p>
                <Link to="/sell">
                  <Button className="rounded-full bg-gradient-primary border-0">
                    List Your First Product
                  </Button>
                </Link>
              </div>
            ) : (
              listings.map((listing, index) => (
                <Card
                  key={listing._id}
                  className="overflow-hidden hover:shadow-medium transition-shadow animate-fade-in-up border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 aspect-[4/3] md:aspect-square bg-muted">
                        <img
                          src={listing.images[0] || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400"}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="text-xl font-semibold">{listing.title}</h3>
                              <Badge
                                className={
                                  listing.status === "available"
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-muted text-muted-foreground"
                                }
                              >
                                {listing.status === "available" ? "Active" : listing.status}
                              </Badge>
                            </div>
                            <p className="text-2xl font-bold text-primary mb-2">
                              ₹{listing.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">
                              Condition: {listing.condition}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Category: {listing.category}
                            </p>
                          </div>

                          <div className="flex md:flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground flex-1 md:flex-none"
                              onClick={() => handleDelete(listing._id)}
                            >
                              <Trash2 className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">Delete</span>
                            </Button>
                            {listing.status === "available" && (
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-full flex-1 md:flex-none"
                                onClick={() => handleMarkSold(listing._id)}
                              >
                                <CheckCircle className="w-4 h-4 md:mr-2" />
                                <span className="hidden md:inline">Mark Sold</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyListings;
