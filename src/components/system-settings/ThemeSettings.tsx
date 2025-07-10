
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Palette, Sun, Moon, Monitor } from "lucide-react";

export function ThemeSettings() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#666666");
  
  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "system", name: "System", icon: Monitor }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Selection
          </CardTitle>
          <CardDescription>
            Choose your preferred color scheme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  selectedTheme === theme.id 
                    ? "border-primary bg-primary/5" 
                    : "border-muted hover:border-muted-foreground/50"
                }`}
              >
                <theme.icon className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">{theme.name}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Color Customization</CardTitle>
            <CardDescription>
              Customize your brand colors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better accessibility</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch />
              </div>
            </div>

            <Button className="w-full">Apply Custom Theme</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>
              Preview your theme customizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                <h3 className="font-semibold mb-2" style={{ color: primaryColor }}>
                  Sample Dashboard
                </h3>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded" style={{ backgroundColor: `${primaryColor}30` }}></div>
                  <div className="h-2 bg-gray-100 rounded w-3/4" style={{ backgroundColor: `${secondaryColor}30` }}></div>
                  <div className="h-2 bg-gray-100 rounded w-1/2" style={{ backgroundColor: `${secondaryColor}20` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 text-center border rounded" style={{ backgroundColor: primaryColor, color: 'white' }}>
                  Primary
                </div>
                <div className="p-3 text-center border rounded" style={{ backgroundColor: secondaryColor, color: 'white' }}>
                  Secondary
                </div>
              </div>

              <div className="text-center">
                <Button size="sm" style={{ backgroundColor: primaryColor }}>
                  Sample Button
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom CSS</CardTitle>
          <CardDescription>
            Add custom CSS for advanced theme customization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="custom-css">Custom CSS Code</Label>
          <textarea
            id="custom-css"
            rows={8}
            className="w-full p-3 border rounded font-mono text-sm"
            placeholder={`/* Add your custom CSS here */
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.primary-button {
  background: linear-gradient(45deg, #000, #333);
}`}
          />
          <div className="flex gap-2">
            <Button>Save CSS</Button>
            <Button variant="outline">Reset to Default</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
