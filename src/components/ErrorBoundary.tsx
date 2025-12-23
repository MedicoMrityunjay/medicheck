
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full bg-card border border-destructive/20 rounded-2xl shadow-xl p-6 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground mb-2">Something went wrong</h1>
                        <p className="text-muted-foreground mb-6 text-sm">
                            We encountered an unexpected error. The application has been paused to prevent data loss.
                        </p>
                        <div className="bg-muted/50 p-3 rounded-lg text-left mb-6 overflow-auto max-h-32">
                            <code className="text-xs text-muted-foreground font-mono">
                                {this.state.error?.message}
                            </code>
                        </div>
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full gap-2"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Reload Application
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
