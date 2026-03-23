"use client";

import { KanbanBoard } from "@/components/board/KanbanBoard";
import { useBoardStore } from "@/store/useBoardStore";

export default function BoardPage() {
  const addJob = useBoardStore((state) => state.addJob);

  const handleAddMockJob = () => {
    // 시연용 임시 더미 데이터 무작위 생성
    const mockCompanies = ["라인", "배달의민족", "쿠팡", "야놀자", "무신사"];
    const mockRoles = ["프론트엔드 개발자", "UI/UX 엔지니어", "Frontend Engineer"];
    
    const randomCompany = mockCompanies[Math.floor(Math.random() * mockCompanies.length)];
    const randomRole = mockRoles[Math.floor(Math.random() * mockRoles.length)];
    const randomDday = Math.floor(Math.random() * 14) + 1; // 1~14

    // 상태에 추가 (기본적으로 '관심 기업' 컬럼으로 들어갑니다)
    addJob({
      companyName: randomCompany,
      role: randomRole,
      deadline: `2026-04-${String(Math.floor(Math.random() * 20) + 10).padStart(2, '0')}`,
      dDay: randomDday,
    });
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">통합 칸반 보드</h1>
          <p className="text-slate-400">새롭게 스크랩한 공고와 진행 중인 지원 현황을 한눈에 관리하세요.</p>
        </div>
        <button 
          onClick={handleAddMockJob}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-all text-sm flex items-center gap-2"
        >
          <span>✨</span> 임시 공고 스크랩 시뮬레이션
        </button>
      </div>
      
      <KanbanBoard />
    </div>
  );
}
