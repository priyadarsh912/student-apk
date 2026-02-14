import { DollarSign, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

interface FeeItem {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    paidDate?: string;
}

const mockFees: FeeItem[] = [
    { id: '1', name: 'Tuition Fee - Semester 2', amount: 75000, dueDate: '2024-01-15', status: 'paid', paidDate: '2024-01-10' },
    { id: '2', name: 'Hostel Fee - Semester 2', amount: 25000, dueDate: '2024-01-15', status: 'paid', paidDate: '2024-01-12' },
    { id: '3', name: 'Library Fee', amount: 2000, dueDate: '2024-01-20', status: 'paid', paidDate: '2024-01-18' },
    { id: '4', name: 'Sports Fee', amount: 3000, dueDate: '2024-02-01', status: 'pending' },
    { id: '5', name: 'Lab Fee', amount: 5000, dueDate: '2024-02-10', status: 'pending' },
];

export function FeeTracker() {
    const { user } = useAuth();

    const totalFees = mockFees.reduce((sum, fee) => sum + fee.amount, 0);
    const paidFees = mockFees.filter(f => f.status === 'paid').reduce((sum, fee) => sum + fee.amount, 0);
    const pendingFees = totalFees - paidFees;
    const paymentProgress = (paidFees / totalFees) * 100;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle2 className="h-3 w-3 mr-1" />Paid</Badge>;
            case 'pending':
                return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
            case 'overdue':
                return <Badge className="bg-red-500/10 text-red-500 border-red-500/20"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Fee Tracker</h1>
                    <p className="text-muted-foreground">
                        Monitor your fee payments
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="card-elevated">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Fees</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="card-elevated">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">₹{paidFees.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="card-elevated">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-500">₹{pendingFees.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Progress */}
            <Card className="card-elevated">
                <CardHeader>
                    <CardTitle>Payment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Progress value={paymentProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground">{paymentProgress.toFixed(1)}% completed</p>
                    </div>
                </CardContent>
            </Card>

            {/* Fee List */}
            <div className="space-y-3">
                <h3 className="font-semibold">Fee Details</h3>
                {mockFees.map(fee => (
                    <Card key={fee.id} className="card-elevated">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-semibold">{fee.name}</h4>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        <span>Amount: ₹{fee.amount.toLocaleString()}</span>
                                        <span>Due: {new Date(fee.dueDate).toLocaleDateString()}</span>
                                        {fee.paidDate && <span>Paid: {new Date(fee.paidDate).toLocaleDateString()}</span>}
                                    </div>
                                </div>
                                {getStatusBadge(fee.status)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
