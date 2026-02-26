import React from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { AGENTS } from '../utils/constants';

interface TopAgentBarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onAgentsClick: () => void;
  onAgentClick: (agentId: string) => void;
}

const TopAgentBar: React.FC<TopAgentBarProps> = ({ isCollapsed, onToggleCollapse, onAgentsClick, onAgentClick }) => {
  
  // Get first 4 agents for direct display
  const topAgents = AGENTS.slice(0, 4);

  return (
    <div className="w-full relative transition-all duration-300 ease-in-out">
      {/* Collapse Toggle Handle (Visible when collapsed) */}
      {isCollapsed && (
        <div 
          onClick={onToggleCollapse}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm border border-white/50 px-3 py-0.5 rounded-b-xl shadow-sm cursor-pointer z-30 flex items-center gap-1"
        >
           <span className="text-[10px] font-bold text-slate-500">展开</span>
           <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>
      )}
      
      <div className={`w-full overflow-x-auto no-scrollbar py-4 px-4 transition-all duration-300 ${isCollapsed ? 'h-0 py-0 opacity-0 pointer-events-none' : 'h-auto opacity-100'}`}>
        <div className="flex justify-between items-center w-full">
          
          {/* Individual Top Agents */}
          {topAgents.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => onAgentClick(agent.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group transition-transform active:scale-95"
            >
               <div className="w-12 h-12 rounded-full p-0.5 border-2 border-white bg-slate-50 flex items-center justify-center shadow-md group-hover:border-teal-200 transition-colors relative overflow-hidden">
                  <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover rounded-full" />
               </div>
               <span className="text-[10px] font-bold text-slate-700 group-hover:text-teal-700">{agent.name}</span>
            </div>
          ))}

          {/* Divider */}
          <div className="w-px h-8 bg-slate-200 self-center mx-1"></div>

          {/* All Agents Button */}
          <div 
            onClick={onAgentsClick}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group transition-transform active:scale-95"
          >
             <div className="w-12 h-12 rounded-full p-0.5 border-2 border-dashed border-indigo-300 bg-indigo-50 flex items-center justify-center shadow-md group-hover:bg-indigo-100 transition-colors relative">
                <MoreHorizontal className="w-5 h-5 text-indigo-500" />
                <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-white">
                    {AGENTS.length}位
                </div>
             </div>
             <span className="text-[10px] font-bold text-indigo-700">全部</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAgentBar;
