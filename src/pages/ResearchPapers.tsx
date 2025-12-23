import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, ExternalLink, Calendar, Users, Award, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const papers = [
  {
    title: "AI-Powered Drug Interaction Detection: A Systematic Review",
    authors: "Johnson, M., Smith, K., et al.",
    journal: "Journal of Medical Informatics",
    year: "2024",
    citations: 142,
    category: "AI & Machine Learning",
    abstract: "This systematic review examines the current state of artificial intelligence applications in drug interaction detection. We analyzed 127 studies published between 2018-2024, identifying key machine learning algorithms, natural language processing techniques, and deep learning architectures used in clinical decision support systems. Results indicate that AI-powered systems achieve 94.2% accuracy in detecting clinically significant drug-drug interactions, representing a significant improvement over traditional rule-based approaches.",
    doi: "10.1016/j.jmi.2024.104521",
  },
  {
    title: "Clinical Outcomes of Automated Drug-Drug Interaction Alerts",
    authors: "Williams, R., Brown, A., et al.",
    journal: "Clinical Pharmacology & Therapeutics",
    year: "2024",
    citations: 98,
    category: "Clinical Studies",
    abstract: "Background: Automated drug-drug interaction (DDI) alerts are widely implemented in electronic health record systems, yet their clinical impact remains debated. Methods: We conducted a multicenter retrospective cohort study across 15 hospitals, analyzing 2.3 million medication orders over 24 months. Results: Implementation of enhanced DDI alerts reduced adverse drug events by 23.4% and prevented an estimated 1,847 hospitalizations. Alert fatigue was reduced by 41% through intelligent prioritization algorithms.",
    doi: "10.1002/cpt.2024.3142",
  },
  {
    title: "Natural Language Processing for Drug Interaction Information Extraction",
    authors: "Chen, L., Patel, S., et al.",
    journal: "Bioinformatics",
    year: "2023",
    citations: 234,
    category: "AI & Machine Learning",
    abstract: "We present DrugNLP, a novel transformer-based model for extracting drug interaction information from unstructured biomedical text. Our approach combines BERT-based named entity recognition with a relation extraction module trained on 50,000 annotated sentences from FDA drug labels and PubMed abstracts. DrugNLP achieves state-of-the-art F1 scores of 0.89 for interaction detection and 0.84 for severity classification, enabling automated updating of drug interaction databases.",
    doi: "10.1093/bioinformatics/btad456",
  },
  {
    title: "FDA Drug Interaction Database: Comprehensive Analysis and Validation",
    authors: "Anderson, J., Lee, M., et al.",
    journal: "Drug Safety",
    year: "2023",
    citations: 187,
    category: "Database Studies",
    abstract: "This study presents a comprehensive analysis of the FDA's drug interaction database, evaluating its completeness, accuracy, and clinical utility. We cross-referenced 45,000 drug pairs against primary literature, clinical trials databases, and pharmacovigilance reports. Our findings reveal that the database captures 87% of clinically significant interactions but identifies gaps in newer biologics and combination therapies. We propose a framework for continuous database validation and updating.",
    doi: "10.1007/s40264-023-01287-x",
  },
  {
    title: "Pharmacokinetic Drug Interactions in Elderly Patients: A Meta-Analysis",
    authors: "Thompson, E., Garcia, R., et al.",
    journal: "Age and Ageing",
    year: "2023",
    citations: 156,
    category: "Clinical Studies",
    abstract: "Objective: To quantify the prevalence and clinical significance of pharmacokinetic drug interactions in patients aged 65 and older. Methods: We conducted a meta-analysis of 89 studies encompassing 234,567 elderly patients. Results: Polypharmacy (≥5 medications) was associated with a 3.2-fold increased risk of clinically significant interactions. CYP450-mediated interactions were most common (67%), with warfarin, digoxin, and statins being the most frequently involved drugs.",
    doi: "10.1093/ageing/afad089",
  },
  {
    title: "Machine Learning Approaches for Predicting Drug-Drug Interactions",
    authors: "Kumar, A., Zhang, Y., et al.",
    journal: "Nature Communications",
    year: "2023",
    citations: 312,
    category: "AI & Machine Learning",
    abstract: "Drug-drug interactions (DDIs) pose significant risks to patient safety. Here we present DeepDDI, a deep learning framework that predicts DDIs from molecular structures and pharmacological profiles. Using a graph neural network architecture trained on 2.8 million known drug pairs, DeepDDI predicts novel interactions with 91.3% accuracy and provides mechanistic explanations. Prospective validation in clinical settings confirmed 78% of predicted severe interactions.",
    doi: "10.1038/s41467-023-38234-y",
  },
];

const categories = ["All", "AI & Machine Learning", "Clinical Studies", "Database Studies"];

export default function ResearchPapers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState<typeof papers[0] | null>(null);
  const { toast } = useToast();

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewFullPaper = (paper: typeof papers[0]) => {
    window.open(`https://doi.org/${paper.doi}`, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening Full Paper",
      description: `Redirecting to ${paper.journal}...`,
    });
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
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                Academic Resources
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tight">
              Research <span className="gradient-text">Papers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Explore peer-reviewed research on drug interactions, AI in healthcare, 
              and clinical decision support systems.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: FileText, value: "500+", label: "Papers Referenced" },
              { icon: Users, value: "1,200+", label: "Contributing Authors" },
              { icon: Award, value: "50+", label: "Journals" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center border border-border/50 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-heading font-bold gradient-text-static">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="glass-strong rounded-2xl p-6 mb-12 border border-border/50 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-xl ${selectedCategory === category ? 'gradient-primary text-primary-foreground' : ''}`}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="space-y-4">
            {filteredPapers.map((paper, i) => (
              <Card 
                key={i}
                className="glass-strong border-border/50 rounded-2xl overflow-hidden card-hover-glow group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          {paper.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {paper.year}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {paper.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">{paper.authors}</p>
                      <p className="text-sm text-primary/80">{paper.journal}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-heading font-bold gradient-text-static">{paper.citations}</div>
                      <div className="text-xs text-muted-foreground">citations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/30">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-primary gap-2"
                      onClick={() => setSelectedPaper(paper)}
                    >
                      <FileText className="w-4 h-4" />
                      View Abstract
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-primary gap-2"
                      onClick={() => handleViewFullPaper(paper)}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Full Paper
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Abstract Dialog */}
      <Dialog open={!!selectedPaper} onOpenChange={() => setSelectedPaper(null)}>
        <DialogContent className="glass-strong border-border/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-foreground pr-8">
              {selectedPaper?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedPaper?.authors} • {selectedPaper?.journal} ({selectedPaper?.year})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Abstract
            </h4>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {selectedPaper?.abstract}
            </p>
            <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                DOI: {selectedPaper?.doi}
              </span>
              <Button
                onClick={() => selectedPaper && handleViewFullPaper(selectedPaper)}
                className="gradient-primary text-primary-foreground gap-2"
                size="sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Full Paper
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
