import React, { useState } from 'react';
import { Mic, ArrowUp, Grid, RefreshCw, Map, ShoppingBag } from 'lucide-react';
import ServicesModal from './ServicesModal';

interface BottomInteractionProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  minimal?: boolean; // If true, hides the chips for a cleaner chat view
  isInsideScenic: boolean;
  onToggleScenic: () => void;
  onSmartGuideClick?: () => void;
  onMallClick?: () => void;
}

const BottomInteraction: React.FC<BottomInteractionProps> = ({ 
  onSendMessage, 
  isProcessing, 
  inputValue, 
  onInputChange, 
  placeholder, 
  minimal = false,
  isInsideScenic,
  onToggleScenic,
  onSmartGuideClick,
  onMallClick
}) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSendMessage(inputValue);
      onInputChange("");
    }
  };

  // Unified Button Style Component
  const ActionButton = ({ icon: Icon, label, onClick, active = false, variant = 'default', iconColor }: any) => {
    const baseClass = "h-9 px-3.5 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95 shadow-sm border backdrop-blur-md whitespace-nowrap";
    
    const variants = {
      default: "bg-white/90 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800",
      primary: "bg-slate-800 border-slate-800 text-white hover:bg-slate-700",
      highlight: "bg-teal-50/90 border-teal-200 text-teal-700 hover:bg-teal-100",
      orange: "bg-orange-50/90 border-orange-200 text-orange-700 hover:bg-orange-100",
      subtle: "bg-transparent border-transparent text-slate-400 hover:text-slate-600 shadow-none opacity-60 hover:opacity-100 scale-90 origin-left",
      premium: "bg-gradient-to-b from-sky-50 to-white border-blue-100 text-slate-700 hover:shadow-md hover:from-sky-100 hover:to-white"
    };

    const className = `${baseClass} ${variants[variant as keyof typeof variants]}`;

    return (
      <button onClick={onClick} className={className}>
        <Icon className={`w-3.5 h-3.5 ${active ? 'animate-spin-slow' : ''} ${iconColor || ''}`} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Positioned at the very bottom */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 pointer-events-none transition-all duration-300 pb-6 bg-gradient-to-t from-white via-white/90 to-transparent pt-10`}>
         {/* Container */}
        <div className="w-full relative h-full flex flex-col justify-end px-4">
          
          {/* Controls Row (Toggle & All Services) - Hidden in minimal mode */}
          {!minimal && (
              <div className="flex items-center justify-between mb-3 pointer-events-auto overflow-x-auto no-scrollbar gap-2 px-1">
                 <div className="flex items-center gap-2">
                    {/* Toggle Button */}
                    <ActionButton 
                      icon={RefreshCw} 
                      label={isInsideScenic ? "内" : "外"} 
                      onClick={onToggleScenic}
                      active={false} // Removed rotation animation logic for simplicity in reusable component, or can add back if needed
                      variant="subtle"
                    />
                 </div>

                 <div className="flex items-center gap-2">
                    {/* Smart Guide */}
                    <ActionButton 
                      icon={Map} 
                      label="导览" 
                      onClick={onSmartGuideClick} 
                      variant="premium"
                      iconColor="text-orange-400"
                    />

                    {/* Mall */}
                    <ActionButton 
                      icon={ShoppingBag} 
                      label="商城" 
                      onClick={onMallClick} 
                      variant="premium"
                      iconColor="text-blue-400"
                    />

                    {/* All Services Button */}
                    <ActionButton 
                      icon={Grid} 
                      label="服务中心" 
                      onClick={() => setIsServicesOpen(true)} 
                      variant="premium"
                      iconColor="text-purple-400"
                    />
                 </div>
              </div>
          )}

          {/* Input Bar */}
          <div className={`relative pointer-events-auto shadow-card rounded-full bg-white/95 backdrop-blur-xl border border-white/50 p-1.5 flex items-center gap-2 z-20 ${minimal ? 'shadow-lg border-teal-100' : ''}`}>
              <button className="w-10 h-10 rounded-full bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-sm">
                  <Mic className="w-5 h-5" />
              </button>
              
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isProcessing ? "思考中..." : (placeholder || "通天河漂流怎么走～")}
                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm font-medium h-9 px-2"
                disabled={isProcessing}
              />

              <button 
                onClick={() => inputValue.trim() && onSendMessage(inputValue)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  inputValue.trim() ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-300'
                }`}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
          </div>
        </div>
      </div>

      <ServicesModal isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </>
  );
};

export default BottomInteraction;