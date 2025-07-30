import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Download, Trash2, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface LoadedDataset {
  id: string;
  name: string;
  description: string;
  data: any[];
  columns: string[];
  type: string;
  loadedAt: string;
}

export function DataViewer() {
  const [loadedDatasets, setLoadedDatasets] = useState<LoadedDataset[]>([]);
  const { toast } = useToast();

  const loadDatasets = () => {
    const data = JSON.parse(localStorage.getItem('demoDatasets') || '[]');
    setLoadedDatasets(data);
  };

  useEffect(() => {
    loadDatasets();
  }, []);

  const deleteDataset = (id: string) => {
    const updatedData = loadedDatasets.filter(d => d.id !== id);
    localStorage.setItem('demoDatasets', JSON.stringify(updatedData));
    setLoadedDatasets(updatedData);
    toast({
      title: "Dataset removed",
      description: "Dataset has been deleted from local storage.",
    });
  };

  const downloadAsCSV = (dataset: LoadedDataset) => {
    const headers = dataset.columns.join(',');
    const rows = dataset.data.map(row => 
      dataset.columns.map(col => JSON.stringify(row[col] || '')).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `${dataset.name} is being downloaded as CSV.`,
    });
  };

  if (loadedDatasets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loaded Demo Data</CardTitle>
          <CardDescription>
            No demo data loaded yet. Load some demo datasets to view and analyze them here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={loadDatasets} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Loaded Demo Data</CardTitle>
              <CardDescription>
                View and manage your loaded demo datasets ({loadedDatasets.length} datasets)
              </CardDescription>
            </div>
            <Button onClick={loadDatasets} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {loadedDatasets.map((dataset) => (
          <Card key={dataset.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                  <CardDescription>{dataset.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{dataset.type}</Badge>
                    <Badge variant="outline">{dataset.data.length} rows</Badge>
                    <Badge variant="outline">{dataset.columns.length} columns</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{dataset.name}</DialogTitle>
                        <DialogDescription>
                          {dataset.description} • {dataset.data.length} rows • {dataset.columns.length} columns
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh] w-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {dataset.columns.map((column) => (
                                <TableHead key={column} className="font-medium">
                                  {column}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dataset.data.slice(0, 100).map((row, index) => (
                              <TableRow key={index}>
                                {dataset.columns.map((column) => (
                                  <TableCell key={column} className="max-w-[200px] truncate">
                                    {typeof row[column] === 'object' 
                                      ? JSON.stringify(row[column])
                                      : String(row[column] || '')
                                    }
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {dataset.data.length > 100 && (
                          <div className="text-center py-4 text-sm text-muted-foreground">
                            Showing first 100 rows of {dataset.data.length} total rows
                          </div>
                        )}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadAsCSV(dataset)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteDataset(dataset.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Columns:</p>
                <div className="flex flex-wrap gap-1">
                  {dataset.columns.map((column) => (
                    <Badge key={column} variant="outline" className="text-xs">
                      {column}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Loaded: {new Date(dataset.loadedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}