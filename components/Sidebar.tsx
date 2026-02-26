import React from 'react';
import { X, User, Clock, Settings, LogOut, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div 
        className={`absolute top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header / Profile Section */}
        <div className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-20">
              <User size={100} />
           </div>
           
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
           >
             <X size={20} />
           </button>

           <div className="relative z-10 mt-4">
              <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg mb-3">
                 <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User size={32} />
                 </div>
              </div>
              <h2 className="text-xl font-bold">游客用户</h2>
              <p className="text-teal-100 text-xs mt-1">ID: 8839201</p>
           </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
           <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">功能</div>
           
           <button className="w-full px-6 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-slate-700 group">
              <Clock className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
              <span className="font-medium">历史对话</span>
              <ChevronRight className="w-4 h-4 ml-auto text-slate-300" />
           </button>

           <button className="w-full px-6 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-slate-700 group">
              <Settings className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
              <span className="font-medium">设置</span>
              <ChevronRight className="w-4 h-4 ml-auto text-slate-300" />
           </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
           <button className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-medium">
              <LogOut size={16} />
              退出登录
           </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
