
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SourceConnectors } from "./SourceConnectors";
import { ConnectionManager } from "./ConnectionManager";
import { SyncScheduler } from "./SyncScheduler";
import { SecuritySettings } from "./SecuritySettings";

export function DataSourcesDashboard() {
  const [activeTab, setActiveTab] = useState("connectors");

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connectors">Data Connectors</TabsTrigger>
          <TabsTrigger value="connections">Manage Connections</TabsTrigger>
          <TabsTrigger value="scheduling">Sync Scheduling</TabsTrigger>
          <TabsTrigger value="security">Security & Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="connectors" className="space-y-6">
          <SourceConnectors />
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <ConnectionManager />
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <SyncScheduler />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
