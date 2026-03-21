import React from 'react';
import { 
  Plus, CheckCircle, PieChart, Lock, Star, MoreVertical, Search, Wallet, Rocket
} from 'lucide-react';

interface SidebarProps {
  onNewIdea: () => void;
  history: any[];
  onSelectHistory: (item: any) => void;
}

export default function Sidebar({ onNewIdea, history, onSelectHistory }: SidebarProps) {
  return (
    <div className="w-80 bg-neutral-950 border-r border-neutral-900 h-screen flex flex-col flex-shrink-0 text-neutral-300 relative z-50">
      
      {/* Top Logo */}
      <div className="p-6 flex items-center justify-between">
        <button className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Rocket className="w-5 h-5 text-neutral-950" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Validify</span>
        </button>
      </div>

      <div className="px-4 mb-6">
        <button 
          onClick={onNewIdea}
          className="w-full flex items-center justify-between bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3 px-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Validate new idea</span>
          </div>
          <span className="bg-emerald-600/20 text-emerald-950 px-2 py-0.5 rounded text-xs">20cr</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 pl-4 pr-4">
        {/* JOURNEY */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 px-2">
            <span>Journey</span>
            <span>1/6 </span>
          </div>
          <p className="text-xs text-neutral-600 mb-4 px-2">From idea to launch, step by step</p>
          
          <div className="flex gap-1 mb-4 px-2">
            <div className="h-1 bg-emerald-500 rounded-full flex-1"></div>
            <div className="h-1 bg-neutral-800 rounded-full flex-1"></div>
            <div className="h-1 bg-neutral-800 rounded-full flex-1"></div>
            <div className="h-1 bg-neutral-800 rounded-full flex-1"></div>
            <div className="h-1 bg-neutral-800 rounded-full flex-1"></div>
            <div className="h-1 bg-neutral-800 rounded-full flex-1"></div>
          </div>

          <div className="space-y-0.5 relative">
             <div className="absolute left-[19px] top-6 bottom-6 w-px bg-neutral-800"></div>
             
             <div className="relative flex items-center justify-between p-3 bg-neutral-900 border border-emerald-500/50 rounded-xl z-10">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                   <CheckCircle className="w-3 h-3 text-neutral-950" />
                 </div>
                 <span className="text-emerald-400 font-bold text-sm">Idea Validation</span>
               </div>
               <PieChart className="w-4 h-4 text-emerald-400 opacity-50" />
             </div>

             <div className="relative flex items-center justify-between p-3 rounded-xl border border-transparent z-10">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                   <Star className="w-3 h-3 text-neutral-400" />
                 </div>
                 <span className="text-neutral-200 font-bold text-sm">Market Analysis</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="bg-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded text-neutral-400 uppercase">Next</span>
               </div>
             </div>

             <div className="relative flex items-center justify-between p-3 rounded-xl opacity-50 z-10">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center shrink-0">
                   <Lock className="w-3 h-3 text-neutral-600" />
                 </div>
                 <span className="text-neutral-500 font-bold text-sm">Business Plan</span>
               </div>
             </div>
             <div className="relative flex items-center justify-between p-3 rounded-xl opacity-50 z-10">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center shrink-0">
                   <Lock className="w-3 h-3 text-neutral-600" />
                 </div>
                 <span className="text-neutral-500 font-bold text-sm">Brand Strategy</span>
               </div>
             </div>
          </div>
        </div>

        <div className="h-px bg-neutral-900 mb-6"></div>

        {/* MY IDEAS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest pl-1 pr-1 px-2">
            <div className="flex items-center gap-2">
              <span>My Ideas</span>
              <span className="w-4 h-4 rounded-full border border-neutral-800 flex items-center justify-center text-[10px]">{history.length}</span>
            </div>
            <Search className="w-3 h-3" />
          </div>

          <div className="space-y-2">
            {history.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => onSelectHistory(item)}
                className="w-full bg-neutral-900/50 border border-neutral-800 p-3 rounded-xl flex items-center justify-between group hover:border-emerald-500/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center shrink-0 text-[10px] font-bold text-emerald-500">
                    1/6
                  </div>
                  <div className="truncate flex-1 min-w-0 pr-2">
                    <div className="font-bold text-neutral-200 text-sm truncate">{item.result?.name || item.idea.substring(0, 30) || 'New Idea'}</div>
                    <div className="text-[10px] text-neutral-500 truncate whitespace-nowrap">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Star className="w-4 h-4 text-neutral-500 hover:text-emerald-400" />
                  <MoreVertical className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
                </div>
              </button>
            ))}
            {history.length === 0 && (
              <div className="text-center p-4 border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-sm">
                No past ideas found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACCOUNT */}
      <div className="p-6 border-t border-neutral-900 space-y-4">
         <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Account</div>
         <button className="flex items-center gap-3 w-full text-neutral-300 hover:text-white mb-4">
           <Wallet className="w-5 h-5 cursor-pointer" />
           <span className="font-medium text-sm cursor-pointer">Buy Credits</span>
         </button>
         <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-xl border border-neutral-800">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold relative shrink-0">
               W
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full"></div>
             </div>
             <div className="overflow-hidden">
               <div className="font-bold text-sm text-white truncate">whotfparthuu</div>
               <div className="text-xs text-neutral-500">20 Credits</div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
