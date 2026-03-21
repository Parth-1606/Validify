"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Lightbulb,
  Save,
  BarChart3,
  LogOut,
  RefreshCw,
  Rocket,
  Search,
  CheckCircle,
  Trash2,
  Eye,
  ChevronRight,
  Target,
  Cpu,
  Calendar,
  FileText,
  Download,
  Settings,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Code,
  Zap,
  AlertTriangle,
  Shield,
  MessageSquare,
  BookOpen,
  Send,
  ExternalLink,
  Copy,
  XCircle,
  AlertCircle,
} from "lucide-react";

type NavPage = "Dashboard" | "New Analysis" | "Saved Ideas" | "Compare Ideas" | "Templates";
type AppView = "landing" | "login" | "app";

interface ScoreBreakdown {
  market_demand_score: number;
  competition_level_score: number;
  monetization_score: number;
  execution_difficulty_score: number;
  innovation_score: number;
}

interface FinancialProjections {
  mvp_cost: number;
  full_product_cost: number;
  year1_revenue: number;
  year3_revenue: number;
  year5_revenue: number;
  funding_required: number;
  break_even_months: number;
}

interface Competitor {
  name: string;
  pricing: string;
  strengths: string[];
  weaknesses: string[];
  url: string;
}

interface CompetitiveAnalysis {
  competitors: Competitor[];
  differentiation_angle: string;
  market_position: string;
  feature_gaps: string[];
  unique_advantages: string[];
}

interface ICP {
  target_industry: string[];
  job_roles: string[];
  pain_points: string[];
  buying_triggers: string[];
  personas: { name: string; description: string; avatar: string }[];
}

interface PricingStrategy {
  recommended_model: string;
  pricing_tiers: { name: string; price: number; features: string[] }[];
  revenue_projection: { users: number; price: number; monthly_revenue: number };
  best_model_reason: string;
}

interface MVPFeatures {
  must_have: string[];
  version_2: string[];
  avoid_early: string[];
}

interface ValidationToolkit {
  interview_questions: string[];
  survey_questions: string[];
  cold_dm_templates: { platform: string; template: string }[];
  landing_page_copy: { headline: string; subheadline: string; cta: string };
  problem_statement: string;
}

interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface RiskAnalysis {
  legal_risk: { level: string; description: string; mitigation: string };
  tech_risk: { level: string; description: string; mitigation: string };
  competition_risk: { level: string; description: string; mitigation: string };
  marketing_risk: { level: string; description: string; mitigation: string };
}

interface NextStepsRoadmap {
  step1_validate: string;
  step2_mvp: string;
  step3_pricing: string;
  step4_launch: string;
}

interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  third_party_apis: string[];
  estimated_dev_time_months: number;
  recommended_team_size: number;
}

interface GoToMarket {
  marketing_channels: string[];
  target_cac: number;
  launch_timeline_weeks: number;
  early_adopter_segments: string[];
  key_milestones: string[];
}

interface ActionPlan {
  weeks_1_4: string[];
  weeks_5_8: string[];
  weeks_9_12: string[];
  months_4_6: string[];
  months_7_12: string[];
}

interface Analysis {
  id: string;
  idea_text: string;
  idea_name: string;
  final_score: number;
  success_probability: number;
  verdict: "build" | "pivot" | "drop";
  verdict_reason: string;
  market_potential: "high" | "medium" | "low";
  idea_summary: string;
  target_users: string[];
  monetization: string[];
  risks: string[];
  improvements: string[];
  score_breakdown: ScoreBreakdown;
  financial_projections: FinancialProjections;
  competitive_analysis: CompetitiveAnalysis;
  icp: ICP;
  pricing_strategy: PricingStrategy;
  mvp_features: MVPFeatures;
  validation_toolkit: ValidationToolkit;
  swot_analysis: SWOTAnalysis;
  risk_analysis: RiskAnalysis;
  next_steps_roadmap: NextStepsRoadmap;
  tech_stack: TechStack;
  go_to_market: GoToMarket;
  action_plan: ActionPlan;
  similar_successful_products: string[];
  failed_attempts_lessons: string[];
  created_at: string;
}

interface IdeaTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  trending: boolean;
}

const USD_TO_INR = 83.0;

