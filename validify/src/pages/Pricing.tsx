import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, ArrowLeft, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for solo founders testing their first ideas.",
      priceMonthly: "Free",
      priceAnnual: "Free",
      period: "",
      features: ["3 Idea Validations / month", "Basic Market Sizing", "Standard Support"],
      missing: ["Competitor SWOT", "Export to PDF", "API Access"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      desc: "For serial entrepreneurs and startup studios.",
      priceMonthly: "₹2,400",
      priceAnnual: "₹1,999",
      period: "/mo",
      features: ["Unlimited Validations", "Deep Competitor SWOT", "Export to PDF", "Priority Support"],
      missing: ["API Access"],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      desc: "For accelerators, VCs, and large organizations.",
      priceMonthly: "₹8,200",
      priceAnnual: "₹6,500",
      period: "/mo",
      features: ["Everything in Pro", "API Access", "Custom Branding", "Dedicated Account Manager"],
      missing: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-emerald-500/30 relative overflow-hidden flex flex-col">
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
      <header className="border-b border-neutral-800/50 bg-neutral-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-shadow">
              <Rocket className="w-5 h-5 text-neutral-950" />
            </div>
            <span className="font-bold text-xl tracking-tight">Validify</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Simple, transparent pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-xl text-neutral-400"
            >
              Choose the perfect plan for your startup journey.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="mt-10 flex items-center justify-center gap-4"
            >
              <span className={`text-sm font-medium ${!isAnnual ? 'text-neutral-50' : 'text-neutral-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)} 
                className="relative w-16 h-8 rounded-full bg-neutral-800 border border-neutral-700 p-1 transition-colors hover:bg-neutral-700"
              >
                <motion.div 
                  animate={{ x: isAnnual ? 32 : 0 }} 
                  className="w-6 h-6 rounded-full bg-emerald-500 shadow-lg" 
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-neutral-50' : 'text-neutral-400'}`}>
                Annually <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span>
              </span>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative bg-neutral-900/80 backdrop-blur-xl border ${plan.popular ? 'border-emerald-500' : 'border-neutral-800'} rounded-3xl p-8 shadow-2xl flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-neutral-400 text-sm mb-6 min-h-[40px]">{plan.desc}</p>
                <div className="mb-8 flex items-end gap-1">
                  <span className="text-5xl font-bold tracking-tight">{isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                  {plan.priceMonthly !== "Free" && <span className="text-neutral-400 mb-2">{plan.period}</span>}
                </div>
                <button className={`w-full py-3 rounded-xl font-bold transition-all mb-8 ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-50'}`}>
                  {plan.cta}
                </button>
                <div className="space-y-4 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-neutral-300">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map((m, j) => (
                    <div key={j} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-neutral-500 shrink-0" />
                      <span className="text-sm text-neutral-500">{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
