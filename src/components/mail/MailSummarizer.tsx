import { useState, useEffect } from "react";
import { Mail, Sparkles, Clock, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  loadGoogleScripts,
  initializeGapiClient,
  getAccessToken,
  listMessages,
  getMessage,
  GmailConfig
} from "@/lib/gmail";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface EmailSummary {
  summary: string;
  category: string;
  priority: "high" | "medium" | "low";
  deadline: string | null;
  actionItems: string[];
  isUrgent: boolean;
  originalContent?: string;
}

const emailTypes = [
  { value: "academic", label: "Academic" },
  { value: "administrative", label: "Administrative" },
  { value: "event", label: "Events & Activities" },
  { value: "financial", label: "Financial" },
  { value: "hostel", label: "Hostel" },
  { value: "placement", label: "Placement" },
  { value: "general", label: "General" },
];

const mockSummaries: EmailSummary[] = [
  {
    summary: "Mid-term exams scheduled for Feb 15-22, complete registration by Feb 10",
    category: "Academic",
    priority: "high",
    deadline: "2025-02-10",
    actionItems: ["Complete exam registration", "Check exam schedule", "Prepare admit card"],
    isUrgent: true,
    originalContent: "Dear Students, This is to inform you that the mid-term examinations for the current semester will be conducted from February 15th to February 22nd, 2025..."
  },
  {
    summary: "Annual tech fest 'TechnoVerse' registrations open, early bird discount ends Feb 5",
    category: "Event",
    priority: "medium",
    deadline: "2025-02-05",
    actionItems: ["Register for events", "Form team for hackathon"],
    isUrgent: false,
    originalContent: "Greetings! We are excited to announce TechnoVerse 2025, our annual technical festival..."
  },
  {
    summary: "Mess fee for Feb due by Feb 3, late payment penalty applies",
    category: "Financial",
    priority: "high",
    deadline: "2025-02-03",
    actionItems: ["Pay mess fee online", "Keep receipt for records"],
    isUrgent: true,
    originalContent: "Dear Hostel Residents, This is a reminder that the mess fee for the month of February 2025 is due..."
  },
];

