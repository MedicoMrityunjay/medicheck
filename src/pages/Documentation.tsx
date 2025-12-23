import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Search, ArrowRight, Code, Database, Zap, Shield, FileText, PlayCircle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const docSections = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Learn the basics of using MediCheck for drug interaction analysis",
    articles: ["Quick Start Guide", "Understanding Interactions", "Severity Levels Explained", "Best Practices"],
  },
  {
    icon: Database,
    title: "Drug Database",
    description: "Comprehensive guide to our medication database",
    articles: ["Searching Medications", "Drug Categories", "FDA Classifications", "Database Updates"],
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Technical documentation for developers",
    articles: ["Authentication", "Endpoints Overview", "Rate Limits", "Error Handling"],
  },
  {
    icon: Shield,
    title: "Safety & Accuracy",
    description: "Understanding our data sources and accuracy",
    articles: ["Data Sources", "Verification Process", "Clinical Evidence", "Reporting Issues"],
  },
];

const popularArticles = [
  { title: "How to Check Drug Interactions", views: "15.2K", time: "3 min" },
  { title: "Understanding Severity Levels", views: "12.8K", time: "5 min" },
  { title: "API Quick Start Guide", views: "9.4K", time: "7 min" },
  { title: "Common Drug Combinations to Avoid", views: "8.7K", time: "4 min" },
];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-20 -left-40 animate-blob" style={{ animationDelay: '3s' }} />
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>

      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full mb-8 shadow-glow-sm border border-primary/30">
              <Book className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Knowledge Base
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-8">
              Everything you need to know about using MediCheck effectively and safely.
            </p>
            
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-secondary/50 border-border/50 rounded-xl text-lg"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {["Quick Start", "API Docs", "FAQs", "Video Tutorials"].map((link) => (
              <Button key={link} variant="outline" className="rounded-xl gap-2">
                {link}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ))}
          </div>

          {/* Documentation Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {docSections.map((section, i) => (
              <Card 
                key={i}
                className="glass-strong border-border/50 rounded-2xl overflow-hidden card-hover-glow group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow-sm group-hover:shadow-neon transition-all duration-500">
                      <section.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-1">{section.title}</h3>
                      <p className="text-muted-foreground text-sm">{section.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {section.articles.map((article, j) => (
                      <li key={j}>
                        <a href="#" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors group/link">
                          <FileText className="w-4 h-4 text-muted-foreground group-hover/link:text-primary" />
                          <span>{article}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-black text-foreground mb-8 text-center">
              Popular <span className="gradient-text-static">Articles</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article, i) => (
                <a
                  key={i}
                  href="#"
                  className="glass-strong border-border/50 rounded-xl p-6 flex items-center justify-between group hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">{article.views} views · {article.time} read</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Video Tutorials */}
          <Card className="glass-strong border-primary/20 rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-neon">
                <PlayCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-heading font-black text-foreground mb-4">
                Video Tutorials
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Learn how to use MediCheck with our step-by-step video guides covering 
                everything from basic usage to advanced API integration.
              </p>
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow-sm rounded-xl font-bold">
                Watch Tutorials
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
