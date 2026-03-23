"use client";
import { useState, useRef, useEffect } from "react";
import { usePingPongStore } from "@/store/usePingPongStore";
import { Send, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ChatInterface() {
  const { messages, simulateAiResponse, isGlobalTyping } = usePingPongStore();
  const [inputTitle, setInputTitle] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGlobalTyping]);

  const handleSend = () => {
    if (!inputTitle.trim() || isGlobalTyping) return;
    simulateAiResponse(inputTitle);
    setInputTitle("");
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={msg.id} 
              className={cn("flex gap-3 max-w-[85%]", msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto")}
            >
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm", 
                msg.sender === "ai" ? "bg-purple-500/20 text-purple-400" : "bg-blue-600 border border-blue-500 text-white")}>
                {msg.sender === "ai" ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              
              <div className={cn(
                "p-3.5 rounded-2xl text-[15px] leading-relaxed relative",
                msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-sm",
                msg.isTyping && "min-w-[50px] flex items-center justify-center gap-1.5 h-[46px]"
              )}>
                {msg.isTyping ? (
                  <>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="relative flex items-center bg-slate-800 rounded-xl border border-slate-700 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent p-4 outline-none text-slate-200 placeholder:text-slate-500"
            placeholder="당신의 직무 경험을 키워드로 편하게 말해주세요..."
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isGlobalTyping}
          />
          <button 
            onClick={handleSend}
            disabled={!inputTitle.trim() || isGlobalTyping}
            className="p-2 mr-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
