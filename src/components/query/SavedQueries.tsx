
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Clock, Tag, Play, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedQuery {
  id: string;
  name: string;
  query: string;
  sql: string;
  dataSource: string;
  tags: string[];
  lastUsed: Date;
  createdAt: Date;
}

export function SavedQueries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { toast } = useToast();

  const mockSavedQueries: SavedQuery[] = [
    {
      id: "1",
      name: "Monthly Revenue Analysis",
      query: "Show total revenue by month for the last year",
      sql: "SELECT MONTH(date) as month, SUM(revenue) FROM sales GROUP BY MONTH(date)",
      dataSource: "PostgreSQL - Main DB",
      tags: ["revenue", "monthly", "sales"],
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      name: "Customer Churn Analysis",
      query: "Find customers who haven't made a purchase in the last 90 days",
      sql: "SELECT customer_id, last_purchase_date FROM customers WHERE last_purchase_date < DATE_SUB(NOW(), INTERVAL 90 DAY)",
      dataSource: "MySQL - Analytics DB",
      tags: ["churn", "customers", "retention"],
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      name: "Top Products by Category",
      query: "Show top 10 products by sales in each category",
      sql: "SELECT category, product_name, SUM(quantity) as total_sales FROM products GROUP BY category, product_name ORDER BY total_sales DESC",
      dataSource: "CSV - Sales Data",
      tags: ["products", "sales", "categories"],
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
  ];

  const allTags = Array.from(new Set(mockSavedQueries.flatMap(q => q.tags)));

  const filteredQueries = mockSavedQueries.filter(query => {
    const matchesSearch = query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.query.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || query.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleRunQuery = (query: SavedQuery) => {
    toast({
      title: "Loading Query",
      description: `Running "${query.name}"...`,
    });
  };

  const handleDeleteQuery = (queryId: string) => {
    toast({
      title: "Query Deleted",
      description: "The saved query has been removed",
    });
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Saved Queries
        </CardTitle>
        <CardDescription>
          Access and reuse your frequently used queries
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === "" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedTag("")}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Saved Queries List */}
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {filteredQueries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No saved queries found</p>
              </div>
            ) : (
              filteredQueries.map((query) => (
                <Card key={query.id} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{query.name}</h4>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRunQuery(query)}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuery(query.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {query.query}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {query.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{query.dataSource}</span>
                      <span>Used {formatRelativeTime(query.lastUsed)}</span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
