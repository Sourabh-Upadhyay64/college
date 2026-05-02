import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: "1",
      title: "5 Tips for Selling Your Products Quickly on Campus",
      excerpt:
        "Learn how to create attractive listings, set the right price, and connect with genuine buyers faster.",
      image:
        "https://images.unsplash.com/photo-1679309981674-cef0e23a7864?q=80&w=1762&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Selling Tips",
      date: "Mar 15, 2025",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "How to Choose the Right Products for Your Needs",
      excerpt:
        "A simple guide to choosing the right products based on your budget, usage, and preferences.",
      image:
        "https://images.unsplash.com/photo-1658046157320-36577125b29b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Buying Guide",
      date: "Mar 12, 2025",
      readTime: "8 min read",
    },
    {
      id: "3",
      title: "Maintaining Your Products: A Student's Guide",
      excerpt:
        "Easy maintenance tips to keep your products in great condition for longer use.",
      image:
        "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800",
      category: "Maintenance",
      date: "Mar 10, 2025",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "The Environmental Impact of Reusing Products",
      excerpt:
        "Discover how buying and selling used products helps reduce waste and promotes sustainability.",
      image:
        "https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?w=800",
      category: "Sustainability",
      date: "Mar 8, 2025",
      readTime: "4 min read",
    },
    {
      id: "5",
      title: "Safety Tips for Buying and Selling Online",
      excerpt:
        "Important safety practices every student should follow while trading products on campus.",
      image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800",
      category: "Safety",
      date: "Mar 5, 2025",
      readTime: "7 min read",
    },
    {
      id: "6",
      title: "Budget-Friendly Upgrades for Your Products",
      excerpt:
        "Affordable ways to improve usability and performance without spending too much.",
      image:
        "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=800",
      category: "Tips & Tricks",
      date: "Mar 1, 2025",
      readTime: "5 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and stories from the campus marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Want to share your experience with buying or selling products?
            </p>
            <button className="px-8 py-3 bg-gradient-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity">
              Submit Your Article
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
