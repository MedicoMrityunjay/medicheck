import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Pill, Filter, ArrowRight, Info, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const popularDrugs = [
  { name: "Aspirin", category: "NSAID", uses: "Pain relief, fever reduction, blood thinner" },
  { name: "Metformin", category: "Antidiabetic", uses: "Type 2 diabetes management" },
  { name: "Lisinopril", category: "ACE Inhibitor", uses: "High blood pressure, heart failure" },
  { name: "Atorvastatin", category: "Statin", uses: "High cholesterol, cardiovascular disease prevention" },
  { name: "Omeprazole", category: "PPI", uses: "Acid reflux, GERD, stomach ulcers" },
  { name: "Amoxicillin", category: "Antibiotic", uses: "Bacterial infections" },
  { name: "Levothyroxine", category: "Thyroid Hormone", uses: "Hypothyroidism" },
  { name: "Amlodipine", category: "Calcium Channel Blocker", uses: "High blood pressure, angina" },
  { name: "Metoprolol", category: "Beta Blocker", uses: "High blood pressure, heart conditions" },
  { name: "Gabapentin", category: "Anticonvulsant", uses: "Nerve pain, seizures" },
  { name: "Sertraline", category: "SSRI", uses: "Depression, anxiety, PTSD" },
  { name: "Warfarin", category: "Anticoagulant", uses: "Blood clot prevention" },
];

const categories = ["All", "NSAID", "Antibiotic", "Antidiabetic", "Statin", "ACE Inhibitor", "Beta Blocker", "SSRI", "PPI"];

export default function DrugDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDrugs = popularDrugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drug.uses.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || drug.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <Database className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Comprehensive Database
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              Drug <span className="gradient-text">Database</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Explore our extensive database of 50,000+ medications with detailed information, 
              interactions, and clinical data.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="glass-strong rounded-2xl p-6 mb-12 border border-border/50 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search drugs by name or use..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-secondary/50 border-border/50 rounded-xl text-lg"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.slice(0, 5).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-xl ${selectedCategory === category ? 'gradient-primary text-primary-foreground' : ''}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Pill, value: "50,000+", label: "Medications" },
              { icon: AlertCircle, value: "200,000+", label: "Interactions" },
              { icon: CheckCircle, value: "FDA", label: "Approved Data" },
              { icon: Clock, value: "Daily", label: "Updates" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center border border-border/50 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-heading font-bold gradient-text-static">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Drug Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrugs.map((drug, i) => (
              <Card 
                key={drug.name}
                className="glass-strong border-border/50 rounded-2xl overflow-hidden card-hover-glow group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm group-hover:shadow-neon transition-all duration-500">
                      <Pill className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      {drug.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">{drug.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{drug.uses}</p>
                  <Link to="/checker">
                    <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary/10">
                      Check Interactions
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDrugs.length === 0 && (
            <div className="text-center py-20">
              <Info className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">No drugs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
