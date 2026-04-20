import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShoppingBag,
  MessageCircle,
  Shield,
  Zap,
  Users,
  Verified,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: ShoppingBag,
      title: "Buy Products",
      description:
        "Browse a wide selection of verified products from fellow students. Filter by price, condition, category, and more to find what you need.",
      features: [
        "Advanced search filters",
        "Detailed product listings",
        "Photo galleries",
        "Price comparison",
      ],
    },
    {
      icon: Zap,
      title: "Sell Your Product",
      description:
        "List your product in under 2 minutes. Upload photos, set your price, and reach hundreds of potential buyers on campus instantly.",
      features: [
        "Quick listing process",
        "Free to post",
        "Edit anytime",
        "Track views and interest",
      ],
    },
    {
      icon: MessageCircle,
      title: "Direct Chat",
      description:
        "Connect with buyers or sellers through our secure in-app messaging system. Negotiate prices and arrange meetups safely.",
      features: [
        "Real-time messaging",
        "Photo sharing",
        "Privacy protected",
        "Notification system",
      ],
    },
    {
      icon: Shield,
      title: "Verified Community",
      description:
        "Only verified college students can join. We validate every account using official college email addresses to ensure safety.",
      features: [
        "Email verification",
        "Student-only access",
        "Report system",
        "Spam-free environment",
      ],
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join a growing community of students. Get tips, reviews, and recommendations from fellow users on campus",
      features: [
        "Student reviews",
        "Seller ratings",
        "Community guidelines",
        "Help center",
      ],
    },
    {
      icon: Verified,
      title: "Trust & Safety",
      description:
        "We prioritize your safety with verified profiles, secure messaging, and a robust reporting system to keep the platform clean.",
      features: [
        "Profile verification",
        "Secure platform",
        "Content moderation",
        "User guidelines",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to buy, sell, and connect around products on
              your campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-primary text-white rounded-3xl p-8 md:p-12 text-center animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join our trusted campus community and start buying or selling
              products today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup">
                <button className="px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors">
                  Create Account
                </button>
              </a>
              <a href="/explore">
                <button className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-primary transition-colors">
                  Browse Products
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
