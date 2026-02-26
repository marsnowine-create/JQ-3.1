import React from 'react';
import { HeroCardData } from '../utils/constants';
import { ChevronRight, User, Users, Send } from 'lucide-react';

interface FeedCardProps {
  data: HeroCardData;
  onAction: (prompt: string) => void;
  isInitial?: boolean;
  isPush?: boolean;
  pushIndex?: number;
  showRecommendationHeader?: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({ data, onAction, isInitial = false, isPush = false, pushIndex = 0, showRecommendationHeader = false }) => {
  const { usefulInfo, actions, avatarUrl, name, description } = data;

  // Color mapping for text/icon highlights
  const themeColors = {
    green: { text: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'text-emerald-500' },
    yellow: { text: 'text-amber-600', bg: 'bg-amber-50', icon: 'text-amber-500' },
    red: { text: 'text-red-600', bg: 'bg-red-50', icon: 'text-red-500' },
    purple: { text: 'text-purple-600', bg: 'bg-purple-50', icon: 'text-purple-500' },
    blue: { text: 'text-blue-600', bg: 'bg-blue-50', icon: 'text-blue-500' },
  };

  const theme = themeColors[usefulInfo.color as keyof typeof themeColors] || themeColors.blue;
  const primaryAction = actions[0];

  // Chat Style Card (for pushed content)
  if (isPush) {
    return (
      <>
        {showRecommendationHeader && (
          <div className="flex flex-col items-center justify-center py-6 gap-2 animate-fade-in">
             <div className="text-slate-400 text-xs font-medium tracking-widest opacity-80">
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </div>
             <div className="text-slate-500 text-xs font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-px bg-slate-300"></span>
                <span>Ai黄小西推荐</span>
                <span className="w-2 h-px bg-slate-300"></span>
             </div>
          </div>
        )}
        <div className="w-full mb-4 animate-slide-up flex gap-3 items-start">
          {/* Avatar */}
          <div className="shrink-0 flex flex-col items-center">
             <div className="w-9 h-9 rounded-full border border-white shadow-sm overflow-hidden bg-slate-100">
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
             </div>
          </div>

          {/* Chat Bubble */}
          <div className="flex-1 min-w-0 max-w-[85%]">
             <div className="flex items-baseline gap-2 mb-1 ml-1">
                <span className="text-xs font-bold text-slate-600">{name}</span>
                <span className="text-[10px] text-slate-400">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             </div>

             <div className="bg-white rounded-2xl rounded-tl-none p-3.5 border border-slate-100 shadow-sm text-sm text-slate-700 leading-relaxed">
                {description}
                
                {/* Gift Content */}
                {data.giftContent && (
                  <div className="mt-3 bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
                     <div className="flex flex-col gap-2 mb-3">
                        {data.giftContent.items.map((item, idx) => (
                          <div key={idx} className="flex items-start text-xs">
                             <span className="font-bold text-slate-800 shrink-0">{item.label}：</span>
                             <span className="text-blue-500 underline decoration-blue-300 underline-offset-2 cursor-pointer hover:text-blue-600">{item.value}</span>
                          </div>
                        ))}
                     </div>
                     <button className="w-full bg-[#F8E8D6] hover:bg-[#F0DCC5] text-[#D97706] text-sm font-bold py-2 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1 active:scale-[0.98]">
                        <span className="text-red-500 text-xs bg-red-100 p-0.5 rounded">福</span>
                        {data.giftContent.buttonText}
                     </button>
                  </div>
                )}

                {/* Recommendations Grid */}
                {data.recommendations && data.recommendations.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {data.recommendations.map((item, idx) => {
                      // Subtle rotation for "dynamic" feel: -2deg, 0deg, 2deg
                      const rotation = idx === 0 ? '-rotate-2' : idx === 2 ? 'rotate-2' : 'rotate-0';
                      // Badge colors - use theme color for the first badge, others can be variations or fixed
                      // To make it "blue series" or "green series", we can use the theme color for the rating text
                      
                      // Map usefulInfo.color to specific text colors for the rating
                      const ratingColorMap: Record<string, string> = {
                        green: 'text-emerald-500',
                        blue: 'text-blue-500',
                        red: 'text-red-500',
                        yellow: 'text-amber-500',
                        purple: 'text-purple-500'
                      };
                      const ratingTextColor = ratingColorMap[usefulInfo.color] || 'text-orange-400';

                      // Badge background color - keep the numbered badges distinct but maybe align with theme?
                      // The user asked for "small icon and score text (orange part) color system adjusted to blue/green"
                      // So the badge (01, 02) might stay as is, or be adjusted. 
                      // Let's keep the badge colors distinct (Red/Orange/Yellow) as they indicate rank/order, 
                      // but change the STAR and RATING text color.
                      
                      const badgeColor = idx === 0 ? 'bg-red-400' : idx === 1 ? 'bg-orange-400' : 'bg-yellow-400';
                      
                      return (
                        <div 
                          key={item.id} 
                          className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transform transition-transform hover:scale-105 hover:z-10 hover:rotate-0 ${rotation}`}
                        >
                          <div className="relative aspect-square w-full bg-slate-100">
                             <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                             <div className={`absolute top-0 left-0 ${badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg shadow-sm`}>
                               {item.label}
                             </div>
                          </div>
                          <div className="p-1.5 flex flex-col gap-0.5">
                             <div className="text-[10px] font-bold text-slate-800 truncate">{item.title}</div>
                             <div className="flex items-center justify-between text-[8px] text-slate-500">
                                <span className={`flex items-center ${ratingTextColor} font-bold`}>
                                  ★ {item.rating}
                                </span>
                                <span className="text-slate-400 scale-90 origin-right">{item.price}</span>
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
             </div>

             {/* Smart Guide Questions for the 3rd push (index 2) */}
             {pushIndex === 3 && (
               <div className="mt-3 flex flex-col gap-2 w-full items-start">
                 {actions.map((action, idx) => (
                   <button
                     key={idx}
                     onClick={() => onAction(action.prompt)}
                     className="w-fit bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-slate-100 flex items-center gap-3 text-slate-700 font-medium text-sm active:scale-[0.98] transition-transform hover:bg-slate-50"
                   >
                     <span>{action.label}</span>
                     <Send className="w-3.5 h-3.5 text-slate-400" />
                   </button>
                 ))}
               </div>
             )}
          </div>
        </div>
      </>
    );
  }

  // Common Card Content
  const CardContent = () => (
    <>
      {/* Left: Icon & Content */}
      <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* Icon Box */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm shrink-0 ${theme.bg}`}>
              {usefulInfo.type === 'comfort' ? (
                  usefulInfo.color === 'green' ? <User className="w-5 h-5 text-emerald-500" /> :
                  usefulInfo.color === 'yellow' ? <Users className="w-5 h-5 text-amber-500" /> :
                  <div className="flex -space-x-2 text-red-500"><User size={14} /><User size={14} /><User size={14} /></div>
              ) : (
                  <span>{usefulInfo.emoji}</span>
              )}
          </div>
          
          {/* Text Content */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="text-[14px] font-bold text-slate-800 leading-tight truncate mb-0.5">
              {usefulInfo.subtitle}
            </div>
            <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 truncate">
               <span>{usefulInfo.title}</span>
               <span className="w-0.5 h-2 bg-slate-200 rounded-full shrink-0"></span>
               <span className="shrink-0">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
      </div>

      {/* Right: Action Button */}
      <button 
        onClick={() => onAction(primaryAction.prompt)}
        className={`shrink-0 flex items-center gap-0.5 text-xs font-bold ${theme.text} active:opacity-70 transition-opacity pl-2 border-l border-slate-50`}
      >
        {primaryAction.label}
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </>
  );

  // Initial Card Style (Special UI for top 2 cards)
  if (isInitial) {
    return (
      <div className="w-full animate-slide-up px-1">
         <div className="bg-gradient-to-r from-teal-50/90 via-white/80 to-white/60 backdrop-blur-md rounded-[24px] p-4 border border-white/60 shadow-sm relative overflow-hidden flex items-center justify-between gap-4 transition-transform active:scale-[0.98]">
            
            {/* Left Content */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Icon Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm shrink-0 bg-white text-teal-600`}>
                    {usefulInfo.emoji ? <span className="text-lg">{usefulInfo.emoji}</span> : <User className="w-5 h-5" />}
                </div>
                
                {/* Text Info */}
                <div className="flex flex-col">
                    <div className="text-[15px] font-bold text-slate-700 leading-tight flex items-center">
                        {usefulInfo.title}
                        {usefulInfo.titleSuffix && (
                          <span className="text-[10px] text-orange-500 font-normal ml-1 bg-orange-50 px-1 rounded-sm border border-orange-100">
                            {usefulInfo.titleSuffix}
                          </span>
                        )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {usefulInfo.subtitle}
                    </div>
                </div>
            </div>

            {/* Right Action Button (Pill Style) */}
            <button 
                onClick={() => onAction(primaryAction.prompt)}
                className="shrink-0 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-colors flex items-center gap-1"
            >
                {primaryAction.label}
                <ChevronRight className="w-3 h-3 opacity-80" />
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-5 animate-slide-up flex gap-3 items-start group">
      {/* Avatar */}
      <div className="shrink-0 flex flex-col items-center pt-1">
         <div className="w-10 h-10 rounded-full border border-white shadow-sm overflow-hidden bg-slate-100 relative">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
         </div>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
         {/* Name Label */}
         <div className="flex items-baseline gap-2 mb-1 ml-1">
            <span className="text-xs font-bold text-slate-600">{name}</span>
         </div>

         {/* Card Bubble */}
         <div className="bg-white rounded-2xl rounded-tl-none p-3.5 border border-slate-100 shadow-sm relative overflow-hidden flex items-center justify-between gap-3 transition-transform active:scale-[0.99]">
            <CardContent />
         </div>
      </div>
    </div>
  );
};

export default FeedCard;
