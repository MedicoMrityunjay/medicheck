import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pill, Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MedicationDosage {
  id: string;
  drug_name: string;
  dosage: string;
  frequency: string;
  notes: string | null;
  start_date: string;
}

const frequencyOptions = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Four times daily",
  "Every 4 hours",
  "Every 6 hours",
  "Every 8 hours",
  "Every 12 hours",
  "Once weekly",
  "As needed",
];

const STORAGE_KEY = "medicheck_dosages";

const DosageTrackingPanel = () => {
  const [dosages, setDosages] = useState<MedicationDosage[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDosage, setEditingDosage] = useState<MedicationDosage | null>(null);
  const [formData, setFormData] = useState({
    drug_name: "",
    dosage: "",
    frequency: "",
    notes: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
  });
  const { toast } = useToast();

  const persistDosages = (newDosages: MedicationDosage[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDosages));
    setDosages(newDosages);
  };

  const resetForm = () => {
    setFormData({
      drug_name: "",
      dosage: "",
      frequency: "",
      notes: "",
      start_date: format(new Date(), "yyyy-MM-dd"),
    });
    setEditingDosage(null);
  };

  const handleOpenDialog = (dosage?: MedicationDosage) => {
    if (dosage) {
      setEditingDosage(dosage);
      setFormData({
        drug_name: dosage.drug_name,
        dosage: dosage.dosage,
        frequency: dosage.frequency,
        notes: dosage.notes || "",
        start_date: dosage.start_date,
      });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSaveDosage = () => {
    if (!formData.drug_name.trim() || !formData.dosage.trim() || !formData.frequency) {
      toast({
        title: "Missing fields",
        description: "Please fill in drug name, dosage, and frequency.",
        variant: "destructive",
      });
      return;
    }

    if (editingDosage) {
      const updatedDosages = dosages.map((d) =>
        d.id === editingDosage.id
          ? {
              ...d,
              drug_name: formData.drug_name.trim(),
              dosage: formData.dosage.trim(),
              frequency: formData.frequency,
              notes: formData.notes.trim() || null,
              start_date: formData.start_date,
            }
          : d
      );
      persistDosages(updatedDosages);
      toast({
        title: "Updated",
        description: `${formData.drug_name} dosage has been updated.`,
      });
    } else {
      const newDosage: MedicationDosage = {
        id: crypto.randomUUID(),
        drug_name: formData.drug_name.trim(),
        dosage: formData.dosage.trim(),
        frequency: formData.frequency,
        notes: formData.notes.trim() || null,
        start_date: formData.start_date,
      };
      persistDosages([...dosages, newDosage]);
      toast({
        title: "Added",
        description: `${formData.drug_name} has been added to your medications.`,
      });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDeleteDosage = (dosageId: string, drugName: string) => {
    persistDosages(dosages.filter((d) => d.id !== dosageId));
    toast({
      title: "Removed",
      description: `${drugName} has been removed from medications.`,
    });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-heading flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            My Medications
          </span>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingDosage ? "Edit Medication" : "Add Medication"}
                </DialogTitle>
                <DialogDescription>
                  {editingDosage
                    ? "Update the dosage information for this medication."
                    : "Add a new medication to track its dosage."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Drug Name</label>
                  <Input
                    placeholder="e.g., Metformin"
                    value={formData.drug_name}
                    onChange={(e) =>
                      setFormData({ ...formData, drug_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Dosage</label>
                  <Input
                    placeholder="e.g., 500mg"
                    value={formData.dosage}
                    onChange={(e) =>
                      setFormData({ ...formData, dosage: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Frequency</label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Start Date</label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Notes (optional)</label>
                  <Input
                    placeholder="e.g., Take with food"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveDosage}>
                  {editingDosage ? "Update" : "Add Medication"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {dosages.length === 0 ? (
          <div className="text-center py-6">
            <Pill className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">
              No medications tracked yet. Add your first medication above.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {dosages.map((dosage) => (
              <div
                key={dosage.id}
                className="bg-secondary/50 rounded-lg px-3 py-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">
                      {dosage.drug_name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {dosage.dosage}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {dosage.frequency}
                      </Badge>
                    </div>
                    {dosage.notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {dosage.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(dosage)}
                      className="h-7 w-7 p-0"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDosage(dosage.id, dosage.drug_name)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DosageTrackingPanel;
