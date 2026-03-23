"use client";
import { usePingPongStore } from "@/store/usePingPongStore";
import { motion, AnimatePresence } from "framer-motion";

export function AssetPanel() {
  const { assets } = usePingPongStore();

  if (assets.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700/50 rounded-xl m-1 p-6 text-center">
        <p className="text-sm font-medium">현재 추출된 핵심 에셋이 없습니다.</p>
        <p className="text-xs mt-2 text-slate-600 leading-relaxed">AI 면접관과 대화하며 자기소개서나<br/>면접에서 활용할 무기를 '채굴'해 보세요!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
      <AnimatePresence>
        {assets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="p-4 bg-slate-900 border border-purple-500/30 rounded-xl shadow-md hover:border-purple-500/60 hover:shadow-purple-500/5 transition-all"
          >
            <h3 className="text-slate-200 font-bold mb-2 text-sm">{asset.title}</h3>
            <p className="text-slate-400 text-xs mb-3 leading-relaxed">{asset.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {asset.tags.map((tag, i) => (
                <span key={i} className="text-[10px] font-semibold px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
