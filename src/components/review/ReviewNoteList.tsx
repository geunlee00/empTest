"use client";
import { useReviewStore } from "@/store/useReviewStore";
import { Calendar, Building, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReviewNoteList() {
  const { notes, deleteNote } = useReviewStore();

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 bg-slate-800/80 border border-slate-700 rounded-xl shadow-md relative group hover:border-slate-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-slate-400" />
                <h3 className="font-bold text-slate-200 text-lg">{note.companyName}</h3>
                <span className="bg-slate-700/50 text-slate-300 text-xs px-2.5 py-1 rounded-md ml-2 border border-slate-600">
                  {note.stage}
                </span>
                <span className="bg-red-500/10 text-red-500 font-semibold text-xs px-2 py-1 rounded-md border border-red-500/20">
                  {note.result}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar size={14} />
                <span>{note.date}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-slate-300 text-[14px] leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 shadow-inner">
                {note.feedback}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-slate-500 font-bold tracking-wide">💡 개선 필요 항목:</span>
              <div className="flex gap-1.5">
                {note.weaknesses.map((w, idx) => (
                  <span key={idx} className="bg-slate-700/80 text-slate-200 text-[11px] px-2.5 py-1 rounded-full border border-slate-600/50">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-all"
            >
              <XCircle size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {notes.length === 0 && (
        <div className="text-center p-12 text-slate-400 border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/20">
          <p className="font-semibold mb-1">기록된 오답노트가 없습니다.</p>
          <p className="text-sm text-slate-500">새로운 면접 복기를 기록하고 취약점 통계를 확인해보세요.</p>
        </div>
      )}
    </div>
  );
}
