import { Settings as SettingsIcon, Type, Palette, Bell, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Settings() {
    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <SettingsIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">
                        Customize your experience
                    </p>
                </div>
            </div>

            {/* Accessibility */}
            <Card className="card-elevated">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Type className="h-5 w-5" />
                        Accessibility
                    </CardTitle>
                    <CardDescription>
                        Adjust settings for better readability
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Text Size</Label>
                        <Select defaultValue="medium">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                                <SelectItem value="x-large">Extra Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>High Contrast Mode</Label>
                            <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Dyslexia-Friendly Font</Label>
                            <p className="text-sm text-muted-foreground">Use OpenDyslexic font</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="card-elevated">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Appearance
                    </CardTitle>
                    <CardDescription>
                        Customize the look and feel
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select defaultValue="system">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Reduce Animations</Label>
                            <p className="text-sm text-muted-foreground">Minimize motion effects</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="card-elevated">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                    </CardTitle>
                    <CardDescription>
                        Manage notification preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive real-time updates</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get updates via email</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Assignment Reminders</Label>
                            <p className="text-sm text-muted-foreground">Remind me about deadlines</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Language */}
            <Card className="card-elevated">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Language & Region
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="en">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                                <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <Button className="w-full bg-accent hover:bg-accent/90">
                Save Preferences
            </Button>
        </div>
    );
}
