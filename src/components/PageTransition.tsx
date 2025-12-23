
import React from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
    return (
        <div className={cn("animate-fade-in-up transition-all duration-500 ease-out", className)}>
            {children}
        </div>
    );
};

export default PageTransition;
