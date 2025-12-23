import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Pill, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import type { DrugInfo } from "@/types/drug";

interface DrugInfoDialogProps {
  drugName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDrug?: (drugName: string) => void;
}

const DrugInfoDialog = ({ drugName, open, onOpenChange, onAddDrug }: DrugInfoDialogProps) => {
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const fetchDrugInfo = async (name: string) => {
    setIsLoading(true);
    setDrugInfo(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/drug-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ drugName: name }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch drug information");
      }

      const data = await response.json();
      setDrugInfo(data);
    } catch (error) {
      console.error("Error fetching drug info:", error);
      toast({
        title: t("common.error"),
        description: "Failed to load drug information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (newOpen && drugName) {
      fetchDrugInfo(drugName);
    } else if (!newOpen) {
      setDrugInfo(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            {drugName}
          </DialogTitle>
          <DialogDescription>{t("drugInfo.title")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("drugInfo.loading")}</p>
          </div>
        ) : drugInfo ? (
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                {t("drugInfo.overview")}
              </h4>
              <p className="text-sm text-muted-foreground">{drugInfo.overview}</p>
              <Badge variant="secondary" className="mt-2">
                {drugInfo.drugClass}
              </Badge>
            </div>

            {/* Side Effects */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                {t("drugInfo.sideEffects")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {drugInfo.sideEffects.map((effect, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contraindications */}
            <div>
              <h4 className="font-semibold text-sm mb-2">{t("drugInfo.contraindications")}</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {drugInfo.contraindications.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Dosing Guidelines */}
            <div>
              <h4 className="font-semibold text-sm mb-2">{t("drugInfo.dosingGuidelines")}</h4>
              <p className="text-sm text-muted-foreground">{drugInfo.dosingGuidelines}</p>
            </div>

            {/* Warnings */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 text-destructive">
                {t("drugInfo.warnings")}
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {drugInfo.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            {onAddDrug && (
              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={() => {
                    onAddDrug(drugInfo.name);
                    onOpenChange(false);
                  }}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {t("drugInfo.checkInteractions")}
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default DrugInfoDialog;
