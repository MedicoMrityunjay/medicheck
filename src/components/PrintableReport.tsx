import { forwardRef } from "react";
import { format } from "date-fns";
import type { DrugInteraction } from "@/types/drug";
import InteractionGraph from "./InteractionGraph";

interface PrintableReportProps {
  drugs: string[];
  interactions: DrugInteraction[];
  className?: string;
}

const severityLabels = {
  critical: "CRITICAL",
  major: "MAJOR",
  moderate: "MODERATE",
  minor: "MINOR",
};

const PrintableReport = forwardRef<HTMLDivElement, PrintableReportProps>(
  ({ drugs, interactions, className }, ref) => {
    const sortedInteractions = [...interactions].sort((a, b) => {
      const order = { critical: 0, major: 1, moderate: 2, minor: 3 };
      return order[a.severity] - order[b.severity];
    });

    const severityCounts = interactions.reduce(
      (acc, i) => {
        acc[i.severity] = (acc[i.severity] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return (
      <div ref={ref} className={`print-report ${className || "hidden print:block"}`}>
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              .print-report,
              .print-report * {
                visibility: visible;
              }
              .print-report {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                padding: 20px;
                background: white;
                color: black;
                font-family: 'Georgia', 'Times New Roman', serif;
              }
              .print-header {
                text-align: center;
                border-bottom: 2px solid #333;
                padding-bottom: 16px;
                margin-bottom: 24px;
              }
              .print-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 8px;
                color: #1a1a1a;
              }
              .print-subtitle {
                font-size: 12px;
                color: #666;
              }
              .print-section {
                margin-bottom: 24px;
                page-break-inside: avoid;
              }
              .print-section-title {
                font-size: 16px;
                font-weight: bold;
                border-bottom: 1px solid #ccc;
                padding-bottom: 8px;
                margin-bottom: 12px;
                color: #333;
              }
              .print-drug-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 16px;
              }
              .print-drug-item {
                background: #f3f4f6;
                padding: 4px 12px;
                border-radius: 4px;
                font-size: 12px;
              }
              .print-summary-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 12px;
                margin-bottom: 16px;
              }
              .print-summary-item {
                text-align: center;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 4px;
              }
              .print-summary-count {
                font-size: 24px;
                font-weight: bold;
              }
              .print-summary-label {
                font-size: 11px;
                text-transform: uppercase;
                color: #666;
              }
              .severity-critical { color: #dc2626; }
              .severity-major { color: #ea580c; }
              .severity-moderate { color: #ca8a04; }
              .severity-minor { color: #16a34a; }
              .print-interaction {
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-bottom: 16px;
                overflow: hidden;
                page-break-inside: avoid;
              }
              .print-interaction-header {
                padding: 12px 16px;
                background: #f9fafb;
                border-bottom: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .print-interaction-drugs {
                font-size: 14px;
                font-weight: bold;
              }
              .print-interaction-badge {
                font-size: 10px;
                padding: 2px 8px;
                border-radius: 4px;
                font-weight: bold;
                text-transform: uppercase;
              }
              .badge-critical { background: #fef2f2; border: 1px solid #dc2626; color: #dc2626; }
              .badge-major { background: #fff7ed; border: 1px solid #ea580c; color: #ea580c; }
              .badge-moderate { background: #fefce8; border: 1px solid #ca8a04; color: #ca8a04; }
              .badge-minor { background: #f0fdf4; border: 1px solid #16a34a; color: #16a34a; }
              .print-interaction-body {
                padding: 16px;
              }
              .print-interaction-desc {
                font-size: 13px;
                line-height: 1.6;
                margin-bottom: 16px;
              }
              .print-detail-section {
                margin-bottom: 12px;
              }
              .print-detail-title {
                font-size: 11px;
                font-weight: bold;
                color: #374151;
                text-transform: uppercase;
                margin-bottom: 4px;
              }
              .print-detail-content {
                font-size: 12px;
                line-height: 1.5;
                color: #4b5563;
              }
              .print-disclaimer {
                margin-top: 32px;
                padding: 16px;
                background: #f9fafb;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 10px;
                color: #666;
                line-height: 1.5;
              }
              .print-no-interactions {
                text-align: center;
                padding: 40px;
                background: #f0fdf4;
                border: 2px solid #16a34a;
                border-radius: 8px;
                color: #16a34a;
              }
              .print-no-interactions-icon {
                font-size: 48px;
                margin-bottom: 12px;
              }
              .print-no-interactions-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 8px;
              }
              .print-no-interactions-text {
                font-size: 12px;
              }
              .print-footer {
                margin-top: 24px;
                padding-top: 16px;
                border-top: 1px solid #ddd;
                text-align: center;
                font-size: 10px;
                color: #999;
              }
            }
          `}
        </style>

        {/* Header */}
        <div className="print-header">
          <div className="print-title">Drug Interaction Analysis Report</div>
          <div className="print-subtitle">
            Generated on {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
          </div>
        </div>

        {/* Medications Analyzed */}
        <div className="print-section">
          <div className="print-section-title">Medications Analyzed</div>
          <div className="print-drug-list">
            {drugs.map((drug) => (
              <span key={drug} className="print-drug-item">
                {drug}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="print-section">
          <div className="print-section-title">Analysis Summary</div>
          {interactions.length === 0 ? (
            <div className="print-no-interactions">
              <div className="print-no-interactions-icon">✓</div>
              <div className="print-no-interactions-title">No Known Interactions Found</div>
              <div className="print-no-interactions-text">
                Our analysis did not find any known interactions between the selected medications.
              </div>
            </div>
          ) : (
            <div className="print-summary-grid">
              <div className="print-summary-item">
                <div className="print-summary-count severity-critical">
                  {severityCounts.critical || 0}
                </div>
                <div className="print-summary-label">Critical</div>
              </div>
              <div className="print-summary-item">
                <div className="print-summary-count severity-major">
                  {severityCounts.major || 0}
                </div>
                <div className="print-summary-label">Major</div>
              </div>
              <div className="print-summary-item">
                <div className="print-summary-count severity-moderate">
                  {severityCounts.moderate || 0}
                </div>
                <div className="print-summary-label">Moderate</div>
              </div>
              <div className="print-summary-item">
                <div className="print-summary-count severity-minor">
                  {severityCounts.minor || 0}
                </div>
                <div className="print-summary-label">Minor</div>
              </div>
            </div>
          )}
        </div>

        {/* Visual Analysis */}
        {interactions.length > 0 && (
          <div className="print-section" style={{ pageBreakInside: "avoid" }}>
            <div className="print-section-title">Interaction Graph</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px", border: "1px solid #eee", borderRadius: "8px" }}>
              <InteractionGraph drugs={drugs} interactions={interactions} />
            </div>
            <p style={{ fontSize: "10px", color: "#666", textAlign: "center", marginTop: "8px" }}>
              Visual representation of interaction network. Red connections indicate critical severity.
            </p>
          </div>
        )}

        {/* Detailed Interactions */}
        {sortedInteractions.length > 0 && (
          <div className="print-section">
            <div className="print-section-title">Detailed Interactions</div>
            {sortedInteractions.map((interaction, index) => (
              <div key={`${interaction.drug1}-${interaction.drug2}-${index}`} className="print-interaction">
                <div className="print-interaction-header">
                  <span className="print-interaction-drugs">
                    {interaction.drug1} + {interaction.drug2}
                  </span>
                  <span className={`print-interaction-badge badge-${interaction.severity}`}>
                    {severityLabels[interaction.severity]}
                  </span>
                </div>
                <div className="print-interaction-body">
                  <div className="print-interaction-desc">{interaction.description}</div>

                  <div className="print-detail-section">
                    <div className="print-detail-title">Mechanism of Interaction</div>
                    <div className="print-detail-content">{interaction.mechanism}</div>
                  </div>

                  <div className="print-detail-section">
                    <div className="print-detail-title">Clinical Effects</div>
                    <div className="print-detail-content">{interaction.clinicalEffects}</div>
                  </div>

                  <div className="print-detail-section">
                    <div className="print-detail-title">Clinical Recommendations</div>
                    <div className="print-detail-content">{interaction.recommendations}</div>
                  </div>

                  {interaction.alternatives && interaction.alternatives.length > 0 && (
                    <div className="print-detail-section">
                      <div className="print-detail-title">Potential Alternatives</div>
                      <div className="print-detail-content">
                        {interaction.alternatives.map((alt, i) => (
                          <div key={i}>• {alt.name}: {alt.reason}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="print-disclaimer">
          <strong>IMPORTANT DISCLAIMER:</strong> This report is provided for educational and informational purposes only.
          It is not intended to replace professional medical advice, diagnosis, or treatment.
          Always seek the advice of your physician or other qualified health provider with any questions you may have
          regarding a medical condition or medication interactions. Never disregard professional medical advice or delay
          in seeking it because of something you have read in this report.
        </div>

        {/* Footer */}
        <div className="print-footer">
          MediCheck • Report ID: {Date.now().toString(36).toUpperCase()}
        </div>
      </div>
    );
  }
);

PrintableReport.displayName = "PrintableReport";

export default PrintableReport;
