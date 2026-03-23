"use client";

import { useDroppable } from "@dnd-kit/core";
import { ColumnId, JobItem } from "@/store/useBoardStore";
import { JobCard } from "./JobCard";
import { cn } from "@/lib/utils";

interface BoardColumnProps {
  id: ColumnId;
  title: string;
  jobs: JobItem[];
}

export function BoardColumn({ id, title, jobs }: BoardColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col flex-1 min-w-[280px] bg-slate-900/60 rounded-2xl p-4 border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-semibold text-slate-200">{title}</h2>
        <span className="bg-slate-800 text-slate-400 text-xs px-2.5 py-1 rounded-full font-medium">
          {jobs.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={cn(
          "flex-1 flex flex-col gap-3 min-h-[500px] p-2 rounded-xl transition-all duration-200",
          isOver ? "bg-slate-800/60 shadow-inner ring-1 ring-blue-500/30" : ""
        )}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
