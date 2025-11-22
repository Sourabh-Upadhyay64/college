import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Sell = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    condition: "",
    type: "",
    gearType: "",
    purchaseYear: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/bicycles";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const newImageFiles = [...imageFiles, ...filesArray].slice(0, 5);
      const newImages = newImageFiles.map((file) => URL.createObjectURL(file));
      setImageFiles(newImageFiles);
      setImages(newImages);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const convertImagesToBase64 = async (files: File[]): Promise<string[]> => {
    const promises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to list your bicycle",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Validation
    if (imageFiles.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    if (!formData.condition || !formData.type || !formData.gearType) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Convert images to base64
      const base64Images = await convertImagesToBase64(imageFiles);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          condition: formData.condition,
          type: formData.type,
          gearType: formData.gearType,
          purchaseYear: Number(formData.purchaseYear),
          images: base64Images,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Success! 🎉",
          description: "Your bicycle has been listed successfully",
        });
        
        // Reset form
        setFormData({
          title: "",
          price: "",
          condition: "",
          type: "",
          gearType: "",
          purchaseYear: "",
          description: "",
        });
        setImages([]);
        setImageFiles([]);

        // Redirect to explore page
        setTimeout(() => {
          navigate("/explore");
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to list bicycle",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("List bicycle error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server. Please try again.",
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
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sell Your Bicycle</h1>
            <p className="text-muted-foreground">List your bicycle in under 2 minutes</p>
          </div>

          <Card className="p-6 md:p-8 shadow-medium border-border/50 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label className="mb-3 block">Photos (up to 5)</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                      <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-secondary transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 bg-muted/30">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Bicycle Model / Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Trek Mountain Bike X5" 
                    required 
                    className="rounded-lg"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="15000" 
                    required 
                    className="rounded-lg"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select 
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="condition" className="rounded-lg">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Bicycle Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="type" className="rounded-lg">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mountain">Mountain Bike</SelectItem>
                      <SelectItem value="road">Road Bike</SelectItem>
                      <SelectItem value="city">City Bike</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="bmx">BMX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gear">Gear Type</Label>
                  <Select
                    value={formData.gearType}
                    onValueChange={(value) => setFormData({ ...formData, gearType: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="gear" className="rounded-lg">
                      <SelectValue placeholder="Select gear type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-gear">No Gear</SelectItem>
                      <SelectItem value="single">Single Speed</SelectItem>
                      <SelectItem value="7-speed">7-Speed</SelectItem>
                      <SelectItem value="21-speed">21-Speed</SelectItem>
                      <SelectItem value="24-speed">24-Speed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Purchase Year</Label>
                  <Input 
                    id="year" 
                    type="number" 
                    placeholder="2022" 
                    min="1990" 
                    max={new Date().getFullYear()} 
                    required 
                    className="rounded-lg"
                    value={formData.purchaseYear}
                    onChange={(e) => setFormData({ ...formData, purchaseYear: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your bicycle's condition, features, and reason for selling..."
                  rows={5}
                  required
                  className="rounded-lg resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-full bg-gradient-primary border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Listing Bicycle...
                    </>
                  ) : (
                    "List Bicycle"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sell;
