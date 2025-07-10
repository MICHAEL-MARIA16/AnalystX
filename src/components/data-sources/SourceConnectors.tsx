
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, FileSpreadsheet, Upload, Play, CheckCircle } from "lucide-react";

const connectors = [
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Connect to PostgreSQL databases",
    icon: Database,
    category: "Database",
    status: "available",
    popular: true
  },
  {
    id: "mysql",
    name: "MySQL",
    description: "Connect to MySQL databases",
    icon: Database,
    category: "Database",
    status: "available",
    popular: true
  },
  {
    id: "bigquery",
    name: "Google BigQuery",
    description: "Connect to Google BigQuery data warehouse",
    icon: Database,
    category: "Cloud Database",
    status: "available",
    popular: true
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "Connect to MongoDB NoSQL databases",
    icon: Database,
    category: "NoSQL",
    status: "available"
  },
  {
    id: "sheets",
    name: "Google Sheets",
    description: "Import data from Google Sheets",
    icon: FileSpreadsheet,
    category: "Spreadsheet",
    status: "available",
    popular: true
  },
  {
    id: "csv",
    name: "CSV Upload",
    description: "Upload CSV files directly",
    icon: Upload,
    category: "File",
    status: "available"
  }
];

export function SourceConnectors() {
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Available Data Connectors</h3>
        <p className="text-sm text-muted-foreground">Choose from various data sources to connect your analytics platform</p>
      </div>

      {/* Connector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectors.map((connector) => {
          const IconComponent = connector.icon;
          return (
            <Card 
              key={connector.id} 
              className={`cursor-pointer transition-colors hover:bg-accent ${
                selectedConnector === connector.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedConnector(connector.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-base">{connector.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {connector.category}
                      </Badge>
                    </div>
                  </div>
                  {connector.popular && (
                    <Badge variant="secondary" className="text-xs">Popular</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-3">{connector.description}</CardDescription>
                <Button size="sm" className="w-full">
                  <Play className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Connection Form */}
      {selectedConnector && (
        <Card>
          <CardHeader>
            <CardTitle>Configure {connectors.find(c => c.id === selectedConnector)?.name} Connection</CardTitle>
            <CardDescription>Enter your connection details to establish a secure connection</CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectorForm connectorId={selectedConnector} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ConnectorForm({ connectorId }: { connectorId: string }) {
  if (connectorId === 'postgresql' || connectorId === 'mysql') {
    return <DatabaseForm type={connectorId} />;
  }
  if (connectorId === 'bigquery') {
    return <BigQueryForm />;
  }
  if (connectorId === 'mongodb') {
    return <MongoDBForm />;
  }
  if (connectorId === 'sheets') {
    return <SheetsForm />;
  }
  if (connectorId === 'csv') {
    return <CSVUploadForm />;
  }
  return null;
}

function DatabaseForm({ type }: { type: string }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Host</label>
          <input className="w-full px-3 py-2 border rounded-md" placeholder="localhost" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Port</label>
          <input className="w-full px-3 py-2 border rounded-md" placeholder={type === 'postgresql' ? '5432' : '3306'} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Database</label>
          <input className="w-full px-3 py-2 border rounded-md" placeholder="my_database" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <input className="w-full px-3 py-2 border rounded-md" placeholder="username" />
        </div>
        <div className="space-y-2 col-span-2">
          <label className="text-sm font-medium">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded-md" placeholder="••••••••" />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <Button variant="outline">Test Connection</Button>
        <Button>Save Connection</Button>
      </div>
    </div>
  );
}

function BigQueryForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Project ID</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="my-gcp-project" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Service Account JSON</label>
        <textarea className="w-full px-3 py-2 border rounded-md h-32" placeholder="Paste your service account JSON here..." />
      </div>
      <div className="flex gap-2 pt-4">
        <Button variant="outline">Test Connection</Button>
        <Button>Save Connection</Button>
      </div>
    </div>
  );
}

function MongoDBForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Connection String</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="mongodb://username:password@host:port/database" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Database Name</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="my_database" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button variant="outline">Test Connection</Button>
        <Button>Save Connection</Button>
      </div>
    </div>
  );
}

function SheetsForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Google Sheets URL</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="https://docs.google.com/spreadsheets/d/..." />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Sheet Name</label>
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Sheet1" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button variant="outline">Authorize Google</Button>
        <Button>Save Connection</Button>
      </div>
    </div>
  );
}

function CSVUploadForm() {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-sm font-medium">Drop your CSV files here</p>
          <p className="text-xs text-muted-foreground">Maximum file size: 100MB</p>
          <Button variant="outline" size="sm">Browse Files</Button>
        </div>
      </div>
    </div>
  );
}
