
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";
import { QueryResult } from "./Dashboard";

interface RecentQueriesProps {
  queries: QueryResult[];
  onSelectQuery: (query: QueryResult) => void;
}

export function RecentQueries({ queries, onSelectQuery }: RecentQueriesProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Queries
        </CardTitle>
        <CardDescription>
          Your recent analysis queries and results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {queries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No queries yet. Ask AnalystX a question to get started!
            </p>
          ) : (
            queries.slice(0, 5).map((query) => (
              <div key={query.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{query.query}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(query.timestamp)}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 flex-shrink-0"
                  onClick={() => onSelectQuery(query)}
                >
                  <Play className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
