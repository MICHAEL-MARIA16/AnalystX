
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BarChart3, LineChart, PieChart, Search, Star, Download, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SavedTemplates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Revenue Trends",
      type: "line",
      description: "Monthly revenue trends with year-over-year comparison",
      tags: ["revenue", "trends", "monthly"],
      favorite: true,
      created: "2024-01-15"
    },
    {
      id: 2,
      name: "Category Performance",
      type: "bar",
      description: "Sales performance by product category",
      tags: ["sales", "category", "performance"],
      favorite: false,
      created: "2024-01-10"
    },
    {
      id: 3,
      name: "Market Share",
      type: "pie",
      description: "Current market share distribution",
      tags: ["market", "share", "distribution"],
      favorite: true,
      created: "2024-01-08"
    },
    {
      id: 4,
      name: "User Engagement",
      type: "line",
      description: "Daily active users and engagement metrics",
      tags: ["users", "engagement", "daily"],
      favorite: false,
      created: "2024-01-05"
    }
  ]);
  const { toast } = useToast();

  const getChartIcon = (type: string) => {
    switch (type) {
      case "bar": return BarChart3;
      case "line": return LineChart;
      case "pie": return PieChart;
      default: return BarChart3;
    }
  };

  const getChartTypeLabel = (type: string) => {
    switch (type) {
      case "bar": return "Bar Chart";
      case "line": return "Line Chart";
      case "pie": return "Pie Chart";
      default: return "Chart";
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleFavorite = (id: number) => {
    setTemplates(templates.map(template =>
      template.id === id ? { ...template, favorite: !template.favorite } : template
    ));
  };

  const duplicateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      created: new Date().toISOString().split('T')[0]
    };
    setTemplates([newTemplate, ...templates]);
    
    toast({
      title: "Template Duplicated",
      description: `Created a copy of "${template.name}"`
    });
  };

  const deleteTemplate = (id: number) => {
    const template = templates.find(t => t.id === id);
    setTemplates(templates.filter(t => t.id !== id));
    
    toast({
      title: "Template Deleted",
      description: `"${template?.name}" has been removed`
    });
  };

  const exportTemplate = (template: any) => {
    toast({
      title: "Template Exported",
      description: `"${template.name}" has been exported as an image`
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-1" />
              Favorites Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const ChartIcon = getChartIcon(template.type);
          
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ChartIcon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(template.id)}
                  >
                    <Star 
                      className={`h-4 w-4 ${template.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{getChartTypeLabel(template.type)}</span>
                  <span>Created {template.created}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Use Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportTemplate(template)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Create your first chart template to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
