import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Upload, Play, CheckCircle, AlertCircle, BarChart3, Plus } from "lucide-react";

const models = [
  {
    id: 1,
    name: "Revenue Anomaly Model",
    status: "trained",
    accuracy: 94,
    lastTrained: "2024-01-10",
    dataPoints: 50000
  },
  {
    id: 2,
    name: "User Behavior Model",
    status: "training",
    progress: 67,
    dataPoints: 25000
  },
  {
    id: 3,
    name: "System Performance Model",
    status: "needs_training",
    dataPoints: 0
  }
];

export function ModelTraining() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">ML Model Training</h3>
          <p className="text-sm text-muted-foreground">Train custom anomaly detection models on your datasets</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          New Model
        </Button>
      </div>

      {/* Upload Dataset */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            <CardTitle>Upload Training Dataset</CardTitle>
          </div>
          <CardDescription>Upload CSV files to train custom anomaly detection models</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Drop your CSV files here</p>
              <p className="text-xs text-muted-foreground">Files should contain timestamp and metric columns</p>
              <Button variant="outline" size="sm">Browse Files</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select metric column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="response_time">Response Time</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select timestamp column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timestamp">Timestamp</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="created_at">Created At</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Brain className="h-4 w-4 mr-1" />
              Start Training
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Models */}
      <div className="space-y-4">
        <h4 className="font-medium">Trained Models</h4>
        {models.map((model) => (
          <Card key={model.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{model.name}</h4>
                    {model.status === 'trained' && (
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Trained
                      </Badge>
                    )}
                    {model.status === 'training' && (
                      <Badge variant="secondary">
                        <Play className="h-3 w-3 mr-1" />
                        Training
                      </Badge>
                    )}
                    {model.status === 'needs_training' && (
                      <Badge variant="outline">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Training
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Data Points: {model.dataPoints.toLocaleString()}</span>
                    {model.accuracy && <span>Accuracy: {model.accuracy}%</span>}
                    {model.lastTrained && <span>Last Trained: {model.lastTrained}</span>}
                  </div>
                  {model.status === 'training' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Training Progress</span>
                        <span>{model.progress}%</span>
                      </div>
                      <Progress value={model.progress} className="w-64" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {model.status === 'trained' && (
                    <>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Performance
                      </Button>
                      <Button size="sm" variant="outline">Retrain</Button>
                    </>
                  )}
                  {model.status === 'needs_training' && (
                    <Button size="sm">
                      <Brain className="h-4 w-4 mr-1" />
                      Train Model
                    </Button>
                  )}
                  {model.status === 'training' && (
                    <Button size="sm" variant="outline">Stop Training</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
