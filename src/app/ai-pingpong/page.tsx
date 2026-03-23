import { ChatInterface } from "@/components/pingpong/ChatInterface";
import { AssetPanel } from "@/components/pingpong/AssetPanel";

export default function AiPingPongPage() {
  return (
    <div className="flex flex-col h-full gap-6 pb-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-purple-400 flex items-center gap-3 tracking-tight">
            <span>✨</span> AI 경험 채굴
          </h1>
          <p className="text-slate-400 text-[15px]">키워드나 단답형으로 대답해도, AI 면접관이 끊임없이 질문하며 숨겨진 역량을 이끌어냅니다.</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[650px] max-h-[75vh]">
        <div className="flex-1 rounded-2xl overflow-hidden flex flex-col shadow-lg border border-slate-700/80">
           <ChatInterface />
        </div>
        
        <div className="w-full lg:w-[380px] bg-slate-800/40 border border-slate-700/50 rounded-2xl flex flex-col p-5 shadow-inner">
           <div className="mb-4 pb-4 border-b border-slate-800/80">
             <h2 className="text-[17px] font-bold text-slate-200 flex items-center gap-2">
               💎 내 경험 무기 보관함
             </h2>
             <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">대화를 진행하면 AI가 스스로 판단하여 핵심 역량을 에셋 형태로 자동 추출해 줍니다.</p>
           </div>
           
           <AssetPanel />
        </div>
      </div>
    </div>
  );
}
