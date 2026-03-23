import { create } from "zustand";

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
  addMessage: (msg: Omit<Message, "id">) => void;
  updateMessage: (id: string, partial: Partial<Message>) => void;
  addAsset: (asset: Omit<Asset, "id">) => void;
  simulateAiResponse: (userMessage: string) => void;
}

export const usePingPongStore = create<PingPongState>((set, get) => ({
  messages: [
    { id: "init-1", sender: "ai", text: "안녕하세요! 어떤 과거 경험(프로젝트, 인턴십, 동아리 등)을 정리하고 싶으신가요? 편하게 키워드나 짧은 문장으로 알려주세요!" }
  ],
  assets: [],
  isGlobalTyping: false,
  
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, { ...msg, id: Date.now().toString() }] })),
  updateMessage: (id, partial) => set((state) => ({
    messages: state.messages.map(m => m.id === id ? { ...m, ...partial } : m)
  })),
  addAsset: (asset) => set((state) => ({ assets: [{ ...asset, id: Date.now().toString() }, ...state.assets] })),
  
  simulateAiResponse: (userMessage) => {
    // 1. 유저 메시지 렌더링
    const userMsgId = Date.now().toString();
    set((state) => ({ messages: [...state.messages, { id: userMsgId, sender: "user", text: userMessage }] }));
    
    // 2. AI 타이핑 시작 효과
    const aiMsgId = (Date.now() + 1).toString();
    set((state) => ({ 
      isGlobalTyping: true,
      messages: [...state.messages, { id: aiMsgId, sender: "ai", text: "", isTyping: true }] 
    }));
    
    // 3. PoC 용 딜레이 및 하드코딩된 AI 응답
    setTimeout(() => {
      let reply = "흥미로운 경험이네요! 그 과정에서 본인이 기여한 **핵심적인 역할**은 무엇이었나요? 어떤 고민을 했는지 구체적으로 들려주세요.";
      let newAsset: any = null;
      
      if (userMessage.includes("최적화") || userMessage.includes("성능") || userMessage.includes("속도")) {
         reply = "성능 최적화를 성공적으로 수행하셨군요! 수치적으로 얼마나 개선되었는지, 또 그 과정에서 가장 어려웠던 기술적 트러블슈팅은 무엇이었는지 정리해볼까요?";
         newAsset = { 
           title: "성능 최적화 경험", 
           summary: "병목 구간 파악 및 최적화를 통한 성능 지표 개선", 
           tags: ["성능개선", "트러블슈팅", "주도성"] 
         };
      } else if (get().messages.length > 5) {
         reply = "좋습니다! 지금까지 나눈 대화를 바탕으로 이 경험을 **'도전적 문제 해결' 에셋**으로 추출해 우측에 정리해 두었습니다. 다른 직무 경험도 이어서 말씀해 주시겠어요?";
         newAsset = { 
           title: "도전적인 문제 해결", 
           summary: userMessage.substring(0, 30) + " 과정을 통해 주도적으로 문제를 해결함.", 
           tags: ["문제해결", "책임감", "협업"] 
         };
      }

      // 상태 업데이트 (타이핑 종료, 진짜 텍스트 출력, 패널에 자산 추가)
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
