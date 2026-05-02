import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Store, Bike } from "lucide-react";

const Welcome = () => {
  const [userType, setUserType] = useState<"buyer" | "seller" | "">("");
  const [college, setCollege] = useState("");
  const navigate = useNavigate();

  const colleges = [
    "Birla Institute of Technology",
    "Indian Institute of Technology Delhi",
    "Indian Institute of Technology Bombay",
    "Indian Institute of Technology Kanpur",
    "Indian Institute of Technology Madras",
    "Delhi University",
    "Jawaharlal Nehru University",
    "Banaras Hindu University",
    "Aligarh Muslim University",
    "Other"
  ];

  const handleContinue = () => {
    if (!userType || !college) {
      return;
    }

    // Store user preferences
    localStorage.setItem("userType", userType);
    localStorage.setItem("college", college);

    // Navigate to signup if not logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    } else {
      if (userType === "seller") {
        navigate("/sell");
      } else {
        navigate("/explore");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-border/50">
        <CardContent className="p-8 md:p-12">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-primary rounded-2xl">
                <Bike className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">CampusMarket</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Your trusted campus marketplace
            </p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-6">
            <div>
              <Label className="text-base mb-4 block">I want to</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType("buyer")}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    userType === "buyer"
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <ShoppingBag className={`w-10 h-10 mx-auto mb-3 ${
                    userType === "buyer" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <h3 className="font-semibold text-lg mb-1">Buy Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse and purchase items from verified students
                  </p>
                </button>

                <button
                  onClick={() => setUserType("seller")}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    userType === "seller"
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Store className={`w-10 h-10 mx-auto mb-3 ${
                    userType === "seller" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <h3 className="font-semibold text-lg mb-1">Sell Products</h3>
                  <p className="text-sm text-muted-foreground">
                    List your items and reach verified buyers
                  </p>
                </button>
              </div>
            </div>

            {/* College Selection */}
            <div>
              <Label htmlFor="college" className="text-base mb-3 block">
                Select Your College/University
              </Label>
              <Select value={college} onValueChange={setCollege}>
                <SelectTrigger id="college" className="h-12 text-base">
                  <SelectValue placeholder="Choose your institution" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((col) => (
                    <SelectItem key={col} value={col}>
                      {col}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Only verified students from your institution can access the marketplace
              </p>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!userType || !college}
              size="lg"
              className="w-full rounded-full bg-gradient-primary border-0 text-lg h-14 mt-6"
            >
              Continue to CampusMarket
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline font-medium">
                Log in here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
