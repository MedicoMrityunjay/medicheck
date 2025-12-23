import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pill, 
  Shield, 
  Brain, 
  FileText, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle,
  Microscope,
  Sparkles,
  Zap,
  Activity,
  Hexagon,
  ChevronRight,
  Heart,
  Stethoscope,
  Syringe,
  HeartPulse,
  Cross,
  Hospital,
  UserRound
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero3DScene from "@/components/Hero3DScene";
import MarqueeText from "@/components/MarqueeText";
import FlipCard from "@/components/FlipCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import React, { Suspense } from "react";

const Index = () => {
  const marqueeTexts = [
    "💊 Drug Interactions",
    "🔬 AI-Powered Analysis",
    "🏥 Clinical Safety First",
    "📋 FDA Database",
    "⚕️ Healthcare Excellence",
    "🩺 Patient Care",
    "💉 Medication Safety"
  ];

  const features = [
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Patient Safety First",
      description: "Our AI prioritizes patient safety with comprehensive drug interaction analysis and real-time alerts.",
      backContent: "Advanced algorithms trained on millions of clinical cases to protect patient health."
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Clinical Decision Support",
      description: "Empowering healthcare professionals with evidence-based medication insights.",
      backContent: "Used by doctors, pharmacists, and nurses worldwide for informed prescribing decisions."
    },
    {
      icon: <Syringe className="w-8 h-8" />,
      title: "Medication Analysis",
      description: "Deep analysis of drug combinations, dosages, and potential contraindications.",
      backContent: "Covers 50,000+ medications including generics, brand names, and supplements."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Natural language explanations with detailed mechanism pathways and clinical context.",
      backContent: "Powered by advanced AI models trained on medical literature and FDA data."
    },
    {
      icon: <Hospital className="w-8 h-8" />,
      title: "Hospital-Grade Accuracy",
      description: "The same technology trusted by leading healthcare institutions worldwide.",
      backContent: "99.2% accuracy rate validated by independent clinical studies."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Protected",
      description: "Your health data is encrypted and never shared. HIPAA compliant.",
      backContent: "Bank-grade encryption and strict data protection policies."
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise">
      {/* Animated background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-primary w-[600px] h-[600px] -top-40 -left-40 animate-blob" />
        <div className="orb orb-accent w-[500px] h-[500px] top-1/3 -right-40 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="orb orb-primary w-[400px] h-[400px] bottom-0 left-1/4 animate-blob" style={{ animationDelay: '4s' }} />
        <div className="grid-pattern absolute inset-0 opacity-50" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section with 3D Scene */}
      <section className="py-20 lg:py-32 relative min-h-[90vh] flex items-center">
        {/* 3D Background Scene */}
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full mb-10 animate-fade-in shadow-glow-sm border border-primary/30">
              <Cross className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Trusted by Healthcare Professionals
              </span>
              <HeartPulse className="w-4 h-4 text-primary animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-foreground mb-8 animate-fade-in leading-[0.95] tracking-tight" style={{ animationDelay: "0.1s" }}>
              Your Health,{" "}
              <br className="hidden md:block" />
              <span className="gradient-text inline-block">Our Priority</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed font-light" style={{ animationDelay: "0.2s" }}>
              AI-powered drug interaction checker helping patients and healthcare providers 
              make safer medication decisions. <span className="text-primary font-medium">Protecting lives, one prescription at a time.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/checker">
                <Button size="lg" className="gap-3 text-lg px-10 h-16 gradient-primary text-primary-foreground shadow-neon btn-neon rounded-2xl font-bold tracking-wide group">
                  <Stethoscope className="w-5 h-5 group-hover:animate-pulse" />
                  Check Interactions
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg" className="gap-3 text-lg px-10 h-16 border-border/50 bg-secondary/30 hover:border-primary/50 hover:bg-primary/5 rounded-2xl font-medium backdrop-blur-xl">
                  <Heart className="w-5 h-5" />
                  How It Helps
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-border/30 bg-secondary/20 backdrop-blur-xl overflow-hidden">
        <MarqueeText texts={marqueeTexts} speed={40} direction="left" />
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: 99, suffix: "%", label: "Clinical Accuracy", icon: <CheckCircle2 className="w-5 h-5 text-primary" /> },
              { value: 50000, suffix: "+", label: "Medications Covered", icon: <Pill className="w-5 h-5 text-primary" /> },
              { value: 2, prefix: "<", suffix: "s", label: "Instant Analysis", icon: <Zap className="w-5 h-5 text-primary" /> },
              { value: 1000000, suffix: "+", label: "Lives Protected", icon: <Heart className="w-5 h-5 text-primary" /> },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="glass-strong rounded-2xl p-8 text-center card-hover-glow border border-border/50 animate-fade-in-up group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-heading font-black gradient-text-static group-hover:scale-110 transition-transform duration-500">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    prefix={stat.prefix}
                    duration={2000 + i * 300}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-3 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Marquee (opposite direction) */}
      <section className="py-8 border-y border-border/30 bg-accent/5 backdrop-blur-xl overflow-hidden">
        <MarqueeText 
          texts={["🩺 Doctor Approved", "💊 Pharmacist Verified", "🏥 Hospital Grade", "❤️ Patient Focused", "🔒 Privacy First", "✅ FDA Referenced"]} 
          speed={35} 
          direction="right" 
        />
      </section>

      {/* Features Grid with Flip Cards */}
      <section className="py-28 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/20">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span className="uppercase tracking-wider">Why Choose MediCheck</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              Healthcare <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Bridging the gap between patients and safe medication practices with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <FlipCard
                key={i}
                className="h-72 animate-fade-in-up"
                frontContent={
                  <Card className="glass-strong border-border/50 rounded-2xl overflow-hidden h-full group hover:border-primary/40 transition-all duration-500">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 text-primary-foreground shadow-glow-sm group-hover:scale-110 group-hover:shadow-neon transition-all duration-500">
                        {feature.icon}
                      </div>
                      <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">{feature.description}</p>
                      <div className="mt-4 text-xs text-primary font-medium flex items-center gap-1">
                        <span>Hover to learn more</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                }
                backContent={
                  <Card className="gradient-primary rounded-2xl overflow-hidden h-full">
                    <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-background/20 backdrop-blur flex items-center justify-center mb-6 text-primary-foreground">
                        {feature.icon}
                      </div>
                      <h3 className="font-heading font-bold text-xl mb-4 text-primary-foreground">{feature.title}</h3>
                      <p className="text-primary-foreground/90 leading-relaxed">{feature.backContent}</p>
                    </CardContent>
                  </Card>
                }
              />
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