function formatINR(amount: number): string {
  return `₹${(amount * USD_TO_INR).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

const ideaTemplates: IdeaTemplate[] = [
  { id: "1", name: "AI Resume Builder", category: "Career", description: "AI-powered resume creation and optimization tool for job seekers", trending: true },
  { id: "2", name: "College Planner", category: "Education", description: "Student scheduling, assignment tracking, and study planning app", trending: true },
  { id: "3", name: "Gym Tracking App", category: "Fitness", description: "Workout logging, progress tracking, and personalized fitness plans", trending: false },
  { id: "4", name: "Local Business Automation", category: "Business", description: "CRM and automation tools for small local businesses", trending: true },
  { id: "5", name: "WhatsApp Chatbot Business", category: "Automation", description: "No-code WhatsApp chatbot builder for customer service", trending: true },
  { id: "6", name: "AI Content Writer", category: "Marketing", description: "AI tool for generating blog posts, social media content, and ads", trending: true },
  { id: "7", name: "Expense Tracker for Freelancers", category: "Finance", description: "Simple invoicing and expense tracking for freelancers", trending: false },
  { id: "8", name: "Online Course Platform", category: "Education", description: "Create and sell online courses with built-in marketing tools", trending: false },
  { id: "9", name: "Restaurant Ordering System", category: "Food", description: "QR-based menu and ordering system for restaurants", trending: false },
  { id: "10", name: "AI Meeting Notes", category: "Productivity", description: "Automatic meeting transcription and action item extraction", trending: true },
];

function generateMockAnalysis(ideaText: string, ideaName: string): Analysis {
  const score = Math.random() * 4 + 6;
  const verdict = score > 7.5 ? "build" : score > 5 ? "pivot" : "drop";
  const potential = score > 7 ? "high" : score > 5 ? "medium" : "low";
  const successProb = Math.round(score * 10 + Math.random() * 5);

  const verdictReasons: Record<string, string> = {
    build: "Strong market demand, clear differentiation opportunity, and viable monetization path. Proceed with MVP development.",
    pivot: "The core idea has potential but needs refinement. Consider pivoting to a more specific niche or adjusting the value proposition.",
    drop: "High competition, unclear monetization, or limited market demand. Consider exploring alternative ideas.",
  };

  return {
    id: Date.now().toString(),
    idea_text: ideaText,
    idea_name: ideaName || ideaText.slice(0, 50),
    final_score: parseFloat(score.toFixed(1)),
    success_probability: successProb,
    verdict,
    verdict_reason: verdictReasons[verdict],
    market_potential: potential,
    idea_summary: `This SaaS idea focuses on ${ideaText.slice(0, 100)}... The concept shows ${potential} market potential with opportunities for growth in the target segment.`,
    target_users: [
      "Small to medium businesses",
      "Startup founders",
      "Product managers",
      "Tech-savvy entrepreneurs",
    ],
    monetization: [
      "Freemium model with premium features",
      "Monthly/Annual subscription tiers",
      "Enterprise licensing",
      "API access fees",
    ],
    risks: [
      "Market competition from established players",
      "Customer acquisition costs may be high",
      "Technical complexity in implementation",
      "Regulatory compliance requirements",
    ],
    improvements: [
      "Add AI-powered automation features",
      "Implement stronger data analytics",
      "Build integration ecosystem with popular tools",
      "Focus on mobile-first experience",
    ],
    score_breakdown: {
      market_demand_score: parseFloat((Math.random() * 3 + 7).toFixed(1)),
      competition_level_score: parseFloat((Math.random() * 4 + 5).toFixed(1)),
      monetization_score: parseFloat((Math.random() * 3 + 6).toFixed(1)),
      execution_difficulty_score: parseFloat((Math.random() * 3 + 6).toFixed(1)),
      innovation_score: parseFloat((Math.random() * 4 + 5).toFixed(1)),
    },
    financial_projections: {
      mvp_cost: Math.floor(Math.random() * 50000) + 20000,
      full_product_cost: Math.floor(Math.random() * 200000) + 100000,
      year1_revenue: Math.floor(Math.random() * 500000) + 100000,
      year3_revenue: Math.floor(Math.random() * 2000000) + 500000,
      year5_revenue: Math.floor(Math.random() * 5000000) + 1000000,
      funding_required: Math.floor(Math.random() * 500000) + 100000,
      break_even_months: Math.floor(Math.random() * 18) + 12,
    },
    competitive_analysis: {
      competitors: [
        {
          name: "Competitor A (Market Leader)",
          pricing: "$29-99/mo",
          strengths: ["Brand recognition", "Large user base", "Extensive features"],
          weaknesses: ["Complex UI", "Expensive", "Slow support"],
          url: "https://example.com",
        },
        {
          name: "Competitor B (Rising Star)",
          pricing: "$19-49/mo",
          strengths: ["Modern design", "Good pricing", "Fast iteration"],
          weaknesses: ["Limited integrations", "New to market", "Small team"],
          url: "https://example.com",
        },
        {
          name: "Competitor C (Budget Option)",
          pricing: "$9-29/mo",
          strengths: ["Affordable", "Easy to use", "Good for beginners"],
          weaknesses: ["Limited features", "Poor scalability", "Basic support"],
          url: "https://example.com",
        },
        {
          name: "Competitor D (Enterprise)",
          pricing: "$199-499/mo",
          strengths: ["Enterprise features", "Security focus", "Dedicated support"],
          weaknesses: ["Overkill for SMBs", "Long sales cycle", "Complex setup"],
          url: "https://example.com",
        },
        {
          name: "Competitor E (Niche Player)",
          pricing: "$39-79/mo",
          strengths: ["Specialized features", "Industry focus", "Expert community"],
          weaknesses: ["Limited market", "Less flexible", "Higher churn"],
          url: "https://example.com",
        },
      ],
      differentiation_angle: "Focus on AI-powered automation and superior UX for small businesses, with transparent pricing and exceptional customer support.",
      market_position: "Challenger with differentiation opportunity",
      feature_gaps: [
        "Advanced analytics dashboard",
        "Team collaboration features",
        "Custom reporting",
      ],
      unique_advantages: [
        "AI-powered insights",
        "Better user experience",
        "More affordable pricing",
      ],
    },
    icp: {
      target_industry: ["SaaS", "E-commerce", "Digital Marketing", "Consulting", "Technology"],
      job_roles: ["Startup Founders", "Product Managers", "Marketing Directors", "Small Business Owners", "Freelancers"],
      pain_points: [
        "Spending too much time on manual tasks",
        "Difficulty tracking performance metrics",
        "No centralized tool for workflow management",
        "High costs of existing solutions",
        "Steep learning curve of current tools",
      ],
      buying_triggers: [
        "Just received funding and need to scale",
        "Frustrated with current tool limitations",
        "Expanding team and need better collaboration",
        "Cost-cutting initiative requiring cheaper alternatives",
        "New project requiring specialized features",
      ],
      personas: [
        { name: "Startup Steve", description: "Early-stage founder, technical background, bootstrapping, needs affordable tools that scale", avatar: "S" },
        { name: "Marketing Maria", description: "Marketing manager at SMB, non-technical, needs easy-to-use automation", avatar: "M" },
        { name: "Freelancer Frank", description: "Solo consultant, price-sensitive, needs all-in-one solution", avatar: "F" },
      ],
    },
    pricing_strategy: {
      recommended_model: "Freemium with Usage-Based Upsells",
      pricing_tiers: [
        { name: "Free", price: 0, features: ["Basic features", "Up to 100 items", "Email support", "1 user"] },
        { name: "Pro", price: 499, features: ["All Free features", "Unlimited items", "Priority support", "5 users", "API access"] },
        { name: "Business", price: 1499, features: ["All Pro features", "Advanced analytics", "Custom integrations", "Unlimited users", "Dedicated support"] },
        { name: "Enterprise", price: 4999, features: ["All Business features", "Custom SLA", "On-premise option", "Security audit", "Account manager"] },
      ],
      revenue_projection: { users: 100, price: 499, monthly_revenue: 49900 },
      best_model_reason: "Freemium reduces friction for acquisition while usage-based pricing captures value from power users. This model works well for tools with network effects and viral potential.",
    },
    mvp_features: {
      must_have: [
        "User authentication and profiles",
        "Core value proposition feature",
        "Basic dashboard with key metrics",
        "Simple onboarding flow",
        "Email notifications",
        "Basic integrations (Google, Slack)",
      ],
      version_2: [
        "Team collaboration features",
        "Advanced analytics and reporting",
        "Mobile app (iOS/Android)",
        "API for custom integrations",
        "White-labeling options",
        "Automation workflows",
      ],
      avoid_early: [
        "Complex admin panel - use simple tools first",
        "Multi-language support - focus on English initially",
        "Advanced customization - keep it simple",
        "Native desktop apps - web-first approach",
        "AI features - validate core value first",
        "Marketplace/ecosystem - build demand first",
      ],
    },
    validation_toolkit: {
      interview_questions: [
        "What's the biggest challenge you face with [problem area] today?",
        "How are you currently solving this problem?",
        "What have you tried before that didn't work?",
        "How much time do you spend on this task weekly?",
        "What would an ideal solution look like for you?",
        "How much would you pay for a tool that solves this?",
        "Who else in your organization deals with this problem?",
        "What features would make you switch from your current solution?",
        "How do you typically discover new tools for your work?",
        "What's the buying process like at your company?",
        "What would make you recommend this to a colleague?",
        "What concerns would you have about adopting a new tool?",
      ],
      survey_questions: [
        "On a scale of 1-10, how painful is [problem] for you?",
        "How often do you deal with [problem]? (Daily/Weekly/Monthly)",
        "Which existing tools have you tried? (Multiple choice)",
        "What's your budget for solving this problem?",
        "What's your role and company size?",
      ],
      cold_dm_templates: [
        {
          platform: "LinkedIn",
          template: "Hi [Name], I noticed you're a [Role] at [Company]. I'm researching how [industry] professionals handle [problem]. Would you have 15 mins for a quick chat? I'd love to learn from your experience. No pitch, just research!",
        },
        {
          platform: "Twitter/X",
          template: "Hey [Name]! Building something for [target audience] and would love your input. Noticed you tweeted about [related topic]. Quick 10-min call this week? DM me if interested!",
        },
        {
          platform: "Instagram",
          template: "Hi [Name]! Love your content about [topic]. I'm building a tool for [target audience] and think you'd have great insights. Would you be open to a quick chat? I'd really value your perspective!",
        },
      ],
      landing_page_copy: {
        headline: `Stop wasting time on ${ideaText.slice(0, 30)}... - Automate it in minutes`,
        subheadline: "Join 1000+ professionals who save 10+ hours every week with our AI-powered solution. No technical skills required.",
        cta: "Start Free Trial - No Credit Card Required",
      },
      problem_statement: `[Target users] struggle with [core problem], leading to [negative consequences]. Current solutions are [limitations of existing solutions]. Our product provides [unique solution] that [key benefits], resulting in [positive outcomes].`,
    },
    swot_analysis: {
      strengths: [
        "First-mover advantage in niche segment",
        "AI-powered differentiation",
        "Lean team = faster iteration",
        "Lower pricing than competitors",
      ],
      weaknesses: [
        "Limited brand awareness",
        "Small initial team",
        "No existing customer base",
        "Resource constraints",
      ],
      opportunities: [
        "Growing market demand",
        "Competitors slow to innovate",
        "Remote work trend increasing need",
        "Partnership opportunities",
      ],
      threats: [
        "Large players entering market",
        "Economic downturn reducing budgets",
        "Rapid technology changes",
        "Copycat competitors",
      ],
    },
    risk_analysis: {
      legal_risk: {
        level: "Low",
        description: "Standard SaaS terms apply. No special regulatory requirements identified.",
        mitigation: "Use standard ToS templates, implement GDPR compliance, consult legal for data handling policies.",
      },
      tech_risk: {
        level: "Medium",
        description: "AI/ML components require specialized expertise. Scaling challenges possible.",
        mitigation: "Start with proven tech stack, use managed services, hire experienced engineers early.",
      },
      competition_risk: {
        level: "High",
        description: "Established players with more resources. Risk of feature copying.",
        mitigation: "Focus on niche, build community, prioritize speed to market, create switching costs.",
      },
      marketing_risk: {
        level: "Medium",
        description: "Customer acquisition costs may be higher than projected. Crowded market.",
        mitigation: "Content marketing focus, build in public, leverage communities, referral programs.",
      },
    },
    next_steps_roadmap: {
      step1_validate: "Interview 20 potential users in the next 2 weeks. Use the provided interview questions to understand their pain points and willingness to pay.",
      step2_mvp: "Build a landing page with email capture. Create a clickable prototype. Target: 100 signups before building.",
      step3_pricing: "Run pricing experiments with different landing page variants. Test willingness to pay with early adopters.",
      step4_launch: "Soft launch to waitlist. Gather feedback. Iterate. Plan Product Hunt launch for broader visibility.",
    },
    tech_stack: {
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "Express", "GraphQL"],
      database: ["PostgreSQL", "Redis"],
      third_party_apis: ["Stripe", "SendGrid", "AWS S3"],
      estimated_dev_time_months: Math.floor(Math.random() * 6) + 3,
      recommended_team_size: Math.floor(Math.random() * 5) + 2,
    },
    go_to_market: {
      marketing_channels: [
        "Content Marketing",
        "SEO",
        "Product Hunt Launch",
        "LinkedIn Ads",
      ],
      target_cac: Math.floor(Math.random() * 100) + 50,
      launch_timeline_weeks: Math.floor(Math.random() * 8) + 4,
      early_adopter_segments: [
        "Tech startups",
        "SaaS companies",
        "Digital agencies",
      ],
      key_milestones: [
        "MVP launch",
        "100 beta users",
        "Product-market fit validation",
        "Series A readiness",
      ],
    },
    action_plan: {
      weeks_1_4: [
        "Complete market research",
        "Define MVP features",
        "Set up development environment",
      ],
      weeks_5_8: [
        "Build core features",
        "Implement authentication",
        "Design UI/UX",
      ],
      weeks_9_12: ["Beta testing", "Bug fixes", "Performance optimization"],
      months_4_6: [
        "Public launch",
        "Marketing campaign",
        "Customer feedback loop",
      ],
      months_7_12: [
        "Feature expansion",
        "Scale infrastructure",
        "Explore partnerships",
      ],
    },
    similar_successful_products: [
      "Notion - Built a $10B company with similar approach",
      "Airtable - Successfully combined spreadsheets with databases",
      "Figma - Disrupted design tools market",
    ],
    failed_attempts_lessons: [
      "Over-engineering before product-market fit",
      "Ignoring user feedback in early stages",
      "Scaling too fast without sustainable unit economics",
    ],
    created_at: new Date().toISOString(),
  };
}

function getScoreColor(score: number): string {
  if (score >= 8) return "text-emerald-400";
  if (score >= 6) return "text-yellow-400";
  return "text-red-400";
}

function getVerdictColor(verdict: string): string {
  switch (verdict.toLowerCase()) {
    case "build":
      return "bg-emerald-500";
    case "pivot":
      return "bg-yellow-500";
    case "drop":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
}

function getRiskColor(level: string): string {
  switch (level.toLowerCase()) {
    case "low":
      return "text-emerald-400 bg-emerald-500/10";
    case "medium":
      return "text-yellow-400 bg-yellow-500/10";
    case "high":
      return "text-red-400 bg-red-500/10";
    default:
      return "text-gray-400 bg-gray-500/10";
  }
}

export default function Home() {
  const [appView, setAppView] = useState<AppView>("landing");
  const [currentPage, setCurrentPage] = useState<NavPage>("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [savedIdeas, setSavedIdeas] = useState<Analysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [ideaText, setIdeaText] = useState("");
  const [ideaName, setIdeaName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("savedIdeas");
    if (stored) {
      setSavedIdeas(JSON.parse(stored));
    }
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      setUserEmail(localStorage.getItem("userEmail") || "user@example.com");
      setAppView("app");
    }
  }, []);

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setIsAuthenticated(true);
      setUserEmail(loginEmail);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", loginEmail);
      setAppView("app");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setAppView("landing");
  };

  const handleAnalyze = async () => {
    if (!ideaText.trim()) return;
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const analysis = generateMockAnalysis(ideaText, ideaName);
    setCurrentAnalysis(analysis);
    const updated = [analysis, ...savedIdeas];
    setSavedIdeas(updated);
    localStorage.setItem("savedIdeas", JSON.stringify(updated));
    setIsAnalyzing(false);
    setChatMessages([]);
  };

  const handleDelete = (id: string) => {
    const updated = savedIdeas.filter((idea) => idea.id !== id);
    setSavedIdeas(updated);
    localStorage.setItem("savedIdeas", JSON.stringify(updated));
  };

  const handleView = (analysis: Analysis) => {
    setCurrentAnalysis(analysis);
    setIdeaText(analysis.idea_text);
    setCurrentPage("New Analysis");
    setChatMessages([]);
  };

  const clearSession = () => {
    setCurrentAnalysis(null);
    setIdeaText("");
    setIdeaName("");
    setChatMessages([]);
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || !currentAnalysis) return;
    const userMessage = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setChatInput("");
    setIsChatLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const responses: Record<string, string> = {
      "niche": `Based on your idea "${currentAnalysis.idea_name}", here are better niche options:\n\n1. **Micro-SaaS for ${currentAnalysis.icp.target_industry[0]}** - Focus specifically on ${currentAnalysis.icp.job_roles[0]}s\n2. **Vertical Solution** - Target only ${currentAnalysis.icp.target_industry[1]} industry\n3. **Geographic Focus** - Start with Indian SMBs before expanding\n\nRecommendation: Start narrow, dominate a niche, then expand.`,
      "marketing": `Marketing Strategy for "${currentAnalysis.idea_name}":\n\n1. **Content Marketing** - Create blog posts solving ${currentAnalysis.icp.pain_points[0]}\n2. **LinkedIn Outreach** - Target ${currentAnalysis.icp.job_roles.join(", ")}\n3. **Community Building** - Start a Discord/Slack for your target users\n4. **Product Hunt Launch** - Plan for week 8-10 of development\n5. **Referral Program** - Offer 1 month free for referrals\n\nBudget: Start with ₹50,000/month for paid ads after PMF.`,
      "landing": `Landing Page Copy for "${currentAnalysis.idea_name}":\n\n**Headline:** ${currentAnalysis.validation_toolkit.landing_page_copy.headline}\n\n**Subheadline:** ${currentAnalysis.validation_toolkit.landing_page_copy.subheadline}\n\n**CTA:** ${currentAnalysis.validation_toolkit.landing_page_copy.cta}\n\n**Key Sections:**\n- Problem statement\n- Solution overview with demo video\n- 3 key benefits with icons\n- Social proof/testimonials\n- Pricing table\n- FAQ section`,
      "name": `Startup Name Ideas for "${currentAnalysis.idea_name}":\n\n1. **${ideaText.split(" ")[0]}ly** - Modern SaaS naming convention\n2. **Get${ideaText.split(" ")[0]}** - Action-oriented\n3. **${ideaText.split(" ")[0]}Hub** - Platform feel\n4. **${ideaText.split(" ")[0]}AI** - If AI-powered\n5. **${ideaText.split(" ")[0]}ify** - Verb-based\n\n**Tips:** Check domain availability on Namecheap, verify trademark on USPTO.`,
    };

    let response = "I can help you with:\n- **Better niche suggestions** (say 'niche')\n- **Marketing strategy** (say 'marketing')\n- **Landing page copy** (say 'landing')\n- **Startup name ideas** (say 'name')\n\nWhat would you like to explore?";
    
    const lowerInput = userMessage.toLowerCase();
    if (lowerInput.includes("niche")) response = responses["niche"];
    else if (lowerInput.includes("marketing") || lowerInput.includes("strategy")) response = responses["marketing"];
    else if (lowerInput.includes("landing") || lowerInput.includes("page")) response = responses["landing"];
    else if (lowerInput.includes("name") || lowerInput.includes("startup")) response = responses["name"];

    setChatMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsChatLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const totalIdeas = savedIdeas.length;
  const avgScore =
    savedIdeas.length > 0
      ? savedIdeas.reduce((acc, idea) => acc + idea.final_score, 0) /
        savedIdeas.length
      : 0;
  const userName = userEmail.split("@")[0] || "User";

  if (appView === "landing") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white font-[Inter,system-ui,sans-serif]">
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              IdeaValidator
            </span>
            <button
              onClick={() => setAppView("login")}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </nav>

        <section className="pt-40 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Validate Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                Startup Idea
              </span>
              <br />
              in Minutes
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Get comprehensive AI-powered analysis of your business idea. From
              market fit to financial projections, make data-driven decisions
              before you invest time and money.
            </p>
            <button
              onClick={() => setAppView("login")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-full text-lg font-medium transition-all hover:scale-105"
            >
              Analyze Your Idea
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Validate
              </h2>
              <p className="text-gray-400">
                Comprehensive analysis powered by cutting-edge AI technology
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Market Fit Analysis",
                  desc: "Understand your target market size, trends, and opportunity with data-backed insights.",
                },
                {
                  icon: Users,
                  title: "Competitor Intelligence",
                  desc: "Identify key competitors, their strengths, weaknesses, and pricing strategies.",
                },
                {
                  icon: TrendingUp,
                  title: "Financial Projections",
                  desc: "Get realistic cost estimates, revenue projections, and break-even analysis.",
                },
                {
                  icon: Code,
                  title: "Tech Stack Recommendations",
                  desc: "Receive tailored technology recommendations based on your product requirements.",
                },
                {
                  icon: Rocket,
                  title: "Go-to-Market Strategy",
                  desc: "Get actionable marketing strategies and launch timeline recommendations.",
                },
                {
                  icon: DollarSign,
                  title: "Monetization Strategies",
                  desc: "Explore various revenue models and pricing strategies for your idea.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-violet-500/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Validate Your Idea?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of entrepreneurs making smarter decisions
            </p>
            <button
              onClick={() => setAppView("login")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-full text-lg font-medium transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (appView === "login") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white font-[Inter,system-ui,sans-serif] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              IdeaValidator
            </span>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-400 mb-8">
              Sign in to continue validating your ideas
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6"
              >
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={() => setAppView("landing")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                ← Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-[Inter,system-ui,sans-serif] flex">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0f] border-r border-white/10 flex flex-col">
        <div className="p-6">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            IdeaValidator
          </span>
        </div>

        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-lg font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-white capitalize">{userName}</div>
              <div className="text-sm text-gray-400">{userEmail}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {(
            [
              { name: "Dashboard", icon: LayoutDashboard },
              { name: "New Analysis", icon: Lightbulb },
              { name: "Saved Ideas", icon: Save },
              { name: "Compare Ideas", icon: BarChart3 },
              { name: "Templates", icon: BookOpen },
            ] as const
          ).map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                currentPage === item.name
                  ? "bg-violet-500/10 text-violet-400 border-r-4 border-violet-500"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 mx-3 mb-4 bg-white/[0.02] border border-white/10 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-3">Your Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Ideas Analyzed</span>
              <span className="font-semibold text-white">{totalIdeas}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Avg Score</span>
              <span className="font-semibold text-violet-400">{avgScore > 0 ? avgScore.toFixed(1) : "N/A"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Build Ready</span>
              <span className="font-semibold text-emerald-400">{savedIdeas.filter((i) => i.verdict === "build").length}</span>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8 bg-[#0a0a0f] min-h-screen">
        <div className="max-w-6xl mx-auto">
          {currentPage === "Dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back,{" "}
                  <span className="capitalize bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
                    {userName}
                  </span>
                </h1>
                <p className="text-gray-400 mt-1">
                  Here&apos;s what&apos;s happening with your SaaS ideas
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[
                  {
                    icon: Lightbulb,
                    value: totalIdeas,
                    label: "Total Ideas",
                    change: `+${totalIdeas} analyzed`,
                  },
                  {
                    icon: BarChart3,
                    value: totalIdeas,
                    label: "Analyses Done",
                    change: "All completed",
                  },
                  {
                    icon: Target,
                    value: avgScore > 0 ? avgScore.toFixed(1) : "N/A",
                    label: "Avg Score",
                    change: "Out of 10",
                  },
                  {
                    icon: Rocket,
                    value: savedIdeas.filter((i) => i.verdict === "build")
                      .length,
                    label: "Build Ready",
                    change: "Ideas to pursue",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4">
                      <stat.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-violet-400 mt-2">
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-violet-400" />
                    Recent Analyses
                  </h2>
                  {savedIdeas.length > 0 ? (
                    <div className="space-y-4">
                      {savedIdeas.slice(0, 5).map((idea) => (
                        <div
                          key={idea.id}
                          onClick={() => handleView(idea)}
                          className="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-violet-500/30 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">
                              {idea.idea_name}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getVerdictColor(idea.verdict)}`}
                            >
                              {idea.verdict.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                            {idea.idea_text}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">
                              Score:{" "}
                              <span
                                className={`font-bold ${getScoreColor(idea.final_score)}`}
                              >
                                {idea.final_score}/10
                              </span>
                            </span>
                            <span className="text-gray-500">
                              {new Date(idea.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      No analyses yet. Create your first analysis!
                    </div>
                  )}
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-violet-400" />
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start gap-2 bg-violet-600 hover:bg-violet-700"
                      onClick={() => setCurrentPage("New Analysis")}
                    >
                      <Rocket className="w-4 h-4" />
                      New Analysis
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                      onClick={() => setCurrentPage("Saved Ideas")}
                    >
                      <Save className="w-4 h-4" />
                      View Saved Ideas
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                      onClick={() => setCurrentPage("Templates")}
                    >
                      <BookOpen className="w-4 h-4" />
                      Browse Templates
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-sm font-semibold mb-3 text-gray-300">
                      Insights
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Average Score
                        </span>
                        <span className="font-semibold text-white">
                          {avgScore.toFixed(1)}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Total Ideas
                        </span>
                        <span className="font-semibold text-white">
                          {totalIdeas}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "New Analysis" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-yellow-400" />
                  New Idea Analysis
                </h1>
                {currentAnalysis && (
                  <Button variant="outline" onClick={clearSession} className="border-white/10 text-gray-300 hover:bg-white/5">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Analysis
                  </Button>
                )}
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <label className="block text-sm text-gray-400 mb-2">
                  Describe your SaaS idea
                </label>
                <Textarea
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  placeholder="Enter your SaaS idea here... Be as detailed as possible for better analysis."
                  className="min-h-[150px] mb-4 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !ideaText.trim()}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Validate Idea
                    </>
                  )}
                </Button>
              </div>

              {currentAnalysis && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/30 rounded-2xl p-6 text-center">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                        Overall Score
                      </div>
                      <div className="text-5xl font-bold text-yellow-400 mb-2">
                        {Math.round(currentAnalysis.final_score * 10)}/100
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-1000"
                          style={{
                            width: `${currentAnalysis.final_score * 10}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                        Success Probability
                      </div>
                      <div className="text-5xl font-bold text-emerald-400 mb-2">
                        {currentAnalysis.success_probability}%
                      </div>
                      <div className="text-sm text-gray-500">Based on market analysis</div>
                    </div>

                    <div className={`rounded-2xl p-6 text-center ${
                      currentAnalysis.verdict === "build" ? "bg-emerald-500/10 border border-emerald-500/30" :
                      currentAnalysis.verdict === "pivot" ? "bg-yellow-500/10 border border-yellow-500/30" :
                      "bg-red-500/10 border border-red-500/30"
                    }`}>
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                        Go / No-Go
                      </div>
                      <div className={`text-4xl mb-2 ${
                        currentAnalysis.verdict === "build" ? "text-emerald-400" :
                        currentAnalysis.verdict === "pivot" ? "text-yellow-400" :
                        "text-red-400"
                      }`}>
                        {currentAnalysis.verdict === "build" ? "GO" :
                         currentAnalysis.verdict === "pivot" ? "VALIDATE" : "NO-GO"}
                      </div>
                      <div className="text-xs text-gray-400">{currentAnalysis.verdict_reason.slice(0, 60)}...</div>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-6">Scorecard</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {[
                        { label: "Market Demand", score: currentAnalysis.score_breakdown.market_demand_score, icon: Target },
                        { label: "Competition Level", score: currentAnalysis.score_breakdown.competition_level_score, icon: Users },
                        { label: "Monetization", score: currentAnalysis.score_breakdown.monetization_score, icon: DollarSign },
                        { label: "Execution Difficulty", score: currentAnalysis.score_breakdown.execution_difficulty_score, icon: Code },
                        { label: "Innovation", score: currentAnalysis.score_breakdown.innovation_score, icon: Zap },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 text-center">
                          <item.icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white mb-1">{item.score}/10</div>
                          <div className="text-xs text-gray-400">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Next Steps Roadmap</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { step: "Step 1", title: "Validate", content: currentAnalysis.next_steps_roadmap.step1_validate, icon: Users },
                        { step: "Step 2", title: "Build MVP", content: currentAnalysis.next_steps_roadmap.step2_mvp, icon: Code },
                        { step: "Step 3", title: "Test Pricing", content: currentAnalysis.next_steps_roadmap.step3_pricing, icon: DollarSign },
                        { step: "Step 4", title: "Launch", content: currentAnalysis.next_steps_roadmap.step4_launch, icon: Rocket },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                              <item.icon className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                              <div className="text-xs text-violet-400">{item.step}</div>
                              <div className="text-sm font-semibold">{item.title}</div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-3">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Tabs defaultValue="competitors" className="w-full">
                    <TabsList className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-1 flex-wrap h-auto">
                      {[
                        { value: "competitors", label: "Competitors" },
                        { value: "icp", label: "ICP & Personas" },
                        { value: "pricing", label: "Pricing" },
                        { value: "mvp", label: "MVP Features" },
                        { value: "validation", label: "Validation Kit" },
                        { value: "swot", label: "SWOT & Risks" },
                        { value: "tech", label: "Tech Stack" },
                        { value: "financials", label: "Financials" },
                      ].map((tab) => (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className="flex-1 text-gray-400 data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg text-xs py-2"
                        >
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value="competitors" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Top 5 Competitors</h3>
                          <span className="text-sm text-gray-400">Your differentiation: {currentAnalysis.competitive_analysis.differentiation_angle}</span>
                        </div>
                        <div className="space-y-4">
                          {currentAnalysis.competitive_analysis.competitors.map((comp, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center text-violet-400 font-bold">
                                    {i + 1}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">{comp.name}</div>
                                    <div className="text-sm text-violet-400">{comp.pricing}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-xs text-emerald-400 mb-1">Strengths</div>
                                  <ul className="space-y-1">
                                    {comp.strengths.map((s, j) => (
                                      <li key={j} className="text-xs text-gray-400 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                                        {s}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <div className="text-xs text-red-400 mb-1">Weaknesses</div>
                                  <ul className="space-y-1">
                                    {comp.weaknesses.map((w, j) => (
                                      <li key={j} className="text-xs text-gray-400 flex items-center gap-1">
                                        <XCircle className="w-3 h-3 text-red-400" />
                                        {w}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="icp" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold">Ideal Customer Profile</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-violet-400 mb-3">Target Industries</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentAnalysis.icp.target_industry.map((ind, i) => (
                                <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-xs">{ind}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-blue-400 mb-3">Job Roles</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentAnalysis.icp.job_roles.map((role, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">{role}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-red-400 mb-3">Pain Points</h4>
                            <ul className="space-y-2">
                              {currentAnalysis.icp.pain_points.map((pain, i) => (
                                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                  <AlertCircle className="w-3 h-3 text-red-400 mt-0.5" />
                                  {pain}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-emerald-400 mb-3">Buying Triggers</h4>
                            <ul className="space-y-2">
                              {currentAnalysis.icp.buying_triggers.map((trigger, i) => (
                                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                  <Zap className="w-3 h-3 text-emerald-400 mt-0.5" />
                                  {trigger}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-yellow-400 mb-3">Target Personas</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {currentAnalysis.icp.personas.map((persona, i) => (
                              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold mb-3">
                                  {persona.avatar}
                                </div>
                                <div className="font-semibold text-white mb-1">{persona.name}</div>
                                <div className="text-xs text-gray-400">{persona.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Pricing Strategy</h3>
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                            Recommended: {currentAnalysis.pricing_strategy.recommended_model}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{currentAnalysis.pricing_strategy.best_model_reason}</p>
                        <div className="grid grid-cols-4 gap-4">
                          {currentAnalysis.pricing_strategy.pricing_tiers.map((tier, i) => (
                            <div key={i} className={`rounded-xl p-4 ${i === 1 ? "bg-violet-500/10 border-2 border-violet-500" : "bg-white/[0.02] border border-white/10"}`}>
                              {i === 1 && <div className="text-xs text-violet-400 font-semibold mb-2">MOST POPULAR</div>}
                              <div className="font-semibold text-white">{tier.name}</div>
                              <div className="text-2xl font-bold text-white my-2">
                                {tier.price === 0 ? "Free" : `₹${tier.price}`}
                                {tier.price > 0 && <span className="text-sm text-gray-400">/mo</span>}
                              </div>
                              <ul className="space-y-2 mt-4">
                                {tier.features.map((feature, j) => (
                                  <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-emerald-400 mb-2">Revenue Projection</h4>
                          <div className="text-2xl font-bold text-white">
                            {currentAnalysis.pricing_strategy.revenue_projection.users} users × ₹{currentAnalysis.pricing_strategy.revenue_projection.price}/mo = 
                            <span className="text-emerald-400"> ₹{currentAnalysis.pricing_strategy.revenue_projection.monthly_revenue.toLocaleString("en-IN")}/month</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="mvp" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold">MVP Feature Generator</h3>
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Must-Have (MVP)
                            </h4>
                            <ul className="space-y-2">
                              {currentAnalysis.mvp_features.must_have.map((feature, i) => (
                                <li key={i} className="text-sm text-gray-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Version 2 (Nice-to-Have)
                            </h4>
                            <ul className="space-y-2">
                              {currentAnalysis.mvp_features.version_2.map((feature, i) => (
                                <li key={i} className="text-sm text-gray-300 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                              <XCircle className="w-4 h-4" />
                              Avoid Building Early
                            </h4>
                            <ul className="space-y-2">
                              {currentAnalysis.mvp_features.avoid_early.map((feature, i) => (
                                <li key={i} className="text-sm text-gray-300 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="validation" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold">Validation Toolkit</h3>
                        
                        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-violet-400">Problem Statement</h4>
                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(currentAnalysis.validation_toolkit.problem_statement)} className="text-gray-400 hover:text-white">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-300">{currentAnalysis.validation_toolkit.problem_statement}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3">Customer Interview Questions (12)</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {currentAnalysis.validation_toolkit.interview_questions.map((q, i) => (
                              <div key={i} className="text-xs text-gray-400 bg-white/[0.02] border border-white/10 rounded-lg p-3 flex items-start gap-2">
                                <span className="text-violet-400 font-semibold">{i + 1}.</span>
                                {q}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3">Cold DM Templates</h4>
                          <div className="space-y-3">
                            {currentAnalysis.validation_toolkit.cold_dm_templates.map((dm, i) => (
                              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-semibold text-violet-400">{dm.platform}</span>
                                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(dm.template)} className="text-gray-400 hover:text-white">
                                    <Copy className="w-4 h-4 mr-1" /> Copy
                                  </Button>
                                </div>
                                <p className="text-xs text-gray-400">{dm.template}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-blue-400 mb-3">Landing Page Copy</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Headline</div>
                              <div className="text-lg font-bold text-white">{currentAnalysis.validation_toolkit.landing_page_copy.headline}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Subheadline</div>
                              <div className="text-sm text-gray-300">{currentAnalysis.validation_toolkit.landing_page_copy.subheadline}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">CTA</div>
                              <div className="inline-block px-4 py-2 bg-violet-600 rounded-lg text-sm font-semibold">{currentAnalysis.validation_toolkit.landing_page_copy.cta}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="swot" className="mt-6">
                      <div className="space-y-6">
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold mb-4">SWOT Analysis</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-emerald-400 mb-3">Strengths</h4>
                              <ul className="space-y-2">
                                {currentAnalysis.swot_analysis.strengths.map((item, i) => (
                                  <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-red-400 mb-3">Weaknesses</h4>
                              <ul className="space-y-2">
                                {currentAnalysis.swot_analysis.weaknesses.map((item, i) => (
                                  <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                    <XCircle className="w-3 h-3 text-red-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-blue-400 mb-3">Opportunities</h4>
                              <ul className="space-y-2">
                                {currentAnalysis.swot_analysis.opportunities.map((item, i) => (
                                  <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                    <TrendingUp className="w-3 h-3 text-blue-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-yellow-400 mb-3">Threats</h4>
                              <ul className="space-y-2">
                                {currentAnalysis.swot_analysis.threats.map((item, i) => (
                                  <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3 text-yellow-400" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold mb-4">Risk Analysis & Mitigation</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { key: "legal_risk", label: "Legal Risk", icon: Shield },
                              { key: "tech_risk", label: "Tech Risk", icon: Code },
                              { key: "competition_risk", label: "Competition Risk", icon: Users },
                              { key: "marketing_risk", label: "Marketing Risk", icon: TrendingUp },
                            ].map((risk) => {
                              const riskData = currentAnalysis.risk_analysis[risk.key as keyof RiskAnalysis];
                              return (
                                <div key={risk.key} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <risk.icon className="w-4 h-4 text-gray-400" />
                                      <span className="font-semibold text-white">{risk.label}</span>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(riskData.level)}`}>
                                      {riskData.level}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400 mb-2">{riskData.description}</p>
                                  <div className="bg-emerald-500/10 rounded-lg p-2">
                                    <div className="text-xs text-emerald-400 font-semibold mb-1">Mitigation</div>
                                    <p className="text-xs text-gray-300">{riskData.mitigation}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="tech" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold mb-3">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentAnalysis.tech_stack.frontend.map(
                                (tech, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentAnalysis.tech_stack.backend.map(
                                (tech, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Database</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentAnalysis.tech_stack.database.map(
                                (tech, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl text-center">
                            <div className="text-sm text-gray-500">
                              Dev Time
                            </div>
                            <div className="text-2xl font-bold text-white">
                              {currentAnalysis.tech_stack.estimated_dev_time_months} months
                            </div>
                          </div>
                          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl text-center">
                            <div className="text-sm text-gray-500">
                              Team Size
                            </div>
                            <div className="text-2xl font-bold text-white">
                              {currentAnalysis.tech_stack.recommended_team_size} people
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="financials" className="mt-6">
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-6">
                          Financial Projections
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            {
                              label: "MVP Cost",
                              value: formatINR(currentAnalysis.financial_projections.mvp_cost),
                            },
                            {
                              label: "Full Product",
                              value: formatINR(currentAnalysis.financial_projections.full_product_cost),
                            },
                            {
                              label: "Funding Required",
                              value: formatINR(currentAnalysis.financial_projections.funding_required),
                            },
                            {
                              label: "Break Even",
                              value: `${currentAnalysis.financial_projections.break_even_months} months`,
                            },
                            {
                              label: "Year 1 Revenue",
                              value: formatINR(currentAnalysis.financial_projections.year1_revenue),
                            },
                            {
                              label: "Year 3 Revenue",
                              value: formatINR(currentAnalysis.financial_projections.year3_revenue),
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="p-4 bg-white/[0.02] border border-white/10 rounded-xl text-center"
                            >
                              <div className="text-sm text-gray-500">
                                {item.label}
                              </div>
                              <div className="text-xl font-bold text-white mt-1">
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-violet-400" />
                      AI Chat - Ask Follow-ups
                    </h3>
                    <div className="h-64 overflow-y-auto mb-4 space-y-3">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                          <p>Ask follow-up questions about your analysis</p>
                          <p className="text-xs mt-2">Try: &quot;Give me better niche&quot;, &quot;Suggest marketing strategy&quot;, &quot;Generate landing page&quot;</p>
                        </div>
                      ) : (
                        chatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] rounded-xl p-3 text-sm whitespace-pre-wrap ${
                              msg.role === "user" 
                                ? "bg-violet-600 text-white" 
                                : "bg-white/[0.05] border border-white/10 text-gray-300"
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))
                      )}
                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white/[0.05] border border-white/10 rounded-xl p-3 text-sm text-gray-300">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
                        placeholder="Ask about niche, marketing, landing page, startup name..."
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      />
                      <Button onClick={handleChatSubmit} className="bg-violet-600 hover:bg-violet-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentPage === "Saved Ideas" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Save className="w-8 h-8 text-violet-400" />
                Saved Ideas
              </h1>

              {savedIdeas.length === 0 ? (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-12 text-center">
                  <Save className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No saved ideas yet. Analyze an idea to save it!
                  </p>
                  <Button
                    className="mt-4 bg-violet-600 hover:bg-violet-700"
                    onClick={() => setCurrentPage("New Analysis")}
                  >
                    Create New Analysis
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {idea.idea_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Score: {idea.final_score}/10 | Success: {idea.success_probability}%
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getVerdictColor(idea.verdict)}`}
                        >
                          {idea.verdict.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {idea.idea_text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(idea.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/10 text-gray-300 hover:bg-white/5"
                            onClick={() => handleView(idea)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleDelete(idea.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentPage === "Compare Ideas" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-violet-400" />
                Compare Ideas
              </h1>

              {savedIdeas.length < 2 ? (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    You need at least 2 saved ideas to compare.
                  </p>
                  <Button
                    className="mt-4 bg-violet-600 hover:bg-violet-700"
                    onClick={() => setCurrentPage("New Analysis")}
                  >
                    Create New Analysis
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm text-gray-400 mb-3">
                      Select ideas to compare (max 3):
                    </label>
                    <div className="space-y-2">
                      {savedIdeas.map((idea) => (
                        <label
                          key={idea.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCompareIds.includes(idea.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                if (selectedCompareIds.length < 3) {
                                  setSelectedCompareIds([
                                    ...selectedCompareIds,
                                    idea.id,
                                  ]);
                                }
                              } else {
                                setSelectedCompareIds(
                                  selectedCompareIds.filter(
                                    (id) => id !== idea.id
                                  )
                                );
                              }
                            }}
                            className="w-4 h-4 accent-violet-500"
                          />
                          <span className="flex-1 font-medium text-white">
                            {idea.idea_name}
                          </span>
                          <span className="text-sm text-gray-500">
                            Score: {idea.final_score}/10
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {selectedCompareIds.length >= 2 && (
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Comparison Results
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 px-4 font-semibold text-gray-400">
                                Metric
                              </th>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find(
                                  (i) => i.id === id
                                );
                                return (
                                  <th
                                    key={id}
                                    className="text-left py-3 px-4 font-semibold text-white"
                                  >
                                    {idea?.idea_name}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-4 text-gray-400">Score</td>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find(
                                  (i) => i.id === id
                                );
                                return (
                                  <td
                                    key={id}
                                    className={`py-3 px-4 font-bold ${getScoreColor(idea?.final_score || 0)}`}
                                  >
                                    {idea?.final_score}/10
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-4 text-gray-400">Success %</td>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find((i) => i.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-emerald-400 font-bold">
                                    {idea?.success_probability}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-4 text-gray-400">
                                Verdict
                              </td>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find(
                                  (i) => i.id === id
                                );
                                return (
                                  <td key={id} className="py-3 px-4">
                                    <span
                                      className={`px-2 py-1 rounded text-xs font-semibold text-white ${getVerdictColor(idea?.verdict || "")}`}
                                    >
                                      {idea?.verdict.toUpperCase()}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-4 text-gray-400">
                                Market Potential
                              </td>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find(
                                  (i) => i.id === id
                                );
                                return (
                                  <td
                                    key={id}
                                    className="py-3 px-4 text-white uppercase font-medium"
                                  >
                                    {idea?.market_potential}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-3 px-4 text-gray-400">
                                MVP Cost
                              </td>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find(
                                  (i) => i.id === id
                                );
                                return (
                                  <td key={id} className="py-3 px-4 text-white">
                                    {formatINR(
                                      idea?.financial_projections.mvp_cost || 0
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 text-gray-400">
                                Year 1 Revenue
                              </td>
                              {selectedCompareIds.map((id) => {
                                const idea = savedIdeas.find(
                                  (i) => i.id === id
                                );
                                return (
                                  <td key={id} className="py-3 px-4 text-white">
                                    {formatINR(
                                      idea?.financial_projections
                                        .year1_revenue || 0
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {currentPage === "Templates" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-violet-400" />
                  Idea Templates & Niches
                </h1>
                <p className="text-gray-400 mt-1">Get inspired with trending SaaS ideas</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {ideaTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-colors cursor-pointer"
                    onClick={() => {
                      setIdeaText(template.description);
                      setIdeaName(template.name);
                      setCurrentPage("New Analysis");
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-xs">
                        {template.category}
                      </span>
                      {template.trending && (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-400">{template.description}</p>
                    <Button className="mt-4 w-full bg-violet-600/20 hover:bg-violet-600 text-violet-400 hover:text-white border border-violet-500/30">
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze This Idea
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
