import React from 'react';
import { X } from 'lucide-react';
import { AGENTS } from '../utils/constants';

interface AgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentSelect: (agentId: string) => void;
}

const AgentsModal: React.FC<AgentsModalProps> = ({ isOpen, onClose, onAgentSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up-modal">
        {/* Header */}
        <div className="p-6 pb-2 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">专业分身</h2>
            <p className="text-xs text-slate-500 mt-1">选择您需要的专业服务助手</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => {
                onAgentSelect(agent.id);
                onClose();
              }}
              className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-slate-50 transition-colors active:scale-95"
            >
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-slate-100 group-hover:border-teal-400 transition-colors shadow-sm relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                   <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                {/* Role Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-slate-100 text-slate-600 group-hover:text-teal-600 group-hover:border-teal-100">
                    {agent.role.split(' ')[0]}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-teal-700 transition-colors">
                {agent.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slide-up-modal {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-slide-up-modal {
          animation: slide-up-modal 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AgentsModal;
