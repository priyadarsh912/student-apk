import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            const success = login(email, password);

            if (success) {
                toast({
                    title: "Login Successful",
                    description: "Welcome to NEXUS!",
                });
            } else {
                toast({
                    title: "Login Failed",
                    description: "Invalid email or password",
                    variant: "destructive",
                });
            }

            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <img src="/nexus_logo.svg" alt="NEXUS" className="h-16 w-16" />
                        <h1 className="text-4xl font-bold text-gradient">NEXUS</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Your All-in-One Student Platform
                    </p>
                </div>

                {/* Login Card */}
                <Card className="card-elevated">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <LogIn className="h-6 w-6 text-accent" />
                            Student Login
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to access your dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="student@nexus.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                            <p className="text-sm font-semibold mb-2">Demo Credentials:</p>
                            <div className="space-y-1 text-xs text-muted-foreground">
                                <p><strong>Email:</strong> student@nexus.edu</p>
                                <p><strong>Password:</strong> student123</p>
                                <p className="mt-2"><strong>Or:</strong></p>
                                <p><strong>Email:</strong> demo@nexus.edu</p>
                                <p><strong>Password:</strong> demo123</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    © 2024 NEXUS. All rights reserved.
                </p>
            </div>
        </div>
    );
}
