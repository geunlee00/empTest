import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ReviewNote {
  id: string;
  companyName: string;
  stage: "서류" | "코딩테스트" | "1차면접" | "최종면접";
  result: "합격" | "불합격";
  weaknesses: string[];
  feedback: string;
  date: string;
}

interface ReviewState {
  notes: ReviewNote[];
  addNote: (note: Omit<ReviewNote, "id">) => void;
  deleteNote: (id: string) => void;
}

const MOCK_NOTES: ReviewNote[] = [
  {
    id: "rev-1",
    companyName: "당근마켓",
    stage: "1차면접",
    result: "불합격",
    weaknesses: ["CS 기초", "네트워크 깊이 부족"],
    feedback: "렌더링 최적화 경험에 대해서는 잘 답변했으나, 브라우저 렌더링 파이프라인이나 네트워크 레이어 같은 기초 CS 꼬리 질문에서 명확히 대답하지 못함.",
    date: "2026-03-10"
  },
  {
    id: "rev-2",
    companyName: "토스",
    stage: "서류",
    result: "불합격",
    weaknesses: ["지원동기 불명확", "핏(Fit) 오해"],
    feedback: "직무와 맞지 않는 이전 경험을 너무 길게 작성했음. 요구하는 코어 역량(React, 성능 최적화) 위주로 자소서 재배치할 것.",
    date: "2026-02-15"
  }
];

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      notes: MOCK_NOTES,
      addNote: (note) => set((state) => ({ notes: [{ ...note, id: `rev-${Date.now()}` }, ...state.notes] })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) }))
    }),
    { name: "personal-crm-review" }
  )
);
