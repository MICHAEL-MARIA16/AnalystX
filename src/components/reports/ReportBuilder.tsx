
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Mail, Share2 } from "lucide-react";

export function ReportBuilder() {
  const [reportName, setReportName] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("pdf");
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);

  const savedQueries = [
    { id: "1", name: "Monthly Revenue Analysis", type: "bar" },
    { id: "2", name: "User Growth Trends", type: "line" },
    { id: "3", name: "Product Performance", type: "pie" },
    { id: "4", name: "Regional Sales", type: "area" }
  ];

  const handleQueryToggle = (queryId: string) => {
    setSelectedQueries(prev => 
      prev.includes(queryId) 
        ? prev.filter(id => id !== queryId)
        : [...prev, queryId]
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Set up your automated report details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              placeholder="Monthly Analytics Report"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Comprehensive monthly analysis of key metrics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Output Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="html">HTML Report</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Include Queries & Charts</CardTitle>
          <CardDescription>
            Select saved queries to include in your report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {savedQueries.map((query) => (
              <div key={query.id} className="flex items-center space-x-2">
                <Checkbox
                  id={query.id}
                  checked={selectedQueries.includes(query.id)}
                  onCheckedChange={() => handleQueryToggle(query.id)}
                />
                <Label htmlFor={query.id} className="flex-1">
                  {query.name}
                </Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {query.type}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Generate Now
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
