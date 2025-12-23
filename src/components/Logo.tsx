import { Link } from "react-router-dom";
import { Activity, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  linkTo?: string;
  className?: string;
}

export default function Logo({ size = "md", showTagline = true, linkTo = "/", className }: LogoProps) {
  const sizes = {
    sm: {
      container: "w-8 h-8",
      glow: "w-9 h-9",
      shield: "w-4 h-4",
      activity: "w-2.5 h-2.5",
      text: "text-lg",
      tagline: "text-[8px]",
    },
    md: {
      container: "w-10 h-10",
      glow: "w-11 h-11",
      shield: "w-5 h-5",
      activity: "w-3 h-3",
      text: "text-xl lg:text-2xl",
      tagline: "text-[9px] lg:text-[10px]",
    },
    lg: {
      container: "w-14 h-14",
      glow: "w-16 h-16",
      shield: "w-7 h-7",
      activity: "w-4 h-4",
      text: "text-2xl lg:text-3xl",
      tagline: "text-[10px] lg:text-xs",
    },
  };

  const s = sizes[size];

  const LogoContent = (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      {/* Logo Icon */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div className={cn(
          "absolute rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 blur-md group-hover:blur-lg transition-all duration-500",
          s.glow
        )} />
        
        {/* Main logo container */}
        <div className={cn(
          "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-neon transition-all duration-500 group-hover:scale-105",
          s.container
        )}>
          {/* Shield with heartbeat */}
          <div className="relative">
            <Shield className={cn("text-primary-foreground", s.shield)} strokeWidth={2.5} />
            <Activity className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground", s.activity)} strokeWidth={3} />
          </div>
        </div>
      </div>
      
      {/* Brand text */}
      <div className="flex flex-col -space-y-0.5">
        <span className={cn("font-bold tracking-tight", s.text)}>
          <span className="text-foreground">Medi</span>
          <span className="text-primary">Check</span>
        </span>
        {showTagline && (
          <span className={cn("text-muted-foreground font-medium tracking-[0.2em] uppercase hidden sm:block", s.tagline)}>
            AI Safety Scanner
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{LogoContent}</Link>;
  }

  return LogoContent;
}
