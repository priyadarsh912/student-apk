import { CreditCard, QrCode, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DigitalID() {
    const { user } = useAuth();

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Digital ID Card</h1>
                    <p className="text-muted-foreground">
                        Your student identification
                    </p>
                </div>
            </div>

            {/* ID Card */}
            <Card className="card-elevated overflow-hidden">
                {/* Card Header with Gradient */}
                <div className="h-32 hero-gradient flex items-center justify-between px-6">
                    <div className="text-white">
                        <h2 className="text-2xl font-bold">NEXUS</h2>
                        <p className="text-sm opacity-90">Student ID Card</p>
                    </div>
                    <Avatar className="h-24 w-24 border-4 border-white/20">
                        <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                            {user ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Card Body */}
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-semibold">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Roll Number</p>
                            <p className="font-semibold font-mono">{user?.rollNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Department</p>
                            <p className="font-semibold">{user?.department}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Semester</p>
                            <p className="font-semibold">Semester {user?.semester}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Valid Until: May 2026</span>
                        </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="flex justify-center pt-4">
                        <div className="h-32 w-32 rounded-lg bg-muted/50 flex items-center justify-center border-2 border-dashed border-border">
                            <QrCode className="h-16 w-16 text-muted-foreground" />
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                        Scan QR code for verification
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
