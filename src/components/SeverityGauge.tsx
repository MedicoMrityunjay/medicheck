
import React from 'react';
import { cn } from '@/lib/utils';

interface SeverityGaugeProps {
    level: 'critical' | 'major' | 'moderate' | 'minor';
    count: number;
}

const SeverityGauge: React.FC<SeverityGaugeProps> = ({ level, count }) => {
    const radius = 18;
    const stroke = 3;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    // Calculate percentage based on level (just visual flair, not actual data percentage unless we want relative)
    // Let's make it static per level type for consistency, or strictly based on count? 
    // Let's make it strictly stylistic: Critical = 90%, Major = 75%, Moderate = 50%, Minor = 25%
    let percent = 25;
    let color = "text-severity-minor";
    let label = "Minor";

    switch (level) {
        case 'critical':
            percent = 90;
            color = "text-severity-critical";
            label = "Critical";
            break;
        case 'major':
            percent = 75;
            color = "text-severity-major";
            label = "Major";
            break;
        case 'moderate':
            percent = 50;
            color = "text-severity-moderate";
            label = "Moderate";
            break;
        default:
            percent = 25;
            color = "text-severity-minor";
            label = "Minor";
    }

    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-secondary/30 border border-border/50 min-w-[80px]">
            <div className="relative flex items-center justify-center">
                {/* Gauge SVG */}
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset: 0 }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="text-muted/30"
                    />
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className={cn(color, "transition-all duration-1000 ease-out")}
                        strokeLinecap="round"
                    />
                </svg>
                <span className={cn("absolute text-xs font-bold", color)}>{count}</span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
    );
};

export default SeverityGauge;
