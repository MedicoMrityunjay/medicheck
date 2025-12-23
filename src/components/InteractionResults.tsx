import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  ExternalLink,
  Microscope,
  Stethoscope,
  FileText,
  Lightbulb,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type { DrugInteraction } from "@/types/drug";
import DrugInfoDialog from "./DrugInfoDialog";
import InteractionDiagram from "./InteractionDiagram";
import SeverityGauge from "./SeverityGauge";

interface InteractionResultsProps {
  interactions: DrugInteraction[];
  drugs: string[];
}

const severityConfig = {
  critical: {
    label: "Critical",
    icon: AlertTriangle,
    className: "severity-critical",
    borderColor: "border-l-severity-critical",
    description: "Life-threatening interaction requiring immediate attention",
  },
  major: {
    label: "Major",
    icon: AlertCircle,
    className: "severity-major",
    borderColor: "border-l-severity-major",
    description: "Significant interaction that may require intervention",
  },
  moderate: {
    label: "Moderate",
    icon: Info,
    className: "severity-moderate",
    borderColor: "border-l-severity-moderate",
    description: "Interaction that may require monitoring",
  },
  minor: {
    label: "Minor",
    icon: CheckCircle2,
    className: "severity-minor",
    borderColor: "border-l-severity-minor",
    description: "Clinically insignificant interaction",
  },
};

const confidenceConfig = {
  high: { label: "High Confidence", className: "confidence-high" },
  medium: { label: "Medium Confidence", className: "confidence-medium" },
  low: { label: "Low Confidence", className: "confidence-low" },
};

const InteractionResults = ({ interactions, drugs }: InteractionResultsProps) => {
  const { t } = useTranslation();
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [drugInfoOpen, setDrugInfoOpen] = useState(false);

  const handleViewDrugInfo = (drugName: string) => {
    setSelectedDrug(drugName);
    setDrugInfoOpen(true);
  };

  if (interactions.length === 0) {
    return (
      <Card className="border-border/50 border-l-4 border-l-success animate-fade-in-up">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 animate-scale-in">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                No Known Interactions Found
              </h3>
              <p className="text-muted-foreground mb-4">
                Our analysis did not find any known interactions between the selected medications:
              </p>
              <div className="flex flex-wrap gap-2">
                {drugs.map((drug, i) => (
                  <Badge
                    key={drug}
                    variant="secondary"
                    className="animate-fade-in hover-scale cursor-pointer transition-all"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    onClick={() => handleViewDrugInfo(drug)}
                  >
                    {drug}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Note: This does not guarantee the absence of interactions. Always consult with
                a healthcare professional before making medication decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort by severity
  const sortedInteractions = [...interactions].sort((a, b) => {
    const order = { critical: 0, major: 1, moderate: 2, minor: 3 };
    return order[a.severity] - order[b.severity];
  });

  // Count by severity
  const severityCounts = sortedInteractions.reduce(
    (acc, i) => {
      acc[i.severity] = (acc[i.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Visual Interaction Diagrams */}
      <InteractionDiagram interactions={interactions} drugs={drugs} />

      {/* Summary Header */}
      <Card className="border-border/50 animate-fade-in-up card-hover">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center justify-between">
            <span>Detailed Interaction Analysis</span>
            <span className="text-sm font-normal text-muted-foreground">
              {interactions.length} interaction{interactions.length !== 1 ? "s" : ""} found
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {(["critical", "major", "moderate", "minor"] as const).map((severity, i) => {
              const count = severityCounts[severity] || 0;
              if (count === 0) return null;
              return (
                <div key={severity} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <SeverityGauge level={severity} count={count} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interaction Cards */}
      <Accordion type="multiple" defaultValue={[sortedInteractions[0]?.drug1 + sortedInteractions[0]?.drug2]} className="space-y-4">
        {sortedInteractions.map((interaction, index) => {
          const config = severityConfig[interaction.severity];
          const SeverityIcon = config.icon;
          const confidenceLabel = confidenceConfig[interaction.confidence];

          return (
            <AccordionItem
              key={`${interaction.drug1}-${interaction.drug2}-${index}`}
              value={interaction.drug1 + interaction.drug2}
              className="border-0 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <Card className={cn(
                "border-border/50 border-l-4 transition-all duration-300 hover:shadow-clinical-lg",
                config.borderColor
              )}>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center gap-3 flex-1">
                      <SeverityIcon className={cn("w-5 h-5",
                        interaction.severity === "critical" && "text-severity-critical",
                        interaction.severity === "major" && "text-severity-major",
                        interaction.severity === "moderate" && "text-severity-moderate",
                        interaction.severity === "minor" && "text-severity-minor"
                      )} />
                      <div className="text-left">
                        <div className="font-heading font-semibold text-foreground">
                          {interaction.drug1} + {interaction.drug2}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={config.className} variant="secondary">
                            {config.label}
                          </Badge>
                          <span className={cn("text-xs font-medium", confidenceLabel.className)}>
                            {confidenceLabel.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <CardContent className="pt-0 pb-6 space-y-6">
                    {/* Description */}
                    <div>
                      <p className="text-foreground leading-relaxed">
                        {interaction.description}
                      </p>
                    </div>

                    {/* Mechanism */}
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Microscope className="w-4 h-4 text-primary" />
                        <h4 className="font-heading font-semibold text-sm text-foreground">
                          Mechanism of Interaction
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interaction.mechanism}
                      </p>
                    </div>

                    {/* Clinical Effects */}
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-warning" />
                        <h4 className="font-heading font-semibold text-sm text-foreground">
                          Clinical Effects
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interaction.clinicalEffects}
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-primary" />
                        <h4 className="font-heading font-semibold text-sm text-foreground">
                          Clinical Recommendations
                        </h4>
                      </div>
                      <p className="text-sm text-foreground">
                        {interaction.recommendations}
                      </p>
                    </div>

                    {/* Citations */}
                    {interaction.citations && interaction.citations.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <h4 className="font-heading font-semibold text-sm text-foreground">
                            {t("results.citations")}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {interaction.citations.map((citation, citationIndex) => (
                            <div
                              key={citationIndex}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-muted-foreground font-mono text-xs mt-0.5">
                                [{citationIndex + 1}]
                              </span>
                              <div>
                                <span className="text-foreground">{citation.title}</span>
                                <span className="text-muted-foreground"> — {citation.source}</span>
                                {citation.url && (
                                  <a
                                    href={citation.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-primary hover:underline ml-2"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alternatives */}
                    {interaction.alternatives && interaction.alternatives.length > 0 && (
                      <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-success" />
                          <h4 className="font-heading font-semibold text-sm text-foreground">
                            {t("results.alternatives")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          {t("results.alternativesDescription")}
                        </p>
                        <div className="space-y-2">
                          {interaction.alternatives.map((alt, altIndex) => (
                            <div
                              key={altIndex}
                              className="flex items-start justify-between gap-2 bg-background/50 rounded p-2"
                            >
                              <div>
                                <span className="font-medium text-sm text-foreground">
                                  {alt.name}
                                </span>
                                <p className="text-xs text-muted-foreground">{alt.reason}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDrugInfo(alt.name)}
                                className="h-7 text-xs"
                              >
                                <Pill className="w-3 h-3 mr-1" />
                                Info
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Disclaimer */}
      <Card className="border-border/50 bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> {t("results.disclaimer")}
          </p>
        </CardContent>
      </Card>

      {/* Drug Info Dialog */}
      <DrugInfoDialog
        drugName={selectedDrug}
        open={drugInfoOpen}
        onOpenChange={setDrugInfoOpen}
      />
    </div>
  );
};

export default InteractionResults;
