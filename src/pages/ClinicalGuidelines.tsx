import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, AlertTriangle, Shield, FileText, CheckCircle, Download, ExternalLink, Pill, Heart, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const guidelines = [
  {
    category: "General Safety",
    items: [
      {
        title: "Always Consult Healthcare Professionals",
        description: "Drug interaction information should supplement, not replace, professional medical advice. Always discuss medication changes with your doctor or pharmacist.",
        severity: "critical",
      },
      {
        title: "Report All Medications",
        description: "Include prescription drugs, over-the-counter medications, vitamins, supplements, and herbal products when checking interactions.",
        severity: "major",
      },
      {
        title: "Consider Individual Factors",
        description: "Age, weight, kidney function, liver function, and other health conditions can affect how drugs interact in your body.",
        severity: "moderate",
      },
    ],
  },
  {
    category: "Understanding Severity Levels",
    items: [
      {
        title: "Critical Interactions",
        description: "Life-threatening combinations that should be avoided. Immediate medical attention may be required if these drugs are taken together.",
        severity: "critical",
      },
      {
        title: "Major Interactions",
        description: "Significant interactions that may require medical intervention, dosage adjustments, or close monitoring.",
        severity: "major",
      },
      {
        title: "Moderate Interactions",
        description: "Interactions that may worsen conditions or require monitoring. Discuss with your healthcare provider.",
        severity: "moderate",
      },
      {
        title: "Minor Interactions",
        description: "Generally well-tolerated interactions with minimal clinical significance. Be aware but no action typically needed.",
        severity: "minor",
      },
    ],
  },
];

const resources = [
  { title: "FDA Drug Safety Communications", icon: Shield, link: "#" },
  { title: "Clinical Pharmacology Guidelines", icon: Pill, link: "#" },
  { title: "Geriatric Prescribing Guidelines", icon: Heart, link: "#" },
  { title: "Mental Health Medication Guide", icon: Brain, link: "#" },
];

export default function ClinicalGuidelines() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-severity-critical text-white";
      case "major": return "bg-severity-major text-white";
      case "moderate": return "bg-severity-moderate text-foreground";
      case "minor": return "bg-severity-minor text-white";
      default: return "bg-secondary text-foreground";
    }
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
              <ClipboardList className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Safety First
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              Clinical <span className="gradient-text">Guidelines</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Evidence-based guidelines for safe medication use and understanding drug interactions.
            </p>
          </div>

          {/* Warning Banner */}
          <Card className="glass-strong border-severity-major/50 rounded-2xl mb-12 animate-fade-in-up">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-severity-major/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-severity-major" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">Important Medical Disclaimer</h3>
                <p className="text-muted-foreground">
                  MediCheck is designed for informational purposes only. It is not a substitute for professional 
                  medical advice, diagnosis, or treatment. Always seek the advice of your physician or other 
                  qualified health provider with any questions you may have regarding medications.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines Sections */}
          <div className="space-y-12 mb-16">
            {guidelines.map((section, sectionIndex) => (
              <div key={sectionIndex} className="animate-fade-in-up" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
                <h2 className="text-2xl font-heading font-black text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="glass-strong border-border/50 rounded-2xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold capitalize flex-shrink-0 ${getSeverityColor(item.severity)}`}>
                            {item.severity}
                          </span>
                          <div>
                            <h3 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-black text-foreground mb-8 text-center">
              Additional <span className="gradient-text-static">Resources</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.link}
                  className="glass-strong border-border/50 rounded-xl p-6 flex items-center gap-4 group hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm group-hover:shadow-neon transition-shadow">
                    <resource.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">View guidelines</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="glass-strong border-primary/20 rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-neon animate-float">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-heading font-black text-foreground mb-4">
                Start Checking Interactions
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Use our AI-powered tool to check for potential drug interactions and stay safe.
              </p>
              <Link to="/checker">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-neon btn-neon rounded-xl font-bold">
                  Launch Interaction Checker
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
