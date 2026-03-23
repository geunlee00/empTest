import { ReviewNoteList } from "@/components/review/ReviewNoteList";
import { StatCharts } from "@/components/review/StatCharts";

export default function ReviewPage() {
  return (
    <div className="flex flex-col h-full gap-8 pb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-green-400 flex items-center gap-3">
            <span>📈</span> 오답노트 및 지원 통계
          </h1>
          <p className="text-slate-400 text-[15px]">탈락과 합격의 진짜 원인을 복기하고, 누적된 패턴 통계를 통해 취약점을 스마트하게 보완하세요.</p>
        </div>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors text-[14px]">
          + 새 오답노트 작성
        </button>
      </div>
      
      {/* 상단: 통계 차트 (Rader + Bar) */}
      <section className="h-[360px]">
        <StatCharts />
      </section>

      {/* 하단: 오답노트 복기 리스트 */}
      <section className="flex-1 mt-6">
        <h2 className="text-xl font-bold text-slate-200 mb-5 flex items-center gap-2">
          📝 나의 복기 리스트
        </h2>
        <ReviewNoteList />
      </section>
    </div>
  );
}
