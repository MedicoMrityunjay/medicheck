import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "How accurate is MediCheck?",
    answer: "Our AI achieves 99% accuracy, validated against FDA databases and peer-reviewed clinical studies.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade encryption and never store personal health information.",
  },
  {
    question: "Can I use MediCheck for clinical decisions?",
    answer: "MediCheck is for informational purposes. Always consult healthcare professionals for medical decisions.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-20 -left-40 animate-blob" style={{ animationDelay: '3s' }} />
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>

      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full mb-8 shadow-glow-sm border border-primary/30">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Get in Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass-strong border-border/50 rounded-2xl animate-fade-in-up">
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-black text-foreground mb-6">Send us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-neon">
                      <CheckCircle className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-xl">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-secondary/50 border-border/50 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-secondary/50 border-border/50 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                      <Input
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-secondary/50 border-border/50 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                      <Textarea
                        placeholder="Tell us more..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-secondary/50 border-border/50 rounded-xl resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gradient-primary text-primary-foreground shadow-glow-sm rounded-xl font-bold h-12"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* FAQs */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-heading font-black text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <Card key={i} className="glass-strong border-border/50 rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Support Hours */}
              <Card className="glass border-primary/20 rounded-2xl mt-6">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">Support Hours</h3>
                    <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-muted-foreground text-sm">Weekend: Limited support via email</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
