import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MyListings = () => {
  // Mock data
  const listings = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1586343797367-c8942268df67?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Wireless Headphones - Sony",
      price: 4000,
      status: "Active",
      condition: "Good",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1679309981674-cef0e23a7864?q=80&w=1762&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Study Table - Wooden",
      price: 5000,
      status: "Sold",
      condition: "New",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 animate-fade-in-up flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                My Listings
              </h1>
              <p className="text-muted-foreground">
                Manage your product listings
              </p>
            </div>
            <Link to="/sell">
              <Button className="rounded-full bg-gradient-primary border-0">
                Add New Product
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {listings.map((listing, index) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-medium transition-shadow animate-fade-in-up border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 aspect-[4/3] md:aspect-square bg-muted">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <h3 className="text-xl font-semibold">
                              {listing.title}
                            </h3>
                            <Badge
                              className={
                                listing.status === "Active"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {listing.status}
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-primary mb-2">
                            ₹{listing.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Condition: {listing.condition}
                          </p>
                        </div>

                        <div className="flex md:flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full flex-1 md:flex-none"
                          >
                            <Edit className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground flex-1 md:flex-none"
                          >
                            <Trash2 className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Delete</span>
                          </Button>
                          {listing.status === "Active" && (
                            <Button
                              variant="default"
                              size="sm"
                              className="rounded-full flex-1 md:flex-none"
                            >
                              <CheckCircle className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">
                                Mark Sold
                              </span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyListings;
