
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThresholdManager } from "./ThresholdManager";
import { AnomalyTimeline } from "./AnomalyTimeline";
import { NotificationSettings } from "./NotificationSettings";
import { ModelTraining } from "./ModelTraining";

export function AnomalyDashboard() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Anomaly Timeline</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds & Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="training">Model Training</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <AnomalyTimeline />
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <ThresholdManager />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <ModelTraining />
        </TabsContent>
      </Tabs>
    </div>
  );
}
