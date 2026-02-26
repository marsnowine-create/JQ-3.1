import React from 'react';
import { Menu, MoreHorizontal, RefreshCcw, Megaphone } from 'lucide-react';
import { SCENIC_NAME } from '../utils/constants';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  return (
    <header className="px-5 pt-6 pb-2 flex justify-between items-center z-20 relative text-slate-800">
      <div className="flex flex-col gap-2">
        <button 
          className="p-1 -ml-1"
          onClick={onOpenSidebar}
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{SCENIC_NAME}</h1>
          <button className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
            <RefreshCcw className="w-3 h-3 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/50 shadow-sm">
          <MoreHorizontal className="w-5 h-5 text-slate-700" />
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center">
            <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Notification Bar */}
        <div className="flex items-center gap-1.5 text-slate-600 bg-cyan-50/90 px-3 py-1.5 rounded-full border border-cyan-100 shadow-sm max-w-[160px]">
          <Megaphone className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20 shrink-0" />
          <span className="text-[10px] font-medium truncate">温馨提示：部分路段正在维护</span>
        </div>
      </div>
    </header>
  );
};

export default Header;