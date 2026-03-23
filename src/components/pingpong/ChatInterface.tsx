"use client";
import { useState, useRef, useEffect } from "react";
import { usePingPongStore } from "@/store/usePingPongStore";
import { useBoardStore } from "@/store/useBoardStore";
import { Send, User, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ChatInterface() {
  const { messages, simulateAiResponse, isGlobalTyping, selectedJob, setSelectedJob } = usePingPongStore();
  const { jobs } = useBoardStore();
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
    <div className="flex flex-col h-full bg-slate-900 relative">
      {/* 타겟 공고 선택 헤더 */}
      <div className="bg-slate-800/80 p-3.5 border-b border-slate-700/80 flex items-center gap-4 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
          <Target size={18} className="text-purple-400" />
          <span>타겟 공고:</span>
        </div>
        <select 
          className="flex-1 bg-slate-900 border border-slate-700 text-sm text-slate-200 p-2 rounded-lg outline-none focus:border-purple-500/80 transition-colors cursor-pointer"
          onChange={(e) => {
            const job = jobs.find(j => j.id === e.target.value);
            if (job) setSelectedJob(job);
          }}
          value={selectedJob?.id || ""}
        >
          <option value="" disabled>스크랩된 공고 중 분석할 타겟을 선택하세요</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.companyName} - {job.role}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700" ref={scrollRef}>
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
                "p-3.5 rounded-2xl text-[15px] leading-relaxed relative whitespace-pre-wrap",
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
                  <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
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
            className="flex-1 bg-transparent p-4 outline-none text-slate-200 placeholder:text-slate-500 disabled:opacity-50"
            placeholder={selectedJob ? "지원할 직무와 관련된 본인의 경험을 들려주세요..." : "먼저 상단에서 타겟 공고를 선택해주세요."}
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isGlobalTyping || !selectedJob}
          />
          <button 
            onClick={handleSend}
            disabled={!inputTitle.trim() || isGlobalTyping || !selectedJob}
            className="p-2 mr-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
