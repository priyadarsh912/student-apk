import { Phone, Stethoscope, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emergencyContacts = [
  { name: "Campus Medical Center", number: "1800-123-4567", type: "medical" },
  { name: "Campus Security", number: "1800-456-7890", type: "security" },
  { name: "Ambulance", number: "102", type: "emergency" },
  { name: "Police", number: "100", type: "emergency" },
];

export function EmergencySOS() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating SOS Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-destructive text-destructive-foreground shadow-lg emergency-pulse flex items-center justify-center transition-transform hover:scale-110 focus-ring"
        aria-label="Emergency SOS"
      >
        <Stethoscope className="h-6 w-6" />
      </button>

      {/* Emergency Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-destructive/50">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <DialogTitle className="text-xl">Medical Emergency</DialogTitle>
                <DialogDescription>
                  Get immediate help from campus medical services
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.name}
                href={`tel:${contact.number}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-destructive/50 hover:bg-destructive/5 transition-all group interactive-card"
              >
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <Phone className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.number}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Call Now
                </Button>
              </a>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Stay calm.</strong> Help is available 24/7. If this is a life-threatening emergency, please call 102 immediately.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
