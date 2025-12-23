import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import Logo from "@/components/Logo";
import React, { useState, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Header = forwardRef<HTMLElement, object>((_, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isChecker = location.pathname === "/checker";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/40 shadow-lg shadow-primary/5"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo size="md" showTagline={true} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                location.pathname === "/"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              Home
            </Link>
            <Link
              to="/checker"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                location.pathname === "/checker"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              Drug Checker
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            <ThemeToggle />
            {isChecker && <LanguageSelector />}

            <Link to="/checker" className="hidden sm:block">
              <Button
                size="sm"
                className={cn(
                  "gap-2 font-semibold rounded-lg transition-all duration-300 group h-9 px-4",
                  isChecker
                    ? "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-glow-sm"
                )}
              >
                {isChecker ? (
                  <>
                    <Activity className="w-4 h-4 text-primary" />
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <span>Start Check</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isMobileMenuOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-border/50">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-all duration-200",
                location.pathname === "/"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/checker"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-all duration-200",
                location.pathname === "/checker"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              Drug Checker
            </Link>
            <Link to="/checker" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold h-11">
                <Activity className="w-4 h-4 mr-2" />
                Start Check
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
