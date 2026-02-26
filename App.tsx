import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import FeedCard from './components/FeedCard';
import TopAgentBar from './components/TopAgentBar';
import BottomInteraction from './components/BottomInteraction';
import AgentDetailView from './components/AgentDetailView';
import Sidebar from './components/Sidebar';
import AgentsListView from './components/AgentsListView';
import { AGENTS, HERO_CARDS, INITIAL_CARDS_INSIDE, INITIAL_CARDS_OUTSIDE, PUSH_CARDS_INSIDE, PUSH_CARDS_OUTSIDE, IMG_SCENIC_MAP_OUTSIDE, IMG_SCENIC_REAL_INSIDE } from './utils/constants';
import { generateResponse } from './services/geminiService';
import { ChatMessage, AgentProfile, HeroCardData } from './types';

function App() {
  const [view, setView] = useState<'home' | 'agent-chat' | 'agents-list'>('home');
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showResponseOverlay, setShowResponseOverlay] = useState(false);
  const [lastResponse, setLastResponse] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  
  const currentAgent = AGENTS[activeAgentIndex];

  // Feed State
  const [feedCards, setFeedCards] = useState<HeroCardData[]>([]);
  const nextCardIndexRef = useRef(0); 
  const [userInteracted, setUserInteracted] = useState(false);
  const [pushedCount, setPushedCount] = useState(0);
  const [isInsideScenic, setIsInsideScenic] = useState(false); // Default: Outside scenic area
  
  // UI State
  const [isTopBarCollapsed, setIsTopBarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const isAutoScrolling = useRef(false);

  // Initialize Feed based on location status
  useEffect(() => {
    const initialCards = isInsideScenic ? INITIAL_CARDS_INSIDE : INITIAL_CARDS_OUTSIDE;
    setFeedCards(initialCards);
    nextCardIndexRef.current = 0; // Reset push index
    setPushedCount(0); // Reset push count
    setUserInteracted(false); 
  }, [isInsideScenic]);

  // Auto-push cards every 7 seconds, max 3 times, stops on interaction
  useEffect(() => {
    if (view !== 'home' || userInteracted || pushedCount >= 3) return;

    const timer = setInterval(() => {
      const pushPool = isInsideScenic ? PUSH_CARDS_INSIDE : PUSH_CARDS_OUTSIDE;
      const nextIndex = nextCardIndexRef.current;
      const nextCard = pushPool[nextIndex % pushPool.length];
      
      // Add push metadata to the card
      const pushedCard = { ...nextCard, isPush: true, pushIndex: pushedCount + 1 };
      
      setFeedCards(prev => [...prev, pushedCard]);
      nextCardIndexRef.current = nextIndex + 1;
      setPushedCount(prev => prev + 1);
      
    }, 7000);

    return () => clearInterval(timer);
  }, [view, userInteracted, pushedCount, isInsideScenic]);

  // Auto-scroll to bottom of feed
  const feedEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (feedCards.length > 3) {
        isAutoScrolling.current = true;
        feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        // Reset flag after animation
        setTimeout(() => {
            isAutoScrolling.current = false;
        }, 1000);
    }
  }, [feedCards]);

  const handleInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
  };
  
  // Handle Scroll for Auto-Collapse
  const handleFeedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isAutoScrolling.current) return;

    const currentScrollY = e.currentTarget.scrollTop;
    
    // If scrolling down more than 20px, collapse
    if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
        if (!isTopBarCollapsed) setIsTopBarCollapsed(true);
    } 
    // If scrolling up significantly or at top, expand
    else if (currentScrollY < 10) {
        if (isTopBarCollapsed) setIsTopBarCollapsed(false);
    }

    lastScrollY.current = currentScrollY;
  };

  const handleSendMessage = async (text: string) => {
    handleInteraction();
    setIsProcessing(true);
    // Optimistically add user message
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);

    // If we are in home view, show the overlay. 
    // If in chat view, we don't show overlay as the message appears in the list.
    if (view === 'home') {
      setShowResponseOverlay(true);
    }

    try {
      const responseText = await generateResponse(text);
      setLastResponse(responseText);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setLastResponse("Sorry, something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  // New handler to enter the detail view
  const handleAgentEnter = (agentId: string) => {
    handleInteraction();
    const index = AGENTS.findIndex(a => a.id === agentId);
    if (index !== -1) {
        setActiveAgentIndex(index);
        setView('agent-chat');
    }
  };

  const handleBackToHome = () => {
    setView('home');
    setShowResponseOverlay(false); 
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans p-4 sm:p-0">
      {/* Mobile Frame Container - iPhone 17 Pro Max Ratio (approx 430x932) */}
      <div className="w-full max-w-[430px] h-[932px] max-h-[95vh] bg-teal-50/50 relative overflow-hidden rounded-[3.5rem] shadow-2xl flex flex-col ring-8 ring-slate-800/50">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-100 via-white to-white pointer-events-none z-0"></div>
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-teal-200/40 to-transparent pointer-events-none z-0 rounded-b-[40%] blur-3xl"></div>

        {view === 'home' && (
           <>
             {/* Header */}
             <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

             {/* Top Agent Bar */}
             <div className="relative z-20 bg-white/50 backdrop-blur-sm border-b border-white/50 transition-all duration-300">
                <TopAgentBar 
                  isCollapsed={isTopBarCollapsed}
                  onToggleCollapse={() => setIsTopBarCollapsed(!isTopBarCollapsed)}
                  onAgentsClick={() => setView('agents-list')}
                  onAgentClick={handleAgentEnter}
                />
             </div>

             {/* Scrollable Feed Content */}
             <main 
                className="flex-1 overflow-y-auto no-scrollbar pb-32 relative z-10 px-4 pt-4 animate-fade-in"
                onScroll={handleFeedScroll}
             >
               {/* Scenic Banner */}
               <div className="w-full h-48 rounded-[2rem] rounded-tr-none overflow-hidden shadow-lg relative mb-6 shrink-0 group cursor-pointer transform -rotate-1 border-4 border-white/30 hover:rotate-0 transition-all duration-500">
                  <img 
                    src={isInsideScenic ? IMG_SCENIC_REAL_INSIDE : IMG_SCENIC_MAP_OUTSIDE} 
                    alt="Scenic View" 
                    className="w-full h-full object-cover transform scale-110 transition-transform duration-700 group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none"></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                     <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                     <div>
                        {isInsideScenic && (
                           <div className="text-white text-2xl font-black tracking-tight drop-shadow-lg font-serif italic">蜡染咖啡馆</div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                           <div className="text-white/90 text-[10px] font-bold backdrop-blur-md bg-white/20 px-2 py-1 rounded-full border border-white/20 flex items-center gap-1">
                              <span>☀️</span> 晴 19°C
                           </div>
                           <div className="text-white/80 text-[10px] font-medium tracking-wider uppercase">
                              Yunfeng Tunpu
                           </div>
                        </div>
                     </div>
                     <div className="bg-teal-500/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/30 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        {isInsideScenic ? "最佳打卡点 →" : "游玩攻略 →"}
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-2 pb-20">
                 {feedCards.map((card, index) => (
                   <FeedCard 
                     key={`${card.id}-${index}`} 
                     data={card} 
                     isInitial={index < 2}
                     isPush={(card as any).isPush}
                     pushIndex={(card as any).pushIndex}
                     showRecommendationHeader={index === 2}
                     onAction={(prompt) => {
                       handleInteraction();
                       handleSendMessage(prompt);
                     }}
                   />
                 ))}
                 <div ref={feedEndRef} />
               </div>
             </main>
           </>
        )}

        {view === 'agent-chat' && (
            <AgentDetailView 
                agent={currentAgent} 
                onBack={handleBackToHome}
                messages={messages}
                onActionClick={handleSendMessage}
            />
        )}

        {view === 'agents-list' && (
            <AgentsListView 
                onBack={handleBackToHome}
                onAgentSelect={handleAgentEnter}
            />
        )}

        {/* Bottom Interaction Area - Shared but context aware */}
        <BottomInteraction 
          onSendMessage={handleSendMessage} 
          isProcessing={isProcessing} 
          inputValue={inputValue}
          onInputChange={setInputValue}
          placeholder={view === 'agent-chat' ? `向${currentAgent?.name}提问...` : "通天河漂流怎么走～"}
          minimal={view === 'agent-chat'} // Pass a prop to maybe simplify the bar in chat mode?
          isInsideScenic={isInsideScenic}
          onToggleScenic={() => setIsInsideScenic(!isInsideScenic)}
          onSmartGuideClick={() => handleSendMessage("我想开启智能导览")}
          onMallClick={() => handleSendMessage("我想订购门票")}
        />

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Response Overlay (Only for Home View) */}
        {showResponseOverlay && view === 'home' && (
           <div 
             className="absolute bottom-28 left-4 right-4 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl z-20 border border-white/50 transform transition-all duration-500 origin-bottom animate-bounce-in cursor-pointer"
             onClick={() => setShowResponseOverlay(false)}
           >
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0 shadow-lg text-white">
                    <span className="text-lg">🤖</span>
                 </div>
                 <div className="flex-1">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                       {isProcessing ? (
                         <span className="flex items-center gap-1">
                           正在思考 <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                         </span>
                       ) : (
                         lastResponse
                       )}
                    </p>
                 </div>
                 <button className="text-slate-400 hover:text-slate-600 p-1">
                    <span className="text-xl">×</span>
                 </button>
              </div>
           </div>
        )}
      </div>
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          60% { transform: scale(1.02) translateY(-5px); opacity: 1; }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

export default App;