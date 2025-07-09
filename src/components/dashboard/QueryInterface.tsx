
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Loader2 } from "lucide-react";

interface QueryInterfaceProps {
  onQuerySubmit: (query: string) => void;
}

const exampleQueries = [
  "What was our monthly revenue in the last quarter?",
  "Show me user growth trends by region",
  "Which products have the highest churn rate?",
  "Compare this month's sales to last month",
  "What are our top performing marketing channels?",
];

export function QueryInterface({ onQuerySubmit }: QueryInterfaceProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      onQuerySubmit(query);
      setQuery("");
      setIsLoading(false);
    }, 2000);
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Ask AnalystX Anything
        </CardTitle>
        <CardDescription>
          Ask natural language questions about your data and get instant insights with visualizations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="e.g., What was our revenue last month compared to the previous month?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px]"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {query.length}/500 characters
            </span>
            <Button 
              onClick={handleSubmit} 
              disabled={!query.trim() || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Quick Examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
