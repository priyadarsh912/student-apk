import { Users2, Calendar, MapPin, Mail, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Club {
    id: string;
    name: string;
    category: string;
    description: string;
    members: number;
    coordinator: string;
    email: string;
    meetingDay: string;
    location: string;
}

const mockClubs: Club[] = [
    { id: '1', name: 'Coding Club', category: 'Technical', description: 'Learn programming, participate in hackathons, and build projects', members: 145, coordinator: 'Dr. Sharma', email: 'coding@nexus.edu', meetingDay: 'Friday 5 PM', location: 'CS Lab 1' },
    { id: '2', name: 'Robotics Club', category: 'Technical', description: 'Design and build robots for competitions', members: 89, coordinator: 'Prof. Kumar', email: 'robotics@nexus.edu', meetingDay: 'Saturday 3 PM', location: 'Workshop A' },
    { id: '3', name: 'Drama Club', category: 'Cultural', description: 'Theater performances and acting workshops', members: 67, coordinator: 'Ms. Patel', email: 'drama@nexus.edu', meetingDay: 'Thursday 6 PM', location: 'Auditorium' },
    { id: '4', name: 'Music Club', category: 'Cultural', description: 'Instrumental and vocal music sessions', members: 92, coordinator: 'Mr. Singh', email: 'music@nexus.edu', meetingDay: 'Wednesday 5 PM', location: 'Music Room' },
    { id: '5', name: 'Photography Club', category: 'Creative', description: 'Learn photography and organize photo walks', members: 78, coordinator: 'Ms. Reddy', email: 'photo@nexus.edu', meetingDay: 'Sunday 10 AM', location: 'Media Lab' },
    { id: '6', name: 'Sports Club', category: 'Sports', description: 'Organize sports events and tournaments', members: 156, coordinator: 'Coach Verma', email: 'sports@nexus.edu', meetingDay: 'Daily', location: 'Sports Complex' },
];

const categoryColors: Record<string, string> = {
    'Technical': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Cultural': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Creative': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'Sports': 'bg-green-500/10 text-green-500 border-green-500/20',
};

export function ClubDirectory() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Users2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Club Directory</h1>
                    <p className="text-muted-foreground">
                        Discover and join campus clubs
                    </p>
                </div>
            </div>

            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockClubs.map(club => (
                    <Card key={club.id} className="card-elevated hover:shadow-lg transition-all">
                        <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                                <CardTitle className="text-xl">{club.name}</CardTitle>
                                <Badge variant="outline" className={categoryColors[club.category]}>
                                    {club.category}
                                </Badge>
                            </div>
                            <CardDescription>{club.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Users2 className="h-4 w-4" />
                                    <span>{club.members} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{club.meetingDay}</span>
                                </div>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{club.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{club.coordinator}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{club.email}</span>
                                </div>
                            </div>
                            <Button className="w-full bg-accent hover:bg-accent/90">
                                Join Club
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
