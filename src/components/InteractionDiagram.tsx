import { useMemo } from "react";
import InteractionGraph from "./InteractionGraph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Network, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DrugInteraction } from "@/types/drug";

interface InteractionDiagramProps {
  interactions: DrugInteraction[];
  drugs: string[];
}

const severityColors = {
  critical: "hsl(var(--severity-critical))",
  major: "hsl(var(--severity-major))",
  moderate: "hsl(var(--severity-moderate))",
  minor: "hsl(var(--severity-minor))",
};

const confidenceColors = {
  high: "hsl(var(--confidence-high))",
  medium: "hsl(var(--confidence-medium))",
  low: "hsl(var(--confidence-low))",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value} interaction{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

const InteractionDiagram = ({ interactions, drugs }: InteractionDiagramProps) => {
  // Prepare severity distribution data
  const severityData = useMemo(() => {
    const counts = interactions.reduce((acc, i) => {
      acc[i.severity] = (acc[i.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: "Critical", value: counts.critical || 0, color: severityColors.critical },
      { name: "Major", value: counts.major || 0, color: severityColors.major },
      { name: "Moderate", value: counts.moderate || 0, color: severityColors.moderate },
      { name: "Minor", value: counts.minor || 0, color: severityColors.minor },
    ].filter(d => d.value > 0);
  }, [interactions]);

  // Prepare confidence distribution data
  const confidenceData = useMemo(() => {
    const counts = interactions.reduce((acc, i) => {
      acc[i.confidence] = (acc[i.confidence] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: "High", value: counts.high || 0, color: confidenceColors.high },
      { name: "Medium", value: counts.medium || 0, color: confidenceColors.medium },
      { name: "Low", value: counts.low || 0, color: confidenceColors.low },
    ].filter(d => d.value > 0);
  }, [interactions]);

  // Build drug interaction network
  const networkData = useMemo(() => {
    const drugInteractionMap = new Map<string, { drug: string; interactions: number; severity: string }>();

    drugs.forEach(drug => {
      drugInteractionMap.set(drug, { drug, interactions: 0, severity: "none" });
    });

    interactions.forEach(interaction => {
      const d1 = drugInteractionMap.get(interaction.drug1);
      const d2 = drugInteractionMap.get(interaction.drug2);

      if (d1) {
        d1.interactions++;
        if (interaction.severity === "critical" || d1.severity !== "critical") {
          d1.severity = interaction.severity;
        }
      }
      if (d2) {
        d2.interactions++;
        if (interaction.severity === "critical" || d2.severity !== "critical") {
          d2.severity = interaction.severity;
        }
      }
    });

    return Array.from(drugInteractionMap.values());
  }, [drugs, interactions]);

  if (interactions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Network Visualization */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-base flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            Drug Interaction Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InteractionGraph drugs={drugs} interactions={interactions} />
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Severity Distribution */}
        <Card className="border-border/50 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Severity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Distribution */}
        <Card className="border-border/50 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Confidence Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confidenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={800}
                  >
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interaction Matrix */}
      <Card className="border-border/50 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-base flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            Interaction Pairs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {interactions.map((interaction, index) => (
              <div
                key={`${interaction.drug1}-${interaction.drug2}-${index}`}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border-l-4 bg-secondary/30 transition-all hover:bg-secondary/50",
                  "animate-slide-in-right",
                  interaction.severity === "critical" && "border-l-severity-critical",
                  interaction.severity === "major" && "border-l-severity-major",
                  interaction.severity === "moderate" && "border-l-severity-moderate",
                  interaction.severity === "minor" && "border-l-severity-minor"
                )}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-medium">
                      {interaction.drug1}
                    </Badge>
                    <span className="text-muted-foreground">↔</span>
                    <Badge variant="outline" className="font-medium">
                      {interaction.drug2}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn(
                      "text-xs",
                      interaction.severity === "critical" && "bg-severity-critical text-white",
                      interaction.severity === "major" && "bg-severity-major text-white",
                      interaction.severity === "moderate" && "bg-severity-moderate text-white",
                      interaction.severity === "minor" && "bg-severity-minor text-foreground"
                    )}
                  >
                    {interaction.severity}
                  </Badge>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {interaction.confidence}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractionDiagram;
