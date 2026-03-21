import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Mail, Lock, ArrowRight, Loader2, ArrowLeft, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }, 1500);
  };

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

      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="w-full max-w-md"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-3xl -z-10 opacity-50"></div>
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  {isSignUp ? 'Create an account' : 'Welcome back'}
                </h1>
                <p className="text-neutral-400">
                  {isSignUp ? 'Sign up to start validating your ideas' : 'Sign in to access your saved reports'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <AnimatePresence>
                  {isSignUp && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <label className="text-sm font-medium text-neutral-300 ml-1">Full Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-neutral-500 group-focus-within:text-emerald-400 transition-colors" />
                        </div>
                        <input
                          type="text"
                          required={isSignUp}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-neutral-950/50 border border-neutral-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-neutral-50 placeholder-neutral-600 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="John Doe"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-neutral-500 group-focus-within:text-emerald-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-950/50 border border-neutral-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-neutral-50 placeholder-neutral-600 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-medium text-neutral-300">Password</label>
                    {!isSignUp && (
                      <a href="#" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-neutral-500 group-focus-within:text-emerald-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-950/50 border border-neutral-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-neutral-50 placeholder-neutral-600 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !email || !password || (isSignUp && !name)}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-8"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center text-sm text-neutral-400">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button type="button" onClick={() => setIsSignUp(false)} className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setIsSignUp(true)} className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                      Sign up for free
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
