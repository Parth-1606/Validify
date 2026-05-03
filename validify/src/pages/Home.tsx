import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, Target, Users, Zap, CheckCircle, ArrowRight, Loader2, 
  BarChart3, ShieldAlert, Lightbulb, Sparkles, LogIn, ChevronDown, 
  Brain, Globe, TrendingUp, MessageSquare, ShieldCheck, Star, ChevronUp,
  Briefcase, Code, LineChart, Building, FileText, Box, Database, Cloud, Check,
  Calculator, List, BookOpen, Wrench
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ValidationReport from '../components/ValidationReport';
import Sidebar from '../components/Sidebar';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const loadingStepsData = [
  { id: 0, text: "Researching market data...", icon: Globe },
  { id: 1, text: "Analyzing competitors...", icon: Users },
  { id: 2, text: "Evaluating industry trends...", icon: TrendingUp },
  { id: 3, text: "AI processing insights...", icon: Brain },
  { id: 4, text: "Calculating success score...", icon: BarChart3 },
  { id: 5, text: "Generating report...", icon: FileText },
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-neutral-800 rounded-2xl overflow-hidden mb-4 bg-neutral-900/30 backdrop-blur-sm"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-6 text-left flex justify-between items-center hover:bg-neutral-800/30 transition-colors"
      >
        <span className="font-bold text-lg pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-emerald-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-neutral-500 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-neutral-400 leading-relaxed border-t border-neutral-800/50 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Home() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('validify_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingStepsData.length - 1 ? prev + 1 : prev));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) throw new Error('Failed to validate idea');

      const data = await response.json();
      setResult(data.analysis);
      
      const newHistoryItem = { idea, result: data.analysis, timestamp: Date.now() };
      setHistory(prev => {
        const updated = [newHistoryItem, ...prev];
        localStorage.setItem('validify_history', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {result && (
        <Sidebar 
          onNewIdea={() => { setResult(null); setIdea(''); }} 
          history={history} 
          onSelectHistory={(item) => { setResult(item.result); setIdea(item.idea); }} 
        />
      )}
      <div className="flex-1 relative h-full flex flex-col overflow-y-auto overflow-x-hidden" id="main-scroll-container">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500 blur-[120px]"
        />
      </div>

      {/* Header */}
      <header className="border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {!result ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={scrollToTop}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <Rocket className="w-5 h-5 text-neutral-950" />
              </div>
              <span className="font-bold text-xl tracking-tight">Validify</span>
            </motion.div>
          ) : (
            <div></div> /* Placeholder to keep flex-justify-between spacing intact */
          )}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
              <a href="#how-it-works" className="hover:text-neutral-50 transition-colors">How it works</a>
              <a href="#features" className="hover:text-neutral-50 transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-neutral-50 transition-colors">Wall of Love</a>
              <Link to="/pricing" className="hover:text-neutral-50 transition-colors">Pricing</Link>
            </nav>
            <div className="w-px h-6 bg-neutral-800 hidden md:block"></div>
          </motion.div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="intro"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="max-w-3xl mx-auto text-center space-y-8"
              >
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-neutral-300">AI-Powered Startup Validator</span>
                </motion.div>
                
                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-neutral-50 to-neutral-500">
                  Test Your Idea in <span className="text-emerald-400 inline-block">120s</span>
                </motion.h1>
                
                <motion.p variants={itemVariants} className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  Get instant TAM/SAM/SOM analysis, competitor SWOT, and investor-ready plans. 
                  Stop guessing, start building.
                </motion.p>

                <motion.form variants={itemVariants} onSubmit={handleValidate} className="relative max-w-xl mx-auto mt-12">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-3xl -z-10 opacity-50"></div>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative flex flex-col sm:flex-row gap-2 p-1.5 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl transition-colors focus-within:border-emerald-500/50 focus-within:bg-neutral-900"
                  >
                    <textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Describe your startup idea in a few sentences..."
                      className="w-full bg-transparent border-none focus:ring-0 text-neutral-50 placeholder-neutral-500 resize-none h-14 py-4 px-4 text-base outline-none leading-tight"
                      disabled={loading}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !idea.trim()}
                      className={`sm:w-auto w-full px-6 py-3 font-bold rounded-xl transition-all disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap shadow-lg ${
                        loading ? 'bg-emerald-500 text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Validate Idea
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                  
                  {error && <p className="text-red-400 mt-4 text-sm absolute -bottom-8 left-0 right-0">{error}</p>}
                </motion.form>

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-xl mx-auto mt-12 bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-6 text-left"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-300 font-medium">Validating your idea...</span>
                        <span className="text-neutral-300 font-medium">{Math.min(99, Math.round(((loadingStep + 1) / loadingStepsData.length) * 100))}%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full mb-6 overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-500 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${Math.min(99, ((loadingStep + 1) / loadingStepsData.length) * 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      <div className="space-y-1 mb-6">
                        {loadingStepsData.map((step, index) => {
                          const isCompleted = index < loadingStep;
                          const isActive = index === loadingStep;
                          const isPending = index > loadingStep;
                          
                          return (
                            <div 
                              key={step.id} 
                              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                                isActive ? 'bg-emerald-500/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' : ''
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                {isActive && <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />}
                                {isPending && <step.icon className="w-5 h-5 text-neutral-600" />}
                              </div>
                              <span className={`font-medium ${
                                isActive ? 'text-emerald-400' : 
                                isCompleted ? 'text-neutral-400' : 
                                'text-neutral-600'
                              }`}>
                                {step.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-6 border-t border-neutral-800/50">
                        <div className="flex items-center gap-2 mb-4 text-emerald-400">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-bold tracking-[0.2em] uppercase">Explore while you wait</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" className="px-4 py-1.5 bg-emerald-500 text-neutral-950 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-colors">
                            <Sparkles className="w-4 h-4" /> All
                          </button>
                          <button type="button" className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-emerald-500/20 transition-colors">
                            <Calculator className="w-4 h-4" /> Calculators
                          </button>
                          <button type="button" className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-emerald-500/20 transition-colors">
                            <List className="w-4 h-4" /> Lists
                          </button>
                          <button type="button" className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-emerald-500/20 transition-colors">
                            <BookOpen className="w-4 h-4" /> Guides
                          </button>
                          <button type="button" className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-emerald-500/20 transition-colors">
                            <Wrench className="w-4 h-4" /> Tools
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="features"
                      variants={itemVariants} 
                      className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-neutral-800/50 mt-16"
                    >
                      {[
                        { icon: BarChart3, label: 'Market Analysis' },
                        { icon: Users, label: 'Competitor SWOT' },
                        { icon: Target, label: 'Business Model' },
                        { icon: CheckCircle, label: 'Action Plan' },
                      ].map((feature, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ y: -5 }}
                          className="flex flex-col items-center gap-3 text-neutral-400 hover:text-neutral-200 transition-colors cursor-default"
                        >
                          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-lg">
                            <feature.icon className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-medium">{feature.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full"
              >
                <ValidationReport result={result} />
                <div className="mt-8 text-center flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setResult(null)}
                    className="px-6 py-3 text-sm font-medium text-neutral-300 hover:text-neutral-50 bg-neutral-900 border border-neutral-800 rounded-xl transition-colors shadow-lg flex items-center gap-2 w-fit"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Test Another Idea
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
            >
              <span className="text-sm font-medium uppercase tracking-widest">Discover More</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.div>
          )}
        </section>

        {!result && (
          <>
        {/* Integrations Marquee */}
        <section className="py-16 border-t border-neutral-800/50 bg-neutral-900/20 backdrop-blur-sm relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
            <p className="text-sm font-bold tracking-widest text-neutral-500 uppercase">Export and integrate with your favorite tools</p>
          </div>
          
          <div className="relative flex overflow-hidden">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex items-center gap-16 py-4 whitespace-nowrap w-max"
            >
              {[...Array(2)].map((_, arrayIndex) => (
                <React.Fragment key={arrayIndex}>
                  {[
                    { icon: FileText, name: "Notion" },
                    { icon: MessageSquare, name: "Slack" },
                    { icon: Box, name: "Linear" },
                    { icon: Database, name: "Airtable" },
                    { icon: Cloud, name: "Google Drive" },
                    { icon: FileText, name: "Confluence" },
                    { icon: Box, name: "Jira" },
                  ].map((integration, i) => (
                    <div key={`${arrayIndex}-${i}`} className="flex items-center gap-3 text-neutral-400 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                      <integration.icon className="w-8 h-8" />
                      <span className="text-2xl font-bold">{integration.name}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
          
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 border-t border-neutral-800/50 relative z-10 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">How Validify Works</h2>
              <p className="text-lg text-neutral-400">From a shower thought to a comprehensive business strategy in three simple steps.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 z-0"></div>
              {[
                { icon: MessageSquare, title: "1. Describe your vision", desc: "Just type a few sentences about what you want to build and who it's for. No complex forms." },
                { icon: Zap, title: "2. AI crunches the data", desc: "Our models analyze market trends, search volume, and competitor databases in real-time." },
                { icon: ShieldCheck, title: "3. Get your blueprint", desc: "Receive a comprehensive report with market sizing, SWOT, and actionable next steps." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-neutral-900 border-4 border-neutral-950 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[spin_10s_linear_infinite]"></div>
                    <step.icon className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-lg">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-32 border-t border-neutral-800/50 relative z-10 bg-neutral-950 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">A command center for your ideas</h2>
              <p className="text-lg text-neutral-400">Manage, compare, and track the evolution of your startup concepts all in one place.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10 pointer-events-none h-full w-full"></div>
              <div className="rounded-t-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-md overflow-hidden shadow-2xl">
                <div className="h-12 border-b border-neutral-800 flex items-center px-4 gap-2 bg-neutral-950/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="mx-auto bg-neutral-900 border border-neutral-800 rounded-md px-12 md:px-32 py-1 text-xs text-neutral-500 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" />
                    app.ideaproof.co
                  </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6 opacity-80">
                  <div className="hidden md:block col-span-3 space-y-4">
                    <div className="h-8 bg-neutral-800 rounded-md w-3/4"></div>
                    <div className="h-4 bg-neutral-800 rounded-md w-1/2"></div>
                    <div className="h-4 bg-neutral-800 rounded-md w-2/3"></div>
                    <div className="h-4 bg-neutral-800 rounded-md w-1/2"></div>
                    <div className="h-4 bg-neutral-800 rounded-md w-3/4"></div>
                  </div>
                  <div className="col-span-1 md:col-span-9 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="h-10 bg-neutral-800 rounded-md w-1/3"></div>
                      <div className="h-10 bg-emerald-500/20 rounded-md w-32 border border-emerald-500/30"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="h-24 bg-neutral-800 rounded-xl"></div>
                      <div className="h-24 bg-neutral-800 rounded-xl"></div>
                      <div className="h-24 bg-neutral-800 rounded-xl"></div>
                    </div>
                    <div className="h-64 bg-neutral-800 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 border-t border-neutral-800/50 bg-neutral-900/20 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Validate faster. Build smarter.</h2>
              <p className="text-lg text-neutral-400">Everything you need to know about your market, competitors, and business model before you write a single line of code.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "AI-Powered Analysis", desc: "Our advanced models analyze millions of data points to give you accurate market insights." },
                { icon: Globe, title: "Global Market Sizing", desc: "Get realistic TAM, SAM, and SOM estimates based on current industry trends and data." },
                { icon: TrendingUp, title: "Growth Roadmaps", desc: "Receive actionable, step-by-step plans to take your idea from concept to first customer." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-10 hover:border-emerald-500/30 transition-colors shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20">
                    <feature.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-lg">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-32 relative z-10 bg-neutral-950 border-t border-neutral-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built for every stage of growth</h2>
              <p className="text-lg text-neutral-400">Whether you're a solo hacker or an enterprise product team, Validify scales with your ambition.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Briefcase, title: "Solo Founders", desc: "Validate your weekend projects before spending months coding the wrong thing." },
                { icon: Code, title: "Product Teams", desc: "Back up your feature pitches with hard data and comprehensive market analysis." },
                { icon: LineChart, title: "Investors", desc: "Quickly screen pitch decks and validate market sizes during due diligence." },
                { icon: Building, title: "Agencies", desc: "Provide instant value to clients by validating their app ideas on day one." }
              ].map((useCase, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-8 hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-6 border border-neutral-700">
                    <useCase.icon className="w-6 h-6 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-neutral-100">{useCase.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{useCase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Stats Section */}
        <section className="py-32 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border border-neutral-800 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/grid/1920/1080')] opacity-5 mix-blend-overlay pointer-events-none"></div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-12">Join 10,000+ founders validating ideas daily</h2>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                  <div className="space-y-3">
                    <h4 className="text-5xl md:text-6xl font-black text-emerald-400 tracking-tighter">50k+</h4>
                    <p className="text-neutral-400 font-medium text-lg uppercase tracking-widest">Ideas Validated</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-5xl md:text-6xl font-black text-blue-400 tracking-tighter">$2M+</h4>
                    <p className="text-neutral-400 font-medium text-lg uppercase tracking-widest">Saved in Dev Costs</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-5xl md:text-6xl font-black text-purple-400 tracking-tighter">120s</h4>
                    <p className="text-neutral-400 font-medium text-lg uppercase tracking-widest">Average Report Time</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials / Wall of Love */}
        <section id="testimonials" className="py-32 border-t border-neutral-800/50 relative z-10 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Wall of Love</h2>
              <p className="text-lg text-neutral-400">Don't just take our word for it. See what other founders are saying.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Jenkins", role: "Solo Founder", text: "Validify saved me 3 months of building the wrong thing. The competitor SWOT was spot on and helped me pivot early.", img: "https://picsum.photos/seed/sarah/100/100" },
                { name: "Marcus Torres", role: "Product Manager", text: "I use this for every new feature pitch. The TAM/SAM/SOM breakdown is incredibly accurate and impresses stakeholders.", img: "https://picsum.photos/seed/marcus/100/100" },
                { name: "Elena Rodriguez", role: "Startup Advisor", text: "I make all my mentees run their ideas through this first. It's like having a McKinsey consultant on speed dial.", img: "https://picsum.photos/seed/elena/100/100" }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-8 relative"
                >
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-lg leading-relaxed mb-8">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-neutral-800" />
                    <div>
                      <h4 className="font-bold text-neutral-200">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section className="py-32 border-t border-neutral-800/50 relative z-10 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing</h2>
              <p className="text-lg text-neutral-400">Start validating for free, upgrade when you need more power.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-8 flex flex-col"
              >
                <h3 className="text-xl font-bold text-neutral-200 mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">₹0</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['3 Idea Validations / mo', 'Basic Market Sizing', 'Top 3 Competitors', 'Standard Support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-300">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-center transition-colors">
                  Start Validating
                </button>
              </motion.div>

              {/* Pro */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
                className="bg-neutral-900 border-2 border-emerald-500/50 rounded-3xl p-8 flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.1)]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-emerald-400 mb-2">Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">₹2,400</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Unlimited Validations', 'Deep Market Analysis', 'Full Competitor SWOT', 'Export to PDF/Notion', 'Priority Support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-300">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-center transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  Upgrade to Pro
                </Link>
              </motion.div>

              {/* Enterprise */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-8 flex flex-col"
              >
                <h3 className="text-xl font-bold text-neutral-200 mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">₹8,200</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Everything in Pro', 'Custom API Access', 'Team Collaboration', 'White-label Reports', 'Dedicated Account Manager'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-300">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className="w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-center transition-colors">
                  View All Plans
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 border-t border-neutral-800/50 bg-neutral-900/20 backdrop-blur-sm relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-neutral-400">Everything you need to know about Validify.</p>
            </motion.div>

            <div className="space-y-4">
              <FAQItem 
                question="How accurate is the market sizing data?" 
                answer="Our AI models are trained on real-time industry reports, census data, and financial filings. While it provides an estimate, it is highly accurate for initial validation and pitch decks." 
              />
              <FAQItem 
                question="Is my startup idea kept confidential?" 
                answer="Absolutely. We do not store your ideas or use them to train our models. Your data is encrypted in transit and discarded immediately after your report is generated." 
              />
              <FAQItem 
                question="Can I export the report to share with investors?" 
                answer="Yes! Pro and Enterprise users can export their full validation reports as polished, investor-ready PDFs with a single click." 
              />
              <FAQItem 
                question="What if my idea is in a very niche market?" 
                answer="Our AI is excellent at extrapolating data for niche markets by analyzing adjacent industries and micro-trends. It will highlight the specific assumptions it makes for transparency." 
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative z-10 overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tight">Ready to stop guessing?</h2>
              <p className="text-2xl text-neutral-400 max-w-2xl mx-auto">
                Join thousands of founders who validate their ideas before writing a single line of code.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="mt-8 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xl font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3 mx-auto"
              >
                Validate Your Idea Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-neutral-800/50 bg-neutral-950 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Rocket className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="font-bold text-2xl tracking-tight">Validify</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-base font-medium text-neutral-400">
              <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How it works</a>
              <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Wall of Love</a>
              <Link to="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link>
            </div>
            <div className="flex gap-6 text-sm text-neutral-600">
              <a href="#" className="hover:text-neutral-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">Privacy</a>
              <span>© 2026 Validify.</span>
            </div>
          </div>
        </footer>
          </>
        )}
      </main>
      </div>
    </div>
  );
}
