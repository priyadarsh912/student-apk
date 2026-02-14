import { Phone, Stethoscope, AlertTriangle, Shield, Heart, Ambulance } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const emergencyContacts = [
  { name: "Campus Medical Center", number: "1800-123-4567", type: "medical", icon: Stethoscope, available: "24/7" },
  { name: "Campus Security", number: "1800-456-7890", type: "security", icon: Shield, available: "24/7" },
  { name: "Ambulance", number: "102", type: "emergency", icon: Ambulance, available: "24/7" },
  { name: "Women Helpline", number: "1091", type: "helpline", icon: Heart, available: "24/7" },
];

const quickTips = [
  "Stay calm and assess the situation",
  "Call emergency services immediately if life-threatening",
  "Provide your exact location when calling",
  "Don't move an injured person unless necessary",
  "Stay with the person until help arrives",
];

export function EmergencyPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-destructive/10 border-2 border-destructive/30 p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center emergency-pulse">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-destructive">Medical Emergency</h1>
            <p className="text-muted-foreground">
              If this is a life-threatening emergency, call 102 immediately
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact) => (
          <Card key={contact.name} className="card-elevated border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <contact.icon className="h-7 w-7 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-2xl font-bold text-destructive">{contact.number}</p>
                  <p className="text-xs text-muted-foreground">Available {contact.available}</p>
                </div>
                <a href={`tel:${contact.number}`}>
                  <Button variant="destructive" size="lg" className="gap-2">
                    <Phone className="h-5 w-5" />
                    Call
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Emergency Guidelines</CardTitle>
          <CardDescription>What to do in an emergency situation</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {quickTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </span>
                <p>{tip}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Campus Medical Info */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Campus Medical Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Health Center</h4>
              <p className="text-sm text-muted-foreground">Block A, Ground Floor</p>
              <p className="text-sm text-muted-foreground">Hours: 8 AM - 10 PM</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">24/7 Emergency</h4>
              <p className="text-sm text-muted-foreground">Main Gate Security Office</p>
              <p className="text-sm text-muted-foreground">First-aid available always</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
