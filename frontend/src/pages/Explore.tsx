import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BicycleCard from "@/components/BicycleCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Bicycle {
  _id: string;
  title: string;
  price: number;
  condition: "new" | "good" | "used";
  type: string;
  images: string[];
}

const Explore = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    condition: "all",
    type: "all",
    sort: "-createdAt",
  });
  const { toast } = useToast();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_ENDPOINT = `${API_BASE}/api/bicycles`;

  useEffect(() => {
    fetchBicycles();
  }, [filters, priceRange]);

  const fetchBicycles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.condition !== "all") params.append("condition", filters.condition);
      if (filters.type !== "all") params.append("type", filters.type);
      if (filters.search) params.append("search", filters.search);
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
      params.append("sort", filters.sort);

      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setBicycles(data.data.bicycles);
      } else {
        toast({
          title: "Error",
          description: "Failed to load bicycles",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                    <Input 
                      placeholder="Search bicycles..." 
                      className="pl-10 rounded-lg"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Condition</Label>
                  <Select value={filters.condition} onValueChange={(value) => setFilters({ ...filters, condition: value })}>
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
                  <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
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
                  <Select value={filters.sort} onValueChange={(value) => setFilters({ ...filters, sort: value })}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-createdAt">Most Recent</SelectItem>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                      <SelectItem value="-price">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Bicycle Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : bicycles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No bicycles found</p>
                  <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {bicycles.map((bicycle, index) => (
                    <div
                      key={bicycle._id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <BicycleCard 
                        id={bicycle._id}
                        image={bicycle.images[0] || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800"}
                        title={bicycle.title}
                        price={bicycle.price}
                        condition={bicycle.condition}
                        type={bicycle.type}
                      />
                    </div>
                  ))}
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

export default Explore;
