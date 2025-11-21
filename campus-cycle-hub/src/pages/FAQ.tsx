import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Who can use this platform?",
      answer:
        "Only verified students with a valid college email address can create an account and use the platform. This ensures a safe and trusted community.",
    },
    {
      question: "How do I verify my account?",
      answer:
        "During signup, you'll need to use your official college email address (e.g., name@college.edu). We'll send a verification link to confirm your account.",
    },
    {
      question: "Is it free to list a bicycle?",
      answer:
        "Yes! Listing your bicycle is completely free. There are no hidden charges or commissions.",
    },
    {
      question: "How do I communicate with buyers/sellers?",
      answer:
        "Once you're interested in a listing, you can use our built-in chat feature to communicate directly with the seller. Your email remains private until you choose to share it.",
    },
    {
      question: "What happens after I find a buyer?",
      answer:
        "You can arrange a meeting place on campus through the chat. We recommend meeting in public areas and checking the bicycle condition before finalizing the deal.",
    },
    {
      question: "How do I report suspicious listings?",
      answer:
        "Each listing has a 'Report' button. Click it to flag inappropriate content, and our team will review it within 24 hours.",
    },
    {
      question: "Can I edit my listing after posting?",
      answer:
        "Yes! Go to 'My Listings' from the navigation menu, and you'll see options to edit or delete your listings anytime.",
    },
    {
      question: "What types of bicycles can I sell?",
      answer:
        "You can sell any type of bicycle - mountain bikes, road bikes, city bikes, hybrid bikes, electric bikes, BMX, and more. Just make sure to accurately describe the condition.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-12 text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about buying and selling bicycles on campus
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 animate-fade-in-up">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-2xl px-6 shadow-soft hover:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-muted/30 rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? Feel free to reach out.
            </p>
            <Button className="rounded-full bg-gradient-primary border-0">
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
