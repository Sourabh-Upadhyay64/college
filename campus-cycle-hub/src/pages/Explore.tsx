import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BicycleCard from "@/components/BicycleCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const Explore = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // Mock data
  const bicycles = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
      title: "Mountain Bike - Trek X5",
      price: 15000,
      condition: "Good" as const,
      type: "Mountain Bike",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
      title: "City Cruiser - Hero Urban",
      price: 8000,
      condition: "New" as const,
      type: "City Bike",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800",
      title: "Road Bike - Specialized",
      price: 25000,
      condition: "Good" as const,
      type: "Road Bike",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?w=800",
      title: "Hybrid Cycle - Firefox",
      price: 12000,
      condition: "Used" as const,
      type: "Hybrid",
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800",
      title: "Electric Bike - Atlas E-Ride",
      price: 35000,
      condition: "New" as const,
      type: "Electric",
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=800",
      title: "BMX Bike - Mongoose",
      price: 9000,
      condition: "Good" as const,
      type: "BMX",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Bicycles</h1>
            <p className="text-muted-foreground">Find your perfect ride on campus</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-6 sticky top-24">
                <div>
                  <Label className="mb-3 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search bicycles..." className="pl-10 rounded-lg" />
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Condition</Label>
                  <Select>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="All conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All conditions</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">Bike Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="mountain">Mountain Bike</SelectItem>
                      <SelectItem value="road">Road Bike</SelectItem>
                      <SelectItem value="city">City Bike</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    min={0}
                    max={50000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Sort By</Label>
                  <Select defaultValue="recent">
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="low">Price: Low to High</SelectItem>
                      <SelectItem value="high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bicycle Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {bicycles.map((bicycle, index) => (
                  <div
                    key={bicycle.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <BicycleCard {...bicycle} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
