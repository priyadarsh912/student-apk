import { useState } from "react";
import { Users, Search, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Student {
    id: string;
    name: string;
    rollNumber: string;
    department: string;
    semester: number;
    email: string;
    phone: string;
    hostel: string;
}

const mockStudents: Student[] = [
    { id: '1', name: 'Rahul Sharma', rollNumber: 'CS21B001', department: 'Computer Science', semester: 2, email: 'rahul@nexus.edu', phone: '+91 98765 43210', hostel: 'Block A-201' },
    { id: '2', name: 'Priya Patel', rollNumber: 'CS21B042', department: 'Computer Science', semester: 2, email: 'priya@nexus.edu', phone: '+91 98765 43211', hostel: 'Block B-105' },
    { id: '3', name: 'Amit Kumar', rollNumber: 'EC21B015', department: 'Electronics', semester: 2, email: 'amit@nexus.edu', phone: '+91 98765 43212', hostel: 'Block A-305' },
    { id: '4', name: 'Sneha Reddy', rollNumber: 'ME21B028', department: 'Mechanical', semester: 2, email: 'sneha@nexus.edu', phone: '+91 98765 43213', hostel: 'Block C-110' },
    { id: '5', name: 'Vikram Singh', rollNumber: 'CS21B055', department: 'Computer Science', semester: 2, email: 'vikram@nexus.edu', phone: '+91 98765 43214', hostel: 'Block A-410' },
    { id: '6', name: 'Ananya Iyer', rollNumber: 'EC21B033', department: 'Electronics', semester: 2, email: 'ananya@nexus.edu', phone: '+91 98765 43215', hostel: 'Block B-208' },
];

export function StudentDirectory() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState<string | null>(null);

    const departments = Array.from(new Set(mockStudents.map(s => s.department)));

    const filteredStudents = mockStudents.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = !selectedDept || student.department === selectedDept;
        return matchesSearch && matchesDept;
    });

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Student Directory</h1>
                    <p className="text-muted-foreground">
                        Connect with your peers
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or roll number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Badge
                        variant={selectedDept === null ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedDept(null)}
                    >
                        All
                    </Badge>
                    {departments.map(dept => (
                        <Badge
                            key={dept}
                            variant={selectedDept === dept ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setSelectedDept(dept)}
                        >
                            {dept}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Student List */}
            <div className="grid gap-4">
                {filteredStudents.map(student => (
                    <Card key={student.id} className="card-elevated hover:shadow-lg transition-all">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-14 w-14">
                                    <AvatarFallback className="bg-accent/10 text-accent font-semibold text-lg">
                                        {getInitials(student.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg">{student.name}</h3>
                                    <p className="text-sm text-muted-foreground font-mono">{student.rollNumber}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <GraduationCap className="h-4 w-4" />
                                            <span>{student.department} - Sem {student.semester}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <span>{student.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{student.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>{student.hostel}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
