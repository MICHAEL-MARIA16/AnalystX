import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./FileUpload";
import { UploadedDatasets } from "./UploadedDatasets";
import { DemoDataLoader } from "./DemoDataLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Database, Sparkles } from "lucide-react";

export function DataUploadDashboard() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Upload</h1>
          <p className="text-muted-foreground">
            Upload your data files to generate AI-powered insights
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Data
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            My Datasets
          </TabsTrigger>
          <TabsTrigger value="demo" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Demo Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <FileUpload 
            onUploadComplete={(datasetId) => {
              console.log('Dataset uploaded:', datasetId);
              setActiveTab("datasets");
            }} 
          />
        </TabsContent>

        <TabsContent value="datasets" className="space-y-6">
          <UploadedDatasets />
        </TabsContent>

        <TabsContent value="demo" className="space-y-6">
          <DemoDataLoader 
            onDemoLoaded={(datasetId) => {
              console.log('Demo dataset loaded:', datasetId);
              setActiveTab("datasets");
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}