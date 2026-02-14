import { Download, FileText, Presentation, FileIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LMSFile } from "@/data/lmsData";
import { useToast } from "@/hooks/use-toast";

interface FileCardProps {
    file: LMSFile;
}

export function FileCard({ file }: FileCardProps) {
    const { toast } = useToast();

    const getFileIcon = () => {
        switch (file.type) {
            case 'pdf':
                return <FileText className="h-8 w-8 text-red-500" />;
            case 'ppt':
                return <Presentation className="h-8 w-8 text-orange-500" />;
            case 'notes':
                return <FileIcon className="h-8 w-8 text-blue-500" />;
            default:
                return <FileIcon className="h-8 w-8" />;
        }
    };

    const getFileTypeBadge = () => {
        const colors = {
            pdf: 'bg-red-500/10 text-red-500 border-red-500/20',
            ppt: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            notes: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        };
        return colors[file.type];
    };

    const handleDownload = () => {
        toast({
            title: "Download Started",
            description: `Downloading ${file.name}...`,
        });
        // In a real app, this would trigger actual download
        // window.open(file.url, '_blank');
    };

    return (
        <Card className="card-elevated hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    {/* File Icon */}
                    <div className="h-14 w-14 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {getFileIcon()}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1 truncate">{file.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getFileTypeBadge()}>
                                {file.type.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">by {file.uploadedBy}</span>
                        </div>
                    </div>

                    {/* Download Button */}
                    <Button
                        size="sm"
                        onClick={handleDownload}
                        className="bg-accent hover:bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
