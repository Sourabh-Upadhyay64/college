import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Users, Leaf, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To create a student-friendly marketplace that makes buying and selling products easy, affordable, and accessible within the campus community.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "We believe in building trust within the campus community. Every user is verified, ensuring a safe and spam-free environment.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Promoting product reuse reduces waste and encourages eco-conscious consumption among students.",
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description:
        "College email verification, transparent profiles, and community reporting keep our platform secure for everyone.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Dev-Evelopers
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're on a mission to simplify campus commerce by creating a
              trusted marketplace where students can buy and sell products
              affordably, and safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-primary text-white rounded-3xl p-8 md:p-12 text-center animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why We Built This
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              As students ourselves, we noticed how difficult it was to buy or
              sell products on campus. Existing platforms were cluttered with
              spam, lacked verification, and didn't cater specifically to
              students. So we built a solution—a trusted, campus-only
              marketplace where verified students can easily connect and trade
              products securely.
            </p>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Hundreds of students are already buying and selling products
              safely on campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="inline-block">
                <button className="px-8 py-3 bg-gradient-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity">
                  Get Started Today
                </button>
              </a>
              <a href="/explore" className="inline-block">
                <button className="px-8 py-3 border-2 border-border rounded-full font-medium hover:bg-muted transition-colors">
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

export default About;
