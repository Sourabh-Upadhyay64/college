import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Clients = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      college: "Delhi University",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      text: "I sold my bicycle within 2 days! The platform is so easy to use and I felt safe knowing everyone is a verified student.",
      rating: 5,
    },
    {
      name: "Arjun Mehta",
      college: "IIT Bombay",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      text: "Found an amazing mountain bike at half the price. The chat feature made it super easy to connect with the seller.",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      college: "Mumbai University",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      text: "This platform changed how we trade bicycles on campus. No more spam or fake listings. Highly recommend!",
      rating: 5,
    },
    {
      name: "Rahul Kumar",
      college: "Bangalore University",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      text: "As an international student, this made finding affordable transportation so much easier. Great community!",
      rating: 5,
    },
    {
      name: "Ananya Singh",
      college: "Chennai Institute",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
      text: "The verification process gives me peace of mind. I know I'm dealing with real students from my campus.",
      rating: 5,
    },
    {
      name: "Vikram Reddy",
      college: "Hyderabad College",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      text: "Listed my old bicycle and got multiple offers. The platform's design is beautiful and really user-friendly!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Active Students" },
    { number: "200+", label: "Bicycles Sold" },
    { number: "15+", label: "Partner Colleges" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">What Students Say</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from students across campuses who've bought and sold bicycles through
              our platform
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-secondary mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-muted"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.college}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-accent">★</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-primary text-white rounded-3xl p-8 md:p-12 text-center animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Be part of a trusted network of student cyclists making sustainable choices
            </p>
            <a href="/signup">
              <button className="px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors">
                Get Started Today
              </button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clients;
