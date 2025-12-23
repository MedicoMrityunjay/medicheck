import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Zap, Lock, Globe, Copy, Check, ArrowRight, Terminal, Database, Shield } from "lucide-react";
import { useState } from "react";

const endpoints = [
  {
    method: "POST",
    endpoint: "/api/v1/interactions",
    description: "Check drug interactions between multiple medications",
    example: `{
  "drugs": ["Aspirin", "Warfarin", "Ibuprofen"]
}`
  },
  {
    method: "GET",
    endpoint: "/api/v1/drugs/:name",
    description: "Get detailed information about a specific drug",
    example: `// Response
{
  "name": "Aspirin",
  "category": "NSAID",
  "uses": ["Pain relief", "Fever reduction"],
  "interactions_count": 142
}`
  },
  {
    method: "GET",
    endpoint: "/api/v1/drugs/search",
    description: "Search drugs by name, category, or use case",
    example: `?query=pain&category=NSAID&limit=10`
  },
];

export default function ApiAccess() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-full mb-8 shadow-glow-sm border border-primary/30">
              <Code className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Developer API
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              API <span className="gradient-text">Access</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-8">
              Integrate MediCheck's powerful drug interaction analysis into your applications 
              with our RESTful API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-neon btn-neon rounded-xl font-bold">
                <Zap className="w-5 h-5 mr-2" />
                Get API Key
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl">
                <Terminal className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Zap, title: "Fast Response", desc: "Average response time under 200ms" },
              { icon: Lock, title: "Secure", desc: "Enterprise-grade security with OAuth 2.0" },
              { icon: Globe, title: "Scalable", desc: "99.9% uptime SLA with global CDN" },
            ].map((feature, i) => (
              <Card key={i} className="glass-strong border-border/50 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-black text-foreground mb-8 text-center">
              API <span className="gradient-text-static">Endpoints</span>
            </h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, i) => (
                <Card key={i} className="glass-strong border-border/50 rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-6 border-b border-border/30">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        endpoint.method === 'POST' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-foreground">{endpoint.endpoint}</code>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                      <div className="relative">
                        <pre className="bg-secondary/50 rounded-xl p-4 overflow-x-auto font-mono text-sm text-foreground/80">
                          {endpoint.example}
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(endpoint.example, i)}
                        >
                          {copiedIndex === i ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="text-center">
            <h2 className="text-3xl font-heading font-black text-foreground mb-8">
              API <span className="gradient-text-static">Pricing</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Free", price: "$0", requests: "1,000 requests/month", features: ["Basic endpoints", "Email support", "API docs"] },
                { name: "Pro", price: "$49", requests: "50,000 requests/month", features: ["All endpoints", "Priority support", "Webhooks", "Analytics"], popular: true },
                { name: "Enterprise", price: "Custom", requests: "Unlimited requests", features: ["Dedicated support", "SLA guarantee", "Custom integration", "On-premise option"] },
              ].map((tier, i) => (
                <Card key={i} className={`glass-strong rounded-2xl overflow-hidden ${tier.popular ? 'border-primary shadow-neon' : 'border-border/50'}`}>
                  <CardContent className="p-8">
                    {tier.popular && (
                      <span className="inline-block gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-heading font-bold text-2xl mb-2">{tier.name}</h3>
                    <div className="text-4xl font-heading font-black gradient-text-static mb-2">{tier.price}</div>
                    <p className="text-muted-foreground text-sm mb-6">{tier.requests}</p>
                    <ul className="space-y-3 text-left mb-8">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full rounded-xl ${tier.popular ? 'gradient-primary text-primary-foreground shadow-glow-sm' : ''}`} variant={tier.popular ? "default" : "outline"}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
