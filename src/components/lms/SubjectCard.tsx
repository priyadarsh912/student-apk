import { BookOpen, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Subject } from "@/data/lmsData";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
    subject: Subject;
    onClick: () => void;
}

const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
};

const iconColorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    green: "bg-green-500/10 text-green-500",
    orange: "bg-orange-500/10 text-orange-500",
    red: "bg-red-500/10 text-red-500",
    cyan: "bg-cyan-500/10 text-cyan-500",
};

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
    return (
        <Card
            className="card-elevated hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={onClick}
        >
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div className={cn(
                        "h-14 w-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
                        iconColorClasses[subject.color as keyof typeof iconColorClasses]
                    )}>
                        <BookOpen className="h-7 w-7" />
                    </div>
                    <Badge variant="outline" className={cn(
                        colorClasses[subject.color as keyof typeof colorClasses]
                    )}>
                        Sem {subject.semester}
                    </Badge>
                </div>
                <CardTitle className="text-xl">{subject.name}</CardTitle>
                <CardDescription className="font-mono text-xs">{subject.code}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Layers className="h-4 w-4" />
                        <span>{subject.units} Units</span>
                    </div>
                    <span className="text-accent text-sm group-hover:translate-x-1 transition-transform">
                        View →
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
