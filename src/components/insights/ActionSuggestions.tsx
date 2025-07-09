
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Target, Zap, Clock, CheckCircle } from "lucide-react";

const actionSuggestions = [
  {
    id: 1,
    title: "Launch Retargeting Campaign",
    description: "Target users who abandoned cart in the last 7 days with 15% discount",
    impact: "High",
    effort: "Low",
    expectedOutcome: "+$25,000 revenue recovery",
    confidence: 89,
    category: "Marketing",
    urgency: "immediate",
    icon: Target
  },
  {
    id: 2,
    title: "Optimize Mobile Checkout",
    description: "Reduce checkout steps from 4 to 2 based on mobile traffic spike",
    impact: "High",
    effort: "Medium",
    expectedOutcome: "+12% mobile conversion",
    confidence: 92,
    category: "Product",
    urgency: "this-week",
    icon: Zap
  },
  {
    id: 3,
    title: "Segment High-Value Customers",
    description: "Create VIP program for customers with >$500 LTV",
    impact: "Medium",
    effort: "Medium",
    expectedOutcome: "+18% retention rate",
    confidence: 85,
    category: "Customer Success",
    urgency: "this-month",
    icon: CheckCircle
  },
  {
    id: 4,
    title: "Weekend Marketing Push",
    description: "Increase Saturday ad spend by 40% based on performance data",
    impact: "Medium",
    effort: "Low",
    expectedOutcome: "+$15,000 weekend sales",
    confidence: 87,
    category: "Marketing",
    urgency: "immediate",
    icon: Clock
  }
];

const urgencyColors = {
  immediate: "bg-red-50 border-red-200",
  "this-week": "bg-yellow-50 border-yellow-200",
  "this-month": "bg-blue-50 border-blue-200"
};

const impactColors = {
  High: "text-green-700 bg-green-50",
  Medium: "text-yellow-700 bg-yellow-50",
  Low: "text-gray-700 bg-gray-50"
};

export function ActionSuggestions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI-Suggested Actions</h3>
          <p className="text-sm text-muted-foreground">Personalized recommendations to improve your business performance</p>
        </div>
        <Button variant="outline">
          <Lightbulb className="h-4 w-4 mr-1" />
          Get More Suggestions
        </Button>
      </div>

      <div className="grid gap-4">
        {actionSuggestions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card key={action.id} className={`border-l-4 ${urgencyColors[action.urgency as keyof typeof urgencyColors]}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-base">{action.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={impactColors[action.impact as keyof typeof impactColors]}>
                      {action.impact} Impact
                    </Badge>
                    <Badge variant="outline">{action.confidence}% confidence</Badge>
                  </div>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Expected Outcome:</span>
                    <p className="font-medium">{action.expectedOutcome}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Effort Required:</span>
                    <p className="font-medium">{action.effort}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{action.category}</Badge>
                    <Badge variant={action.urgency === "immediate" ? "destructive" : "secondary"}>
                      {action.urgency.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Snooze</Button>
                    <Button size="sm">Take Action</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
