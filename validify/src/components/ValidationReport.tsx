import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, CheckCircle, XCircle, ChevronRight, TrendingUp, BarChart3,
  Target, Globe, Calendar, DollarSign, Lock, AlertCircle, Check, ArrowUpRight
} from 'lucide-react';

export default function ValidationReport({ result }: { result: any }) {
  const tabs = ['Summary', 'Scores', 'Market', 'Financials', 'Roadmap', 'Journey'];
  const [activeTab, setActiveTab] = useState('Summary');

  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score > 66) return 'text-red-500 border-red-500';
      if (score > 33) return 'text-yellow-500 border-yellow-500';
      return 'text-emerald-500 border-emerald-500';
    }
    if (score > 66) return 'text-emerald-500 border-emerald-500';
    if (score > 33) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  const ProgressBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-neutral-400">{label}</span>
        <span className={`text-sm font-bold ${colorClass.split(' ')[0]}`}>{value}/100</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${colorClass.split(' ')[0].replace('text-', 'bg-')} rounded-full`}
        />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto space-y-6 pb-24"
    >
      {/* Top Header Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-3xl font-black text-white tracking-tight">Validation Report</h2>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3" /> Ready
                </span>
                <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-md text-xs font-bold uppercase tracking-wider">
                  • STEP 1/3
                </span>
                <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 3-6 months
                </span>
              </div>
            </div>
            <p className="text-neutral-400 leading-relaxed text-sm max-w-3xl">
              {result.tagline}
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getScoreColor(result.risk_score, true)}`}>
                  {result.risk_score}
                </div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Risk</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getScoreColor(result.diff_score)}`}>
                  {result.diff_score}
                </div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Diff</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getScoreColor(result.conf_score)}`}>
                  {result.conf_score}
                </div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Conf</span>
              </div>
            </div>
            
            <div className="w-px h-12 bg-neutral-800 hidden md:block"></div>
            
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" fill="transparent" stroke="#262626" strokeWidth="8" />
                  <circle 
                    cx="40" cy="40" r="36" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeDasharray={226} 
                    strokeDashoffset={226 - (226 * result.final_score) / 100} 
                    className={result.final_score > 66 ? 'text-emerald-500' : result.final_score > 33 ? 'text-yellow-500' : 'text-red-500'} 
                  />
                </svg>
                <span className="text-2xl font-black">{result.final_score}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Score</span>
                <span className="text-xs text-neutral-600">/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg p-1.5 flex gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-neutral-800 text-white shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
            }`}
          >
            {tab === 'Summary' && <TrendingUp className="w-4 h-4" />}
            {tab === 'Scores' && <BarChart3 className="w-4 h-4" />}
            {tab === 'Market' && <Globe className="w-4 h-4" />}
            {tab === 'Financials' && <DollarSign className="w-4 h-4" />}
            {tab === 'Roadmap' && <Target className="w-4 h-4" />}
            {tab === 'Journey' && <Activity className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Placeholder */}
      <div className="min-h-[500px]">
        {activeTab === 'Summary' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-2xl font-bold">Executive Summary</h3>
                </div>
                <div className="prose prose-invert prose-emerald">
                  <p className="text-neutral-300 leading-relaxed text-lg mb-8">
                    {result.solution}
                  </p>
                  
                  <h4 className="text-neutral-100 font-bold mb-4">Key Recommendations</h4>
                  <ul className="space-y-4">
                    {result.nextSteps.length > 0 ? result.nextSteps.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-emerald-500 font-bold">{i + 1}.</span>
                        <span className="text-neutral-400 leading-relaxed">{step}</span>
                      </li>
                    )) : (
                      <li className="text-neutral-400">Expand market analysis logic needed.</li>
                    )}
                  </ul>
                </div>

                <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🚀</div>
                    <div>
                      <h5 className="font-bold text-emerald-400 text-lg">Excellent potential!</h5>
                      <p className="text-emerald-500/70 text-sm">You're among the top ideas we've seen. Let's dive deeper.</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('Market')} className="px-4 py-2 bg-emerald-500 text-neutral-900 rounded-lg font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 whitespace-nowrap">
                    Market Analysis <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <CheckCircle className="w-24 h-24 text-emerald-500" />
                </div>
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-emerald-400 uppercase tracking-widest text-sm">Green Lights</h3>
                </div>
                <ul className="space-y-4 relative z-10">
                  {result.green_lights.map((light: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 leading-relaxed">{light}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <XCircle className="w-24 h-24 text-red-500" />
                </div>
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="font-bold text-red-400 uppercase tracking-widest text-sm">Red Flags</h3>
                </div>
                <ul className="space-y-4 relative z-10">
                  {result.red_flags.map((flag: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 leading-relaxed">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Scores' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
                <BarChart3 className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-bold">Scores & Analysis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-bold border-b border-neutral-800 pb-2 mb-6">Market Factors</h4>
                  <ProgressBar label="Target Market Clarity" value={result.scores?.market_clarity || 68} colorClass="text-emerald-500" />
                  <ProgressBar label="Market Timing" value={result.scores?.market_timing || 80} colorClass="text-emerald-500" />
                  <ProgressBar label="Market Entry Barriers" value={result.scores?.market_entry || 55} colorClass="text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold border-b border-neutral-800 pb-2 mb-6">Execution Factors</h4>
                  <ProgressBar label="MVP Viability" value={result.scores?.mvp_viability || 65} colorClass="text-emerald-500" />
                  <ProgressBar label="Value Proposition" value={result.scores?.value_prop || 70} colorClass="text-emerald-500" />
                  <ProgressBar label="Initial Feasibility" value={result.scores?.initial_feasibility || 60} colorClass="text-yellow-500" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Strengths / Concerns similar to green lights */}
               <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-lg">Key Strengths</h3>
                </div>
                <ul className="space-y-4">
                  {result.swot.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="font-bold text-white text-lg">Areas of Concern</h3>
                </div>
                <ul className="space-y-4">
                  {result.swot.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Market' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
               <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
                <Globe className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-bold">Market & Competition</h3>
               </div>
               
               <div className="flex flex-col md:flex-row items-center gap-12 bg-neutral-950 p-6 rounded-xl border border-neutral-800 mb-8">
                  <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-500/50 mb-20">TAM</div>
                    <div className="absolute inset-4 rounded-full border-2 border-emerald-400/40 bg-emerald-400/5 flex items-center justify-center text-[10px] text-emerald-400/70 mb-12">SAM</div>
                    <div className="absolute inset-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                      <span className="font-bold text-neutral-950 text-xs">SOM</span>
                    </div>
                  </div>
                  <div className="space-y-6 w-full">
                    <div className="grid grid-cols-[60px_1fr] items-start gap-4">
                      <span className="text-emerald-500/50 font-bold text-sm pt-1">TAM</span>
                      <p className="text-neutral-200 font-bold">{result.tam}</p>
                    </div>
                    <div className="grid grid-cols-[60px_1fr] items-start gap-4">
                      <span className="text-emerald-400/70 font-bold text-sm pt-1">SAM</span>
                      <p className="text-emerald-100/70 leading-relaxed font-medium">{result.sam}</p>
                    </div>
                    <div className="grid grid-cols-[60px_1fr] items-start gap-4">
                      <span className="text-emerald-400 font-bold text-sm pt-1">SOM</span>
                      <p className="text-emerald-400 font-bold">{result.som}</p>
                    </div>
                  </div>
               </div>

               <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 space-y-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-lg">Market Stage</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-neutral-800 pb-6">
                    <div>
                      <span className="block text-xs text-neutral-500 uppercase font-bold mb-2">Market Maturity</span>
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-bold uppercase tracking-wider">{result.market_stage || 'GROWING'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center">
                      <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest block mb-4">Growth (CAGR)</span>
                      <span className="text-2xl font-black">{result.cagr || '12.5%'}</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center">
                      <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest block mb-4">Break-Even</span>
                      <span className="text-xl font-bold text-neutral-300">{result.financials?.break_even || '18-24 months'}</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center">
                      <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest block mb-4">Startup Costs</span>
                      <span className="text-xl font-bold text-neutral-300">{result.financials?.startup_costs || '$50,000+'}</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'Financials' && (
          <div className="space-y-6">
             <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl">
               <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
                <DollarSign className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-bold">Financials & Risks</h3>
               </div>
               
               <div className="space-y-6">
                 <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-5 h-5 text-emerald-400 bg-emerald-500/10 p-1 rounded-full" />
                    <h4 className="font-bold text-lg">Unit Economics</h4>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   <div className="bg-neutral-800 p-6 rounded-xl shadow-inner border border-neutral-700 text-center flex flex-col justify-center">
                     <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-2">Startup Costs</span>
                     <span className="font-bold text-neutral-200">{result.financials?.startup_costs}</span>
                   </div>
                   <div className="bg-red-500/5 p-6 rounded-xl shadow-inner border border-red-500/20 text-center flex flex-col justify-center">
                     <span className="text-[10px] text-red-500/70 font-bold uppercase tracking-wider mb-2">CAC</span>
                     <span className="font-bold text-red-400">{result.financials?.cac || '$15-$35'}</span>
                   </div>
                   <div className="bg-emerald-500/5 p-6 rounded-xl shadow-inner border border-emerald-500/20 text-center flex flex-col justify-center">
                     <span className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-wider mb-2">LTV</span>
                     <span className="font-bold text-emerald-400">{result.financials?.ltv || '$150-$400'}</span>
                   </div>
                   <div className="bg-blue-500/5 p-6 rounded-xl shadow-inner border border-blue-500/20 text-center flex flex-col justify-center">
                     <span className="text-[10px] text-blue-500/70 font-bold uppercase tracking-wider mb-2">LTV/CAC</span>
                     <span className="font-bold text-blue-400">{result.financials?.ltv_cac_ratio || '3:1+'}</span>
                   </div>
                 </div>

                 <div className="pt-6">
                   <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-3 block">Revenue Models</span>
                   <div className="flex flex-wrap gap-2">
                     {result.revenue_models?.map((model: string, i: number) => (
                       <span key={i} className="px-3 py-1.5 bg-neutral-800 text-emerald-300 rounded-lg text-sm">{model}</span>
                     )) || <span className="text-neutral-500">{result.businessModel}</span>}
                   </div>
                 </div>

                 <div className="pt-6">
                   <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-3 block">Monetization Strategy</span>
                   <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-lg text-neutral-300 text-sm leading-relaxed">
                     Primary monetization will be achieved through {result.businessModel}. Optimizing for high retention and increasing LTV over time will be critical to offset initial CAC.
                   </div>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Lock sections for tabs not yet fully implemented or out of scope of exact screenshots */}
        {['Roadmap', 'Journey'].includes(activeTab) && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-16 shadow-xl text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 border border-neutral-700">
              <Lock className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Detailed {activeTab} Locked</h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              Upgrade to Premium Insights to access comprehensive step-by-step implementation plans and user journey mapping.
            </p>
            <button className="mt-8 px-6 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-400 transition-colors">
              Unlock the Full Report
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
