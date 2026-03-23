"use client";

import { useDraggable } from "@dnd-kit/core";
import { JobItem } from "@/store/useBoardStore";
import { Calendar, Trash2 } from "lucide-react";
import { useBoardStore } from "@/store/useBoardStore";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: JobItem;
}

export function JobCard({ job }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: job.id,
    data: {
      currentColumn: job.status,
      job,
    },
  });
  const deleteJob = useBoardStore((state) => state.deleteJob);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-slate-800 border-l-4 p-4 rounded-xl shadow-sm border border-slate-700/50 hover:border-slate-500 transition-colors group cursor-grab active:cursor-grabbing relative",
        isDragging && "opacity-50 z-50",
        job.dDay < 0 ? "border-l-slate-600" :
        job.dDay <= 3 ? "border-l-red-500" : 
        job.dDay <= 7 ? "border-l-yellow-500" : "border-l-blue-500"
      )}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white tracking-wide">{job.companyName}</h3>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-md",
          job.dDay < 0 ? "bg-slate-700 text-slate-300" :
          job.dDay === 0 ? "bg-red-500/20 text-red-500" :
          job.dDay <= 3 ? "bg-red-500/20 text-red-400" : 
          job.dDay <= 7 ? "bg-yellow-500/20 text-yellow-500" : "bg-blue-500/20 text-blue-400"
        )}>
          {job.dDay < 0 ? "마감" : job.dDay === 0 ? "D-Day" : `D-${job.dDay}`}
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-3">{job.role}</p>
      
      <div className="flex items-center text-xs text-slate-500 gap-1.5">
        <Calendar size={14} />
        <span>{job.deadline} 마감</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteJob(job.id);
        }}
        className="absolute bottom-3 right-3 p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all rounded-md"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
