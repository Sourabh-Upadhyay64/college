import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: "1",
      title: "5 Tips for Selling Your Bicycle Quickly on Campus",
      excerpt:
        "Learn the best practices to create attractive listings, price competitively, and connect with genuine buyers faster.",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
      category: "Selling Tips",
      date: "Mar 15, 2025",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "How to Choose the Right Bicycle for Campus Life",
      excerpt:
        "A comprehensive guide to selecting the perfect bicycle based on your campus terrain, budget, and daily commute needs.",
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
      category: "Buying Guide",
      date: "Mar 12, 2025",
      readTime: "8 min read",
    },
    {
      id: "3",
      title: "Maintaining Your Bicycle: A Student's Guide",
      excerpt:
        "Essential maintenance tips to keep your bicycle in top condition throughout the semester without breaking the bank.",
      image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800",
      category: "Maintenance",
      date: "Mar 10, 2025",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "The Environmental Impact of Cycling on Campus",
      excerpt:
        "Discover how choosing bicycles over cars reduces carbon footprint and contributes to a greener, healthier campus.",
      image: "https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?w=800",
      category: "Sustainability",
      date: "Mar 8, 2025",
      readTime: "4 min read",
    },
    {
      id: "5",
      title: "Safety First: Campus Cycling Best Practices",
      excerpt:
        "Essential safety tips every student cyclist should know, from proper gear to navigating busy campus paths.",
      image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800",
      category: "Safety",
      date: "Mar 5, 2025",
      readTime: "7 min read",
    },
    {
      id: "6",
      title: "Budget-Friendly Bicycle Upgrades for Students",
      excerpt:
        "Affordable ways to improve your ride's performance and comfort without spending a fortune on expensive parts.",
      image: "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=800",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and stories from the campus cycling community
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
            <p className="text-muted-foreground mb-4">Want to share your cycling story?</p>
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
