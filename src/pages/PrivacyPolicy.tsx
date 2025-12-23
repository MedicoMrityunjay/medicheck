import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, UserCheck, Globe, FileText, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you use our drug interaction checker, create an account, or contact us for support. This may include:
    
• Drug names and medication information you enter for interaction checks
• Email address if you subscribe to updates
• Usage data and analytics to improve our service
• Device information and browser type for optimization

We do NOT collect or store personal health information (PHI) or medical records.`,
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our drug interaction checking service
• Send you technical notices, updates, and support messages
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent security incidents

We never sell your personal information to third parties.`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your data:

• All data transmission is encrypted using TLS 1.3
• We use industry-standard encryption for data at rest
• Regular security audits and penetration testing
• Access controls and authentication for all systems
• Automatic data deletion for temporary query data

Drug interaction queries are processed in real-time and not permanently stored unless you explicitly save them.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your personal information
• Opt-out of marketing communications
• Export your data in a portable format
• Lodge a complaint with a supervisory authority

To exercise these rights, contact us at privacy@medicheck.ai`,
  },
  {
    icon: Globe,
    title: "International Data Transfers",
    content: `MediCheck operates globally. Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place:

• Standard Contractual Clauses for EU data transfers
• Compliance with GDPR for European users
• Compliance with CCPA for California residents
• Privacy Shield framework adherence where applicable`,
  },
  {
    icon: FileText,
    title: "Cookies and Tracking",
    content: `We use cookies and similar technologies to:

• Remember your preferences and settings
• Analyze how our service is used
• Improve performance and user experience

Essential cookies are required for the service to function. You can manage cookie preferences through your browser settings. We do not use cookies for advertising purposes.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] -top-40 -left-40 animate-blob" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-20 -right-40 animate-blob" style={{ animationDelay: '3s' }} />
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>

      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full mb-8 shadow-glow-sm border border-primary/30">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Your Privacy Matters
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              We are committed to protecting your privacy and being transparent about how we handle your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 22, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="glass-strong border-primary/20 rounded-2xl mb-12 animate-fade-in-up">
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed">
                MediCheck ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our 
                drug interaction checking service and website. Please read this policy carefully. By using 
                MediCheck, you consent to the practices described in this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <Card 
                key={i}
                className="glass-strong border-border/50 rounded-2xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-foreground pt-2">{section.title}</h2>
                  </div>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line pl-16">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact */}
          <Card className="glass-strong border-primary/20 rounded-2xl mt-12 animate-fade-in-up">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm flex-shrink-0">
                <Mail className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground mb-2">Questions About Privacy?</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
                  <a href="mailto:privacy@medicheck.ai" className="text-primary hover:underline">privacy@medicheck.ai</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
