import Link from "next/link";
import { ArrowRight, LayoutDashboard, MessageSquareText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">환영합니다! 👋</h1>
        <p className="text-slate-400">가장 쉽고 똑똑하게 흩어진 채용 공고를 관리하세요.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/board" className="group block p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <h2 className="text-xl font-semibold">통합 칸반 보드</h2>
          </div>
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
            익스텐션에서 수집한 공고들을 한눈에 확인하고, 드래그 앤 드롭으로 진행 상태를 변경해보세요.
          </p>
          <div className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            이동하기 <ArrowRight size={16} />
          </div>
        </Link>

        <Link href="/ai-pingpong" className="group block p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
              <MessageSquareText size={24} />
            </div>
            <h2 className="text-xl font-semibold">AI 경험 채굴</h2>
          </div>
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
            나의 과거 경험을 키워드로 입력하면, AI 면접관이 던지는 꼬리 질문을 통해 역량을 구체화할 수 있습니다.
          </p>
          <div className="text-purple-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            이동하기 <ArrowRight size={16} />
          </div>
        </Link>

        <Link href="/review" className="group block p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-green-500 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.5.5 1.4 0 1.9l-9.8 9.8c-.2.2-.5.3-.8.3H7.4c-.8 0-1.4-.6-1.4-1.4v-3.2c0-.3.1-.6.3-.8l9.8-9.8c.5-.5 1.4-.5 1.9 0l3.2 3.2z"/><path d="m15 5 4 4"/></svg>
            </div>
            <h2 className="text-xl font-semibold">오답노트 및 통계</h2>
          </div>
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
            불합격 원인을 복기하고 누적된 면접 데이터 패턴을 분석하여 취약점을 보완하세요.
          </p>
          <div className="text-green-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            이동하기 <ArrowRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
}
