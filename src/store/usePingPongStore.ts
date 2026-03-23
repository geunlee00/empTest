import { create } from "zustand";
import { JobItem } from "./useBoardStore";

export interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  isTyping?: boolean;
}

export interface Asset {
  id: string;
  title: string;
  summary: string;
  tags: string[];
}

interface PingPongState {
  messages: Message[];
  assets: Asset[];
  isGlobalTyping: boolean;
  selectedJob: JobItem | null;
  setSelectedJob: (job: JobItem | null) => void;
  addMessage: (msg: Omit<Message, "id">) => void;
  updateMessage: (id: string, partial: Partial<Message>) => void;
  addAsset: (asset: Omit<Asset, "id">) => void;
  simulateAiResponse: (userMessage: string) => void;
}

export const usePingPongStore = create<PingPongState>((set, get) => ({
  messages: [
    { id: "init-1", sender: "ai", text: "상단의 '타겟 공고 선택' 창에서 스크랩한 공고를 골라주시면, 해당 직무의 핵심 요구사항(JD)을 분석해 드리겠습니다! 🎯" }
  ],
  assets: [],
  isGlobalTyping: false,
  selectedJob: null,
  
  setSelectedJob: (job) => {
    set({ selectedJob: job });
    if (job) {
      set((state) => ({ 
        messages: [...state.messages, { 
          id: Date.now().toString(), 
          sender: "ai", 
          text: `**[${job.companyName}]**의 **[${job.role}]** 공고를 가져왔습니다.\n\n제가 이 공고의 우대항목을 훑어보니, 평소 **'주도적인 문제해결'**이나 **'성능·프로세스 효율화 경험'**을 꽤 중시하는 핏(Fit)으로 보입니다.\n\n이와 관련해서 이력서에 쓰고 싶은 본인의 유사 프로젝트나 경험을 간략하게 던져주시겠어요?` 
        }] 
      }));
    }
  },

  addMessage: (msg) => set((state) => ({ messages: [...state.messages, { ...msg, id: Date.now().toString() }] })),
  updateMessage: (id, partial) => set((state) => ({
    messages: state.messages.map(m => m.id === id ? { ...m, ...partial } : m)
  })),
  addAsset: (asset) => set((state) => ({ assets: [{ ...asset, id: Date.now().toString() }, ...state.assets] })),
  
  simulateAiResponse: (userMessage) => {
    const userMsgId = Date.now().toString();
    set((state) => ({ messages: [...state.messages, { id: userMsgId, sender: "user", text: userMessage }] }));
    
    const aiMsgId = (Date.now() + 1).toString();
    set((state) => ({ 
      isGlobalTyping: true,
      messages: [...state.messages, { id: aiMsgId, sender: "ai", text: "", isTyping: true }] 
    }));
    
    setTimeout(() => {
      const job = get().selectedJob;
      let reply = `그 경험을 ${job ? job.companyName : "해당 기업"}에서 좋아하는 구체적인 성과 위주로 다듬으면 좋을 것 같네요. 그 과정에서 가장 큰 장애물은 무엇이었나요?`;
      let newAsset: any = null;
      
      if (userMessage.includes("경험") || userMessage.includes("프로젝트")) {
         reply = `훌륭합니다! ${job ? job.role : "이 직무"}에 딱 맞는 에피소드네요. 이 경험을 이력서에 넣기 좋게 좌측의 [경험 에셋]으로 방금 추출해 두었습니다. 다른 직무 경험이나 스펙도 덧붙여 주시겠어요?`;
         newAsset = { 
           title: job ? `${job.companyName} 맞춤형 성과` : "도전적인 프로젝트 경험", 
           summary: userMessage.substring(0, 30) + "... (공고 JD 분석을 통한 어필 포인트 일치)", 
           tags: [job ? job.role : "직무 역량", "문제해결"] 
         };
      } else if (get().messages.length > 5) {
         reply = "좋습니다! 지금까지 나눈 이야기들을 바탕으로 새로운 경험 에셋을 또 정리했습니다. 면접에서도 이 논리 흐름을 명심하세요.";
         newAsset = { 
           title: "면접용 핵심 방어 논리", 
           summary: userMessage.substring(0, 30) + "... 과정을 논리적으로 설명 가능해짐.", 
           tags: ["커뮤니케이션", "책임감"] 
         };
      }

      set((state) => ({
        isGlobalTyping: false,
        messages: state.messages.map(m => m.id === aiMsgId ? { ...m, text: reply, isTyping: false } : m)
      }));

      if (newAsset) {
        get().addAsset(newAsset);
      }
      
    }, 1500);
  }
}));
