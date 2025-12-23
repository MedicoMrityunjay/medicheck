import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Shield, Zap, Target, Award, Linkedin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Mrityunjay Kumar",
    role: "Healthcare & Research",
    bio: "BSc Biomedical Science student at Acharya Narendra Dev College, University of Delhi. Passionate about bridging healthcare and technology.",
    image: "MJ",
  },
  {
    name: "Dhananjay Kumar",
    role: "Technology & Development",
    bio: "BTech Computer Science student at Shree Mata Vaishno Devi University, Katra. Building innovative solutions for real-world problems.",
    image: "DK",
  },
];

const values = [
  {
    icon: Shield,
    title: "Patient Safety First",
    description: "Every decision we make prioritizes the safety and well-being of patients across India and beyond.",
  },
  {
    icon: Target,
    title: "Clinical Accuracy",
    description: "We maintain the highest standards of accuracy, aligned with Indian pharmacopoeia and global databases.",
  },
  {
    icon: Zap,
    title: "Made in India",
    description: "Built by Indian students, for Indians first—addressing unique healthcare challenges in our country.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Making drug safety information accessible in multiple Indian languages, for free.",
  },
];

const milestones = [
  { year: "2024", event: "Identified the critical gap in accessible drug interaction information in India" },
  { year: "2024", event: "Formed the founding team—Delhi meets Jammu & Kashmir" },
  { year: "2025", event: "Launched MediCheck with AI-powered interaction analysis" },
  { year: "2025", event: "Introduced Hindi language support for better accessibility" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] -top-40 -left-40 animate-blob" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-20 -right-40 animate-blob" style={{ animationDelay: '3s' }} />
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>

      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full mb-8 shadow-glow-sm border border-primary/30">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Our Story
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              About <span className="gradient-text">MediCheck</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Born from a simple observation in a biomedical research paper—lakhs of preventable 
              adverse drug reactions occur in India every year simply because people lack access to clear, 
              understandable drug interaction information. We're two students from India on a mission to change that.
            </p>
          </div>

          {/* Origin Story */}
          <Card className="glass-strong border-primary/20 rounded-2xl mb-20 animate-fade-in-up">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-heading font-black text-foreground mb-6">
                The <span className="gradient-text-static">Problem</span> We Discovered
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It started during a late-night study session at our college in Delhi. While reading through 
                  research papers on pharmacology, one statistic stood out: <span className="text-foreground font-semibold">India 
                  reports over 6% of hospital admissions</span> are due to adverse drug reactions, with lakhs 
                  of cases occurring annually—many of which are preventable drug-drug interactions.
                </p>
                <p>
                  The shocking part? In a country with 1.4 billion people where self-medication is common 
                  and many rely on local pharmacies, most people have no easy way to check if their 
                  medications are safe to take together. Healthcare providers are overwhelmed, and existing 
                  drug interaction tools are either in English only, too complex, or hidden behind expensive paywalls.
                </p>
                <p>
                  That's when it clicked: <span className="text-foreground font-semibold">What if we could 
                  build something that makes drug safety information accessible to every Indian?</span> Not just 
                  doctors in metro cities, but patients in tier-2 cities, caregivers in villages, and anyone 
                  who takes medications—in their own language.
                </p>
                <p>
                  Combining biomedical expertise from Delhi University with cutting-edge AI technology, we built 
                  MediCheck—a platform that analyzes drug interactions in seconds, explains risks in plain language 
                  (including Hindi), and empowers people to have informed conversations with their healthcare providers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: "50K+", label: "Drugs in Database" },
              { value: "AI", label: "Powered Analysis" },
              { value: "Hindi", label: "& English Support" },
              { value: "Free", label: "For Everyone" },
            ].map((stat, i) => (
              <div key={i} className="glass-strong rounded-2xl p-6 text-center border border-border/50 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl font-heading font-black gradient-text-static">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-heading font-black text-foreground mb-12 text-center">
              Our <span className="gradient-text-static">Values</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="glass-strong border-border/50 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-8 flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow-sm flex-shrink-0">
                      <value.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl font-heading font-black text-foreground mb-12 text-center">
              Our <span className="gradient-text-static">Journey</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-30 hidden md:block" />
              <div className="space-y-8">
                {milestones.map((milestone, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-in-up`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <Card className="glass-strong border-border/50 rounded-2xl inline-block">
                        <CardContent className="p-6">
                          <div className="text-3xl font-heading font-black gradient-text-static mb-2">{milestone.year}</div>
                          <p className="text-muted-foreground">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:flex w-4 h-4 rounded-full gradient-primary shadow-neon flex-shrink-0" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-heading font-black text-foreground mb-12 text-center">
              Meet the <span className="gradient-text-static">Creators</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {team.map((member, i) => (
                <Card key={i} className="glass-strong border-border/50 rounded-2xl overflow-hidden card-hover-glow group animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 text-3xl font-heading font-black text-primary-foreground shadow-glow-sm group-hover:shadow-neon transition-shadow">
                      {member.image}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                    <div className="flex justify-center gap-3 mt-6">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="glass-strong border-primary/20 rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-heading font-black text-foreground mb-4">
                Help Us Make Medication Safer
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                We believe everyone deserves access to clear, accurate drug safety information. 
                Try MediCheck today and take control of your medication safety.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/checker">
                  <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow-sm rounded-xl font-bold">
                    Try Drug Checker
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-xl">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
