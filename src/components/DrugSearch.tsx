import { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DrugSearchResult } from "@/types/drug";

interface DrugSearchProps {
  onSelectDrug: (drug: DrugSearchResult) => void;
  mode: "offline" | "online";
}

// Local imports removed for AI-Only mode

const DrugSearch = ({ onSelectDrug, mode }: DrugSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DrugSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const searchDrugs = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const drugs: DrugSearchResult[] = [];
        // --- ONLINE MODE: NLM API ---
        const response = await fetch(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(searchQuery)}&maxEntries=10`);
        const data = await response.json();

        if (data.approximateGroup && data.approximateGroup.candidate) {
          const seenRxcuis = new Set<string>();

          data.approximateGroup.candidate.forEach((candidate: any) => {
            const rxcui = candidate.rxcui;
            // Only add if we haven't seen this RxCUI before
            if (rxcui && !seenRxcuis.has(rxcui)) {
              seenRxcuis.add(rxcui);
              drugs.push({
                name: candidate.synonym || searchQuery,
                rxcui: rxcui,
                synonym: candidate.synonym
              });
            }
          });
        }
        setResults(drugs);
      } catch (error) {
        console.error("Drug search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowResults(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      searchDrugs(value);
    }, 400); // 400ms debounce
  };

  const handleSelectDrug = (drug: DrugSearchResult) => {
    // If online, use the synonym/name from API more intelligently
    const finalName = drug.synonym || drug.name;
    onSelectDrug({ ...drug, name: finalName });

    setQuery("");
    setResults([]);
    setShowResults(false);
    setIsFocused(false);
  };

  const handleAddCustom = () => {
    if (query.trim().length >= 2) {
      onSelectDrug({ name: query.trim(), rxcui: "", synonym: "" });
      setQuery("");
      setResults([]);
      setShowResults(false);
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  // Handle click outside
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Spotlight Backdrop */}
      {isFocused && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in" />
      )}

      <div className={cn("relative transition-all duration-300", isFocused ? "z-50 scale-105" : "z-30")} ref={containerRef}>
        <div className="relative">
          <Search className={cn("absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors", isFocused ? "text-primary" : "text-muted-foreground")} />
          <Input
            type="text"
            placeholder="Search NLM Database..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              setShowResults(true);
              setIsFocused(true);
            }}
            className={cn(
              "pl-10 sm:pl-12 pr-10 h-11 sm:h-12 text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 transition-all duration-300",
              isFocused
                ? "border-primary shadow-[0_0_30px_hsl(var(--primary)/0.2)] bg-background"
                : "border-border bg-background/50 focus:border-primary/50"
            )}
          />
          {isLoading && (
            <Loader2 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
          )}
        </div>

        {showResults && (query.length >= 2 || results.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl z-[9999] max-h-[280px] sm:max-h-[320px] overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-1">
                {results.map((drug, index) => (
                  <button
                    key={`${drug.rxcui || drug.name}-${index}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectDrug(drug);
                    }}
                    className={cn(
                      "w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-secondary/50 transition-colors",
                      "flex items-center justify-between group"
                    )}
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-foreground text-sm sm:text-base truncate block">{drug.synonym || drug.name}</span>
                      {drug.rxcui && (
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          RxCUI: {drug.rxcui}
                        </span>
                      )}
                    </div>
                    <Plus className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            ) : query.length >= 2 && !isLoading ? (
              <div className="p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  No exact matches found. Add "{query}" as entered?
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddCustom();
                  }}
                  className="gap-2 text-xs sm:text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add "{query}"
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default DrugSearch;
