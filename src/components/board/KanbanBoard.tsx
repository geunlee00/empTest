"use client";

import { useState, useEffect } from "react";
import { 
  DndContext, 
  DragEndEvent, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  DragStartEvent,
  closestCorners
} from "@dnd-kit/core";
import { useBoardStore, ColumnId, JobItem } from "@/store/useBoardStore";
import { BoardColumn } from "./BoardColumn";
import { JobCard } from "./JobCard";

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "interested", title: "⭐️ 관심 기업" },
  { id: "applied", title: "📝 서류 지원" },
  { id: "interview", title: "🗣️ 면접 진행" },
  { id: "result", title: "🎯 최종 결과" },
];

export function KanbanBoard() {
  const { jobs, moveJob } = useBoardStore();
  const [activeJob, setActiveJob] = useState<JobItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const job = jobs.find((j) => j.id === active.id);
    if (job) setActiveJob(job);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const jobId = active.id as string;
    const toColumn = over.id as ColumnId;

    moveJob(jobId, toColumn);
  };

  if (!isMounted) return <div className="animate-pulse flex gap-4 h-[600px]"><div className="flex-1 bg-slate-800/50 rounded-2xl"></div><div className="flex-1 bg-slate-800/50 rounded-2xl"></div><div className="flex-1 bg-slate-800/50 rounded-2xl"></div><div className="flex-1 bg-slate-800/50 rounded-2xl"></div></div>;

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-6 items-start">
        {COLUMNS.map((col) => (
          <BoardColumn 
            key={col.id} 
            id={col.id} 
            title={col.title} 
            jobs={jobs.filter((job) => job.status === col.id)} 
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
          duration: 250,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
        {activeJob ? (
          <div className="opacity-95 rotate-3 scale-105 shadow-2xl cursor-grabbing">
             <JobCard job={activeJob} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
