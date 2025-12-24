import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pill,
  X,
  Loader2,
  ChevronRight,
  ChevronLeft,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  Heart,
  Plus,

  Shield,
  Stethoscope,
  Search,
  ArrowRight,
  Zap,
  Info,
  History,
  Clock,
  RotateCcw
} from "lucide-react";
import DrugSearch from "@/components/DrugSearch";
import InteractionResults from "@/components/InteractionResults";
import ExportReportButton from "@/components/ExportReportButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import type { DrugInteraction, DrugSearchResult } from "@/types/drug";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const InteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<DrugSearchResult[]>([]);
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [recentChecks, setRecentChecks] = useState<{ id: string, date: number, drugs: string[] }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  // Removed hybrid mode toggle state - Always AI now

  const { toast } = useToast();
  const { t } = useTranslation();

  // Load history on mount
  useState(() => {
    const saved = localStorage.getItem("medicheck_history");
    if (saved) {
      try {
        setRecentChecks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  });

  const saveToHistory = (drugNames: string[]) => {
    const newCheck = {
      id: Date.now().toString(),
      date: Date.now(),
      drugs: drugNames
    };
    // Avoid duplicates at the top, keep last 10
    const updated = [newCheck, ...recentChecks.filter(c => JSON.stringify(c.drugs.sort()) !== JSON.stringify(drugNames.sort()))].slice(0, 10);
    setRecentChecks(updated);
    localStorage.setItem("medicheck_history", JSON.stringify(updated));
  };

  const restoreCheck = (drugs: string[]) => {
    // Convert string array back to DrugSearchResult format (mocking structure since we only store names)
    // In a real app we might store full objects or fetch details again.
    // For now, we recreate the minimal objects needed.
    const restoredDrugs: DrugSearchResult[] = drugs.map(name => ({
      name,
      rxcui: "", // We don't have RXCUI in history, but search might handle it or we might need it.
      // Ideally we should store RXCUI too. But existing code uses name mostly?
      // analyzeInteractions uses name. DrugSearch returns object.
      // Let's assume name is enough for display and analysis.
      synonym: ""
    }));
    setSelectedDrugs(restoredDrugs);
    setCurrentStep(1);
    toast({
      title: "History Restored",
      description: `Loaded ${drugs.length} medications from history.`
    });
  };

  const handleAddDrug = (drug: DrugSearchResult) => {
    if (!drug || !drug.name) {
      return;
    }
    if (selectedDrugs.some((d) => d.name === drug.name)) {
      toast({
        title: "Drug already added",
        description: `${drug.name} is already in your list.`,
        variant: "destructive",
      });
      return;
    }
    const newDrugs = [...selectedDrugs, drug];
    setSelectedDrugs(newDrugs);
  };

  const handleRemoveDrug = (drugToRemove: string) => {
    setSelectedDrugs(selectedDrugs.filter((drug) => drug.name !== drugToRemove));
  };

  const analyzeInteractions = async () => {
    if (selectedDrugs.length < 2) {
      toast({
        title: "Add more medications",
        description: "Please add at least 2 medications to check for interactions.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setInteractions([]);

    try {
      // --- AI-ONLY MODE ---

      const { data, error } = await supabase.functions.invoke('analyze-interactions', {
        body: { drugs: selectedDrugs.map(d => d.name) }
      });

      if (error) throw error;

      if (data.interactions) {
        setInteractions(data.interactions);
        saveToHistory(selectedDrugs.map(d => d.name));
      } else {
        setInteractions([]);
      }

      setCurrentStep(2);

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Could not connect to AI service. Check internet.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goBack = () => {
    setCurrentStep(1);
  };

  const startOver = () => {
    setSelectedDrugs([]);
    setInteractions([]);
    setCurrentStep(1);
  };



  return (
    <div className="min-h-screen bg-background relative overflow-hidden noise flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] -top-40 -left-40 animate-blob" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-20 -right-40 animate-blob" style={{ animationDelay: '3s' }} />
        <div className="orb orb-primary w-[300px] h-[300px] top-1/2 left-1/2 animate-blob" style={{ animationDelay: '5s' }} />
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="space-y-8 min-w-0">

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 animate-fade-in">
              <div className={cn(
                "flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 rounded-full transition-all duration-500",
                currentStep === 1
                  ? "glass-strong border border-primary/30 shadow-neon"
                  : "glass opacity-60"
              )}>
                <div className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500",
                  currentStep === 1
                    ? "gradient-primary text-primary-foreground shadow-glow-sm"
                    : "bg-primary/20 text-primary"
                )}>
                  {currentStep > 1 ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : "1"}
                </div>
                <span className={cn(
                  "font-semibold transition-colors duration-500 text-sm sm:text-base",
                  currentStep === 1 ? "text-foreground" : "text-muted-foreground"
                )}>
                  Add Medications
                </span>
              </div>

              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />

              <div className={cn(
                "flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 rounded-full transition-all duration-500",
                currentStep === 2
                  ? "glass-strong border border-primary/30 shadow-neon"
                  : "glass opacity-60"
              )}>
                <div className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500",
                  currentStep === 2
                    ? "gradient-primary text-primary-foreground shadow-glow-sm"
                    : "bg-muted text-muted-foreground"
                )}>
                  2
                </div>
                <span className={cn(
                  "font-semibold transition-colors duration-500 text-sm sm:text-base",
                  currentStep === 2 ? "text-foreground" : "text-muted-foreground"
                )}>
                  View Results
                </span>
              </div>
            </div >

            {/* Step 1: Add Medications */}
            {
              currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Hero Section */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-neon animate-glow-pulse">
                      <HeartPulse className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-foreground mb-3 tracking-tight">
                      Drug Interaction <span className="gradient-text">Checker</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-lg mx-auto px-4">
                      Add your medications to check for potentially harmful drug interactions
                    </p>
                  </div>

                  {/* Search Section - Higher z-index */}
                  <div className="relative z-30">
                    <Card className="glass-strong border-border/50 rounded-2xl sm:rounded-3xl animate-fade-in-up">
                      <CardContent className="p-4 sm:p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                                Search Medications
                              </h2>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                Search NLM Database (AI Powered)
                              </p>
                            </div>
                          </div>

                          {/* AI-Powered Badge */}
                          <div className="flex items-center gap-2">
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-primary" />
                              <span className="text-xs font-bold text-primary">AI Powered</span>
                            </div>
                          </div>
                        </div>

                        {/* Drug Search with proper z-index */}
                        <div className="relative z-40">
                          <DrugSearch onSelectDrug={handleAddDrug} mode="online" />
                        </div>

                        {/* Camera/Upload Buttons Removed - Replaced by Dialog above */}

                        {/* Quick Tips */}
                        <div className="mt-4 flex flex-wrap gap-2">

                          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground glass px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                            <Shield className="w-3 h-3 text-primary" />
                            50,000+ medications
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Selected Medications - Lower z-index */}
                  <div className="relative z-10">
                    <Card className="glass-strong border-border/50 rounded-2xl sm:rounded-3xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <CardContent className="p-4 sm:p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                              <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                                Your Medications
                              </h2>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {selectedDrugs.length === 0
                                  ? "No medications added yet"
                                  : `${selectedDrugs.length} medication${selectedDrugs.length !== 1 ? 's' : ''} added`}
                              </p>
                            </div>
                          </div>
                          {selectedDrugs.length > 0 && (
                            <div className="text-xl sm:text-2xl font-mono font-bold gradient-text">
                              {selectedDrugs.length}
                            </div>
                          )}
                        </div>

                        {selectedDrugs.length === 0 ? (
                          <div className="text-center py-8 sm:py-12 border-2 border-dashed border-border/50 rounded-xl sm:rounded-2xl">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/40" />
                            </div>
                            <p className="text-muted-foreground font-medium mb-1 text-sm sm:text-base">
                              Start by adding medications
                            </p>
                            <p className="text-muted-foreground/60 text-xs sm:text-sm px-4">
                              Use the search above or identify a pill by photo
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2 sm:space-y-3">
                            {selectedDrugs.map((drug, i) => (
                              drug && drug.name ? (
                                <div
                                  key={drug.name}
                                  className="flex items-center justify-between bg-secondary/40 hover:bg-secondary/60 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3.5 transition-all duration-300 group border border-transparent hover:border-primary/30 animate-scale-in"
                                  style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm flex-shrink-0">
                                      <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                                    </div>
                                    <span className="font-medium sm:font-semibold text-foreground text-sm sm:text-base truncate">{drug.name}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveDrug(drug.name)}
                                    className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg sm:rounded-xl opacity-60 group-hover:opacity-100 flex-shrink-0 ml-2"
                                  >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </Button>
                                </div>
                              ) : null
                            ))}
                          </div>
                        )}

                        {/* Check Button */}
                        {selectedDrugs.length >= 2 && (
                          <Button
                            className="w-full mt-4 sm:mt-6 gap-2 sm:gap-3 h-12 sm:h-14 gradient-primary text-primary-foreground shadow-neon btn-neon rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg group"
                            onClick={analyzeInteractions}
                            disabled={isAnalyzing}
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="text-sm sm:text-base">Analyzing Interactions...</span>
                              </>
                            ) : (
                              <>
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Check for Interactions</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </Button>
                        )}

                        {selectedDrugs.length === 1 && (
                          <div className="text-center text-muted-foreground text-xs sm:text-sm mt-4 sm:mt-6 flex items-center justify-center gap-2 font-medium glass px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-warning flex-shrink-0" />
                            <span>Add at least one more medication to check interactions</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Safety Info */}
                  <Card className="glass border-primary/20 rounded-xl sm:rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                          <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground mb-1 flex items-center gap-2 text-sm sm:text-base">
                            Healthcare Advisory
                            <Heart className="w-3 h-3 text-destructive" />
                          </p>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                            This tool is for informational purposes only. Always consult your doctor,
                            pharmacist, or healthcare provider before making medication changes.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>


                  {/* Value Proposition / Why Helpful */}
                  <div className="grid sm:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Card className="glass border-primary/10 rounded-xl hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-foreground mb-1">Safety First</h3>
                        <p className="text-xs text-muted-foreground">Prevent dangerous adverse reactions before they happen.</p>
                      </CardContent>
                    </Card>
                    <Card className="glass border-primary/10 rounded-xl hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-foreground mb-1">AI Powered</h3>
                        <p className="text-xs text-muted-foreground">Deep analysis using advanced LLMs to find hidden risks.</p>
                      </CardContent>
                    </Card>
                    <Card className="glass border-primary/10 rounded-xl hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-foreground mb-1">Clinical Grade</h3>
                        <p className="text-xs text-muted-foreground">Backed by NLM guidelines and advanced pharmacology.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            }

            {/* Step 2: Results */}
            {
              currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6 animate-fade-in">
                  {/* Results Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-foreground mb-1 sm:mb-2">
                        Interaction <span className="gradient-text">Results</span>
                      </h1>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Analysis for {selectedDrugs.length} medications
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        onClick={goBack}
                        className="gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl text-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Medications</span>
                        <span className="sm:hidden">Edit</span>
                      </Button>
                      <ExportReportButton drugs={selectedDrugs.map(d => d.name)} interactions={interactions} /> {/* Pass drug names */}
                    </div>
                  </div>

                  {/* Medications Summary */}
                  <Card className="glass-strong border-border/50 rounded-xl sm:rounded-2xl">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <span className="font-semibold text-foreground text-sm sm:text-base">Your Medications</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {selectedDrugs.map((drug, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl border border-secondary group hover:border-primary/50 transition-colors animate-fade-in"
                          >
                            <span className="font-medium">{drug.name}</span>
                            <button
                              onClick={() => handleRemoveDrug(drug.name)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interaction Results */}
                  <InteractionResults
                    interactions={interactions}
                    drugs={selectedDrugs.map(d => d.name)} // Pass drug names
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 rounded-lg sm:rounded-xl text-sm"
                      onClick={goBack}
                    >
                      <Plus className="w-4 h-4" />
                      Add More Medications
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 rounded-lg sm:rounded-xl text-sm"
                      onClick={startOver}
                    >
                      Start New Check
                    </Button>
                  </div>
                </div>
              )
            }
          </div >
        </div >

        {/* Sticky Sidebar - Recent Checks */}
        < div className="hidden lg:block sticky top-24 space-y-6 animate-fade-in-left" style={{ animationDelay: "0.5s" }}>
          <Card className="glass-strong border-primary/20 rounded-2xl shadow-neon-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <History className="w-5 h-5" />
                <h3 className="font-heading font-bold text-lg">Recent Checks</h3>
              </div>

              {recentChecks.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p>No recent history</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentChecks.map((check) => (
                    <div
                      key={check.id}
                      onClick={() => restoreCheck(check.drugs)}
                      className="group p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-transparent hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground group-hover:text-primary transition-colors">
                          {new Date(check.date).toLocaleDateString()}
                        </span>
                        <RotateCcw className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {check.drugs.slice(0, 3).map((drug, i) => (
                          <span key={i} className="text-xs px-1.5 py-0.5 rounded-md bg-background/50 text-foreground border border-border/50 truncate max-w-[100px]">
                            {drug}
                          </span>
                        ))}
                        {check.drugs.length > 3 && (
                          <span className="text-xs px-1.5 py-0.5 text-muted-foreground">+{check.drugs.length - 3}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div >
    </div >
      </main >

  <Footer />


    </div >
  );
};

export default InteractionChecker;
