
import React, { useMemo } from 'react';
import { DrugInteraction } from '@/types/drug';
import { cn } from '@/lib/utils';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface InteractionGraphProps {
    drugs: string[];
    interactions: DrugInteraction[];
}

const InteractionGraph: React.FC<InteractionGraphProps> = ({ drugs, interactions }) => {
    // 1. Calculate Layout (Circular)
    const radius = 120;
    const center = 160; // viewBox 320x320

    const nodes = useMemo(() => {
        const uniqueDrugs = Array.from(new Set(drugs));
        const angleStep = (2 * Math.PI) / uniqueDrugs.length;

        return uniqueDrugs.map((drug, index) => {
            const angle = index * angleStep - Math.PI / 2; // Start from top
            return {
                id: drug,
                x: center + radius * Math.cos(angle),
                y: center + radius * Math.sin(angle),
                angle,
            };
        });
    }, [drugs]);

    // 2. Identify Links
    const links = useMemo(() => {
        return interactions.map((interaction) => {
            const source = nodes.find(n => n.id === interaction.drug1);
            const target = nodes.find(n => n.id === interaction.drug2);

            if (!source || !target) return null;

            let color = "stroke-gray-400";
            let width = 1;
            let opacity = 0.5;
            let animation = "";

            switch (interaction.severity.toLowerCase()) {
                case 'critical':
                    color = "stroke-severity-critical";
                    width = 3;
                    opacity = 1;
                    animation = "animate-pulse-fast";
                    break;
                case 'major':
                    color = "stroke-severity-major";
                    width = 2.5;
                    opacity = 0.9;
                    break;
                case 'moderate':
                    color = "stroke-severity-moderate";
                    width = 2;
                    opacity = 0.7;
                    break;
                default:
                    color = "stroke-severity-minor";
                    width = 1.5;
            }

            return { source, target, color, width, opacity, animation, interaction };
        }).filter(Boolean);
    }, [interactions, nodes]);

    // If no interactions, show safety shield
    if (interactions.length === 0 && drugs.length > 1) {
        return (
            <div className="flex flex-col items-center justify-center p-8 h-[320px] animate-fade-in">
                <div className="relative">
                    <div className="absolute inset-0 bg-success/20 rounded-full animate-ping opacity-20 duration-3000" />
                    <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-4 border border-success/30 shadow-glow-success">
                        <ShieldCheck className="w-12 h-12 text-success" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">No Interactions Found</h3>
                <p className="text-muted-foreground text-sm text-center max-w-xs mt-2">
                    No known interactions were found between these medications.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center animate-fade-in relative z-10">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 tracking-wider uppercase">Drug Interaction Network</h3>
            <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
                <defs>
                    <filter id="glow-critical" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Links */}
                {links.map((link, i) => (
                    link && (
                        <g key={i} className={link.animation}>
                            <line
                                x1={link.source.x}
                                y1={link.source.y}
                                x2={link.target.x}
                                y2={link.target.y}
                                className={cn(link.color, "transition-all duration-1000 ease-out")}
                                strokeWidth={link.width}
                                strokeOpacity={link.opacity}
                                strokeLinecap="round"
                                filter={link.width > 2 ? "url(#glow-critical)" : undefined}
                            />
                        </g>
                    )
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <g key={node.id} className="group cursor-default">
                        {/* Halo */}
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={25}
                            className="fill-background stroke-border group-hover:stroke-primary group-hover:fill-secondary transition-all duration-300"
                            strokeWidth={2}
                        />
                        {/* Inner Dot */}
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={4}
                            className={cn(
                                "fill-primary transition-all duration-500",
                                interactions.some(int => int.drug1 === node.id || int.drug2 === node.id)
                                    ? "fill-warning animate-pulse-slow"
                                    : "fill-success"
                            )}
                        />

                        {/* Initials */}
                        <text
                            x={node.x}
                            y={node.y + 1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] font-bold fill-foreground pointer-events-none uppercase"
                        >
                            {node.id.substring(0, 1)}
                        </text>

                        {/* Label (Tooltip style on hover, or static outside) */}
                        <text
                            x={node.x}
                            y={node.y + 40}
                            textAnchor="middle"
                            className="text-[10px] sm:text-xs font-medium fill-muted-foreground group-hover:fill-primary transition-colors uppercase tracking-tight"
                        >
                            {node.id.length > 12 ? node.id.substring(0, 10) + '...' : node.id}
                        </text>
                    </g>
                ))}
            </svg>

            {interactions.length > 0 && (
                <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-severity-major animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Major Link</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-[10px] text-muted-foreground">Safe Node</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractionGraph;
