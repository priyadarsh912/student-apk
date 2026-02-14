import { Shirt, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Machine {
    id: string;
    floor: string;
    number: number;
    status: 'available' | 'in-use' | 'out-of-order';
    timeRemaining?: number;
}

const mockMachines: Machine[] = [
    { id: '1', floor: 'Ground Floor', number: 1, status: 'available' },
    { id: '2', floor: 'Ground Floor', number: 2, status: 'in-use', timeRemaining: 25 },
    { id: '3', floor: 'Ground Floor', number: 3, status: 'in-use', timeRemaining: 45 },
    { id: '4', floor: 'First Floor', number: 4, status: 'available' },
    { id: '5', floor: 'First Floor', number: 5, status: 'out-of-order' },
    { id: '6', floor: 'First Floor', number: 6, status: 'available' },
];

export function LaundryTracker() {
    const { toast } = useToast();

    const availableCount = mockMachines.filter(m => m.status === 'available').length;

    const handleBook = (machine: Machine) => {
        if (machine.status === 'available') {
            toast({
                title: "Machine Booked",
                description: `Machine #${machine.number} on ${machine.floor} is now reserved for you.`,
            });
        }
    };

    const getStatusBadge = (machine: Machine) => {
        switch (machine.status) {
            case 'available':
                return (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Available
                    </Badge>
                );
            case 'in-use':
                return (
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        <Clock className="h-3 w-3 mr-1" />
                        In Use ({machine.timeRemaining}min)
                    </Badge>
                );
            case 'out-of-order':
                return (
                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                        <XCircle className="h-3 w-3 mr-1" />
                        Out of Order
                    </Badge>
                );
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shirt className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Laundry Tracker</h1>
                    <p className="text-muted-foreground">
                        Check washing machine availability
                    </p>
                </div>
            </div>

            {/* Summary */}
            <Card className="card-elevated">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Available Machines</p>
                            <p className="text-2xl font-bold text-green-500">{availableCount} / {mockMachines.length}</p>
                        </div>
                        <Shirt className="h-12 w-12 text-accent/20" />
                    </div>
                </CardContent>
            </Card>

            {/* Machine List */}
            <div className="space-y-3">
                <h3 className="font-semibold">All Machines</h3>
                {mockMachines.map(machine => (
                    <Card key={machine.id} className="card-elevated">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <Shirt className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Machine #{machine.number}</h4>
                                        <p className="text-sm text-muted-foreground">{machine.floor}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusBadge(machine)}
                                    {machine.status === 'available' && (
                                        <Button
                                            size="sm"
                                            onClick={() => handleBook(machine)}
                                            className="bg-accent hover:bg-accent/90"
                                        >
                                            Book
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