export function MailSummarizer() {
  const [emailContent, setEmailContent] = useState("");
  const [emailType, setEmailType] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [summaries, setSummaries] = useState<EmailSummary[]>(mockSummaries);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Gmail Integration State
  const [isGmailMode, setIsGmailMode] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  // Hardcoded configuration per user request
  const gmailConfig: GmailConfig = {
    clientId: "522243014697-n23lsdp844ra5o45jg2n96vkuimu9ddh.apps.googleusercontent.com",
    apiKey: "AIzaSyCphUwHqdJWBv5DhxN9vZo-wEi59A_ttEU",
  };
  const [isConfigured, setIsConfigured] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { toast } = useToast();

  // Auto-initialize GAPI 
  useEffect(() => {
    const initGapi = async () => {
      try {
        await loadGoogleScripts();
        // Check if we have valid config
        if (gmailConfig.clientId && gmailConfig.apiKey) {
          await initializeGapiClient(gmailConfig);
          setIsConfigured(true);
        }
      } catch (e: any) {
        console.error("GAPI Init Error:", e);
        const errorMsg = e?.result?.error?.message || e?.message || JSON.stringify(e) || "Failed to initialize API";
        toast({
          title: "API Error",
          description: errorMsg,
          variant: "destructive",
        });
      }
    };
    initGapi();
  }, [gmailConfig.clientId, gmailConfig.apiKey]);

  // Removed manual config saving as it's now hardcoded

  const handleConnectGmail = async () => {
    if (!userEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your Gmail address to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      await getAccessToken(gmailConfig);
      setIsAuthenticated(true);
      toast({
        title: "Connected to Gmail",
        description: `Accessing inbox for ${userEmail}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to authenticate with Google",
        variant: "destructive",
      });
    }
  };

  const handleFetchEmails = async () => {
    setIsLoading(true);
    try {
      // Ensure GAPI is loaded before fetching (Self-healing)
      if (!window.gapi?.client?.gmail) {
        console.log("GAPI not ready, attempting lazy init...");
        await loadGoogleScripts();
        await initializeGapiClient(gmailConfig);
        setIsConfigured(true);
      }

      const messages = await listMessages(5);
      if (messages.length === 0) {
        toast({ title: "No emails found", description: "Your inbox appears empty" });
        return;
      }

      const newSummaries: EmailSummary[] = [];

      for (const msg of messages) {
        const fullMsg = await getMessage(msg.id);
        const snippet = fullMsg.snippet; // Use snippet for summary

        // Call summarization API for each email
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: JSON.stringify({
                emailContent: snippet,
                emailType: "general", // Auto-detect later?
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            newSummaries.push({
              ...data,
              originalContent: snippet,
            });
          }
        } catch (e) {
          console.error("Failed to summarize email", msg.id);
        }
      }

      setSummaries(prev => [...newSummaries, ...prev]);
      toast({
        title: "Emails Processed",
        description: `Successfully summarized ${newSummaries.length} recent emails`,
      });

    } catch (error: any) {
      console.error("Fetch Error:", error);
      const errorMessage = error?.result?.error?.message || error?.message || "Could not retrieve emails from Gmail";
      toast({
        title: "Fetch Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!emailContent.trim()) {
      toast({
        title: "Please enter email content",
        description: "Paste the email you want to summarize",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            emailContent,
            emailType,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to summarize email");
      }

      const data = await response.json();

      const newSummary: EmailSummary = {
        ...data,
        originalContent: emailContent,
      };

      setSummaries([newSummary, ...summaries]);
      setEmailContent("");

      toast({
        title: "Email summarized!",
        description: "AI has analyzed your email successfully",
      });
    } catch (error) {
      toast({
        title: "Summarization failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "badge-urgent";
      case "medium":
        return "badge-warning";
      case "low":
        return "badge-success";
      default:
        return "";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "academic":
        return "badge-academic";
      case "event":
        return "badge-event";
      case "administrative":
      case "financial":
        return "badge-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl hero-gradient p-8 border border-border">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl btn-gradient flex items-center justify-center">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                AI Mail Summarizer
                <span className="ai-badge flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Powered
                </span>
              </h1>
              <p className="text-muted-foreground">Transform long college emails into actionable insights</p>
            </div>
          </div>

          {/* Toggle Mode */}
          <div className="flex items-center justify-end mb-4 gap-2">
            <Label htmlFor="gmail-mode" className="text-white">Connect Gmail</Label>
            <Switch
              id="gmail-mode"
              checked={isGmailMode}
              onCheckedChange={setIsGmailMode}
            />
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            {!isGmailMode ? (
              // Manual Input Mode
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={emailType} onValueChange={setEmailType}>
                    <SelectTrigger className="w-full sm:w-48 bg-background/50">
                      <SelectValue placeholder="Email type" />
                    </SelectTrigger>
                    <SelectContent>
                      {emailTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Paste your college email here... (e.g., exam notifications, event announcements, administrative notices)"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="min-h-32 bg-background/50 resize-none"
                />

                <Button
                  onClick={handleSummarize}
                  disabled={isLoading}
                  className="btn-gradient w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Summarize Email
                    </>
                  )}
                </Button>
              </>
            ) : (
              // Gmail Integration Mode - Simplified
              <div className="space-y-4 bg-background/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="space-y-4">
                  {!isAuthenticated ? (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-white">Connect Your Inbox</h3>
                      <div className="space-y-2">
                        <Label className="text-white">Gmail Address</Label>
                        <Input
                          value={userEmail}
                          onChange={e => setUserEmail(e.target.value)}
                          placeholder="student@gmail.com"
                          className="bg-background/50 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <Button onClick={handleConnectGmail} className="w-full bg-white text-primary hover:bg-white/90">
                        <Mail className="h-4 w-4 mr-2" />
                        Connect & Summarize
                      </Button>
                      <p className="text-xs text-white/60 text-center">
                        Uses official Google API integration
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Connected: {userEmail}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)} className="h-6 text-xs text-white/70 hover:text-white">
                          Change
                        </Button>
                      </div>

                      <Button
                        onClick={handleFetchEmails}
                        disabled={isLoading}
                        className="w-full btn-gradient"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Fetching Emails...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Summarize Recent 5 Emails
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summaries List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Recent Summaries
        </h2>

        <div className="space-y-3">
          {summaries.map((summary, index) => (
            <Card
              key={index}
              className={`card-elevated interactive-card ${summary.isUrgent ? "border-l-4 border-l-destructive" : ""
                }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getCategoryBadge(summary.category)}>
                        {summary.category}
                      </Badge>
                      <Badge className={getPriorityColor(summary.priority)}>
                        {summary.priority === "high" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {summary.priority.charAt(0).toUpperCase() + summary.priority.slice(1)} Priority
                      </Badge>
                      {summary.deadline && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(summary.deadline).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base font-medium leading-relaxed">
                      {summary.summary}
                    </CardTitle>
                  </div>
                  <span className="ai-badge text-[10px]">AI</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {summary.actionItems.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {summary.actionItems.map((item, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md"
                      >
                        <CheckCircle className="h-3 w-3 text-success" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {summary.originalContent && (
                  <button
                    onClick={() => setExpandedId(expandedId === index ? null : index)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {expandedId === index ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Hide original
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Show original
                      </>
                    )}
                  </button>
                )}

                {expandedId === index && summary.originalContent && (
                  <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    {summary.originalContent.slice(0, 200)}...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
