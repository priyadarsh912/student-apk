import { BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Unit } from "@/data/lmsData";

interface UnitCardProps {
    unit: Unit;
    onClick: () => void;
}

export function UnitCard({ unit, onClick }: UnitCardProps) {
    return (
        <Card
            className="card-elevated hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <BookOpen className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Unit {unit.unitNumber}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{unit.name}</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {unit.filesCount} files
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Click to view materials</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </CardContent>
        </Card>
    );
}
