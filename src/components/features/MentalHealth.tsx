import { Heart, Phone, MessageCircle, BookOpen, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Resource {
    id: string;
    title: string;
    description: string;
    contact: string;
    type: 'helpline' | 'counseling' | 'resource';
    icon: any;
}

const resources: Resource[] = [
    { id: '1', title: 'Campus Counseling Center', description: '24/7 professional counseling services', contact: '1800-599-0019', type: 'counseling', icon: MessageCircle },
    { id: '2', title: 'Mental Health Helpline', description: 'Immediate support for mental health emergencies', contact: '9152987821', type: 'helpline', icon: Phone },
    { id: '3', title: 'Peer Support Group', description: 'Connect with fellow students for support', contact: 'peer@nexus.edu', type: 'resource', icon: Heart },
    { id: '4', title: 'Wellness Workshops', description: 'Weekly sessions on stress management and mindfulness', contact: 'wellness@nexus.edu', type: 'resource', icon: Activity },
    { id: '5', title: 'Self-Help Resources', description: 'Articles, videos, and guides for mental wellness', contact: 'library.nexus.edu/wellness', type: 'resource', icon: BookOpen },
];

export function MentalHealth() {
    const handleCall = (contact: string) => {
        window.location.href = `tel:${contact}`;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Mental Health Resources</h1>
                    <p className="text-muted-foreground">
                        Support and wellness resources
                    </p>
                </div>
            </div>

            {/* Important Notice */}
            <Card className="card-elevated border-accent/50 bg-accent/5">
                <CardContent className="p-4">
                    <div className="flex gap-3">
                        <Heart className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold">You're Not Alone</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                If you're experiencing a mental health emergency, please call our 24/7 helpline immediately.
                                Your wellbeing matters, and help is always available.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Resources */}
            <div className="grid gap-4">
                {resources.map(resource => {
                    const Icon = resource.icon;
                    return (
                        <Card key={resource.id} className="card-elevated hover:shadow-lg transition-all">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                                        <CardDescription>{resource.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono">{resource.contact}</span>
                                    {resource.type === 'helpline' && (
                                        <Button
                                            size="sm"
                                            onClick={() => handleCall(resource.contact)}
                                            className="bg-accent hover:bg-accent/90"
                                        >
                                            <Phone className="h-4 w-4 mr-1" />
                                            Call Now
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Self-Assessment */}
            <Card className="card-elevated">
                <CardHeader>
                    <CardTitle>Quick Self-Assessment</CardTitle>
                    <CardDescription>
                        Take a moment to check in with yourself
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm">How are you feeling today?</p>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">Great 😊</Button>
                        <Button variant="outline">Good 🙂</Button>
                        <Button variant="outline">Okay 😐</Button>
                        <Button variant="outline">Not Great 😔</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
