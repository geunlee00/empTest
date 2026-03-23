"use client";
import { useReviewStore } from "@/store/useReviewStore";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function StatCharts() {
  const { notes } = useReviewStore();

  const weaknessCount: Record<string, number> = {
    "CS 기초": 3,
    "지원동기": 1,
    "프로젝트 깊이": 4,
    "커뮤니케이션": 1,
    "알고리즘": 2,
  };
  
  notes.forEach(note => {
    note.weaknesses.forEach(w => {
      const key = w.split(" ")[0]; 
      weaknessCount[key] = (weaknessCount[key] || 0) + 1;
    });
  });

  const radarData = Object.entries(weaknessCount).map(([subject, A]) => ({
    subject,
    A,
    fullMark: 5,
  }));

  const barData = [
    { stage: "서류", 불합격: 3, 합격: 5 },
    { stage: "코테", 불합격: 2, 합격: 3 },
    { stage: "1차면접", 불합격: 4, 합격: 1 },
    { stage: "최종면접", 불합격: 1, 합격: 0 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[340px]">
      <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 flex flex-col shadow-inner">
        <h3 className="text-md font-bold text-slate-200 mb-2 flex items-center gap-2">
           <span>🕸️</span> 누적 취약점 패턴 (Radar)
        </h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
              <Radar name="지적 횟수" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px', borderRadius: '8px' }}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 flex flex-col shadow-inner">
        <h3 className="text-md font-bold text-slate-200 mb-2 flex items-center gap-2">
           <span>🚥</span> 전형별 생존율 (Bar)
        </h3>
        <div className="flex-1 w-full min-h-0 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }} 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px', borderRadius: '8px' }}
              />
              <Bar dataKey="불합격" stackId="a" fill="#ef4444" radius={[0, 0, 4, 4]} barSize={35} />
              <Bar dataKey="합격" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-slate-400 mt-3 text-center">💡 1차 면접에서의 탈락 비율이 높습니다. 실무/CS 대비 집중이 필요합니다.</p>
      </div>
    </div>
  );
}
