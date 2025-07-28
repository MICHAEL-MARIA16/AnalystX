import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";

interface FileUploadProps {
  onUploadSuccess?: () => void;
}

export function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const processFile = async (file: File) => {
    return new Promise<any[]>((resolve, reject) => {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      
      if (fileType === 'csv') {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error) => {
            reject(error);
          }
        });
      } else if (fileType === 'json') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target?.result as string);
            resolve(Array.isArray(jsonData) ? jsonData : [jsonData]);
          } catch (error) {
            reject(error);
          }
        };
        reader.readAsText(file);
      } else {
        reject(new Error('Unsupported file type'));
      }
    });
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please log in to upload files');
      }

      setUploadProgress(30);

      // Process the file to get data structure
      const data = await processFile(file);
      setUploadProgress(60);

      // Analyze the data structure
      const columnNames = data.length > 0 ? Object.keys(data[0]) : [];
      const rowCount = data.length;
      const fileType = file.name.split('.').pop()?.toLowerCase() || 'unknown';

      setUploadProgress(80);

      // Create dataset record in database
      const { data: dataset, error } = await supabase
        .from('datasets')
        .insert({
          user_id: user.id,
          name: fileName || file.name,
          description: description || null,
          file_type: fileType,
          file_size: file.size,
          row_count: rowCount,
          columns_info: {
            columns: columnNames,
            sample_data: data.slice(0, 3), // Store first 3 rows as sample
            full_data: data // Store all data for analysis
          },
          status: 'ready'
        })
        .select()
        .single();

      if (error) throw error;

      setUploadProgress(100);

      toast({
        title: "File uploaded successfully!",
        description: `${fileName || file.name} has been processed and is ready for analysis.`,
      });

      // Reset form
      setFileName("");
      setDescription("");
      onUploadSuccess?.();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      uploadFile(file);
    }
  }, [fileName, description]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false,
    disabled: isUploading
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Your Data
        </CardTitle>
        <CardDescription>
          Upload CSV, Excel, or JSON files to start generating AI insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileName">Dataset Name (Optional)</Label>
            <Input
              id="fileName"
              placeholder="Enter a name for your dataset"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              disabled={isUploading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Describe your dataset"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : isUploading
              ? "border-muted bg-muted/50 cursor-not-allowed"
              : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
          }`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Uploading and processing...</p>
                <Progress value={uploadProgress} className="w-full mt-2" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded">.CSV</span>
                <span className="bg-muted px-2 py-1 rounded">.JSON</span>
                <span className="bg-muted px-2 py-1 rounded">.XLS</span>
                <span className="bg-muted px-2 py-1 rounded">.XLSX</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> For best results, ensure your data has clear column headers and is well-structured. 
            The AI will automatically analyze your data structure and generate relevant insights.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}