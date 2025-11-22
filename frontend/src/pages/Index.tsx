import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, CheckCircle } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Members Only",
      description: "Email verification ensures a safe, spam-free community",
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "List your bicycle in under 2 minutes and start selling instantly",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Buy and sell within your verified network",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create account with your verified email",
    },
    {
      step: "2",
      title: "List or Browse",
      description: "Post your bicycle or find your perfect ride",
    },
    {
      step: "3",
      title: "Connect & Deal",
      description: "Chat directly and complete the transaction",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center space-y-8 animate-fade-in-up">
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">
            <Zap className="w-3 h-3 mr-1" />
            Sustainable Campus Transportation
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
            Buy & Sell Bicycles
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Within Your Community
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Verified members only · Safe transactions · Sustainable living
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/explore">
              <Button size="lg" className="rounded-full bg-gradient-primary border-0 px-8 text-base hover:opacity-90 transition-opacity">
                Browse Cycles
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base">
                Sell Your Cycle
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join our community of verified members buying and selling bicycles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="rounded-full px-8">
                Create Account
              </Button>
            </Link>
            <Link to="/faq">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
