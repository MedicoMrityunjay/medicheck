import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2, Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";
import type { DrugInteraction } from "@/types/drug";
import { format } from "date-fns";
import PrintableReport from "./PrintableReport";

interface ExportReportButtonProps {
  drugs: string[];
  interactions: DrugInteraction[];
}

const ExportReportButton = ({ drugs, interactions }: ExportReportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!reportRef.current) return;

    setIsExporting(true);
    // Slight delay to allow DOM to render if we just made it visible
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Retain high quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handle multi-page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`MediCheck_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`);

      toast({
        title: "Report exported",
        description: "Your enhanced lab report is ready.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Export failed",
        description: "Failed to generate report.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          disabled={drugs.length === 0}
          className="gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={generatePDF}
          disabled={isExporting || drugs.length === 0}
          className="gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" />
              Export PDF
            </>
          )}
        </Button>
      </div>

      {/* Printable Report Instance - controlled visibility for capture */}
      <div className={isExporting ? "fixed top-0 left-0 w-[800px] z-[-50] opacity-100 bg-white" : "hidden print:block"}>
        <PrintableReport
          ref={reportRef}
          drugs={drugs}
          interactions={interactions}
          className={isExporting ? "block" : undefined}
        />
      </div>
    </>
  );
};

export default ExportReportButton;
