import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { AGENTS, HERO_CARDS } from '../utils/constants';

interface AgentsListViewProps {
  onBack: () => void;
  onAgentSelect: (agentId: string) => void;
}

const AgentsListView: React.FC<AgentsListViewProps> = ({ onBack, onAgentSelect }) => {
  // Defensive checks
  if (!AGENTS) return <div className="p-10 text-center text-slate-500">Loading agents...</div>;
  if (!HERO_CARDS) return <div className="p-10 text-center text-slate-500">Loading data...</div>;

  return (
    <div className="absolute inset-0 bg-slate-50 z-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 z-20 bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-100 shrink-0">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-slate-800">专业分身</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="grid grid-cols-1 gap-4">
          {AGENTS.map((agent) => {
            const heroData = HERO_CARDS.find(h => h.id === agent.id);
            const description = heroData?.description || agent.description || "暂无描述";
            
            return (
              <button
                key={agent.id}
                onClick={() => onAgentSelect(agent.id)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start gap-4 text-left transition-transform active:scale-[0.98] w-full group"
              >
                <div className="w-16 h-16 rounded-full border border-slate-100 overflow-hidden shrink-0 bg-slate-50 group-hover:border-teal-200 transition-colors">
                   <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors">{agent.name}</h3>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold mt-1">
                            {agent.role}
                        </span>
                      </div>
                      <div className="flex text-amber-400 gap-0.5">
                         <Star className="w-3.5 h-3.5 fill-current" />
                         <span className="text-xs font-bold text-slate-400 ml-1">4.9</span>
                      </div>
                   </div>
                   
                   <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {description}
                   </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentsListView;
