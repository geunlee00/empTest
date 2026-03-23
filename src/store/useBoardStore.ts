import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColumnId = "interested" | "applied" | "interview" | "result";

export interface JobItem {
  id: string;
  companyName: string;
  role: string;
  deadline: string; // ISO date string or specific format
  dDay: number; // e.g., 5 for D-5
  status: ColumnId;
}

interface BoardState {
  jobs: JobItem[];
  addJob: (job: Omit<JobItem, "id" | "status">) => void;
  moveJob: (jobId: string, toColumn: ColumnId) => void;
  deleteJob: (jobId: string) => void;
}

// 시연을 위한 초기 더미 데이터 (포트폴리오 등)
const MOCK_JOBS: JobItem[] = [
  { id: "job-1", companyName: "네이버", role: "프론트엔드 개발자", deadline: "2026-04-01", dDay: 9, status: "interested" },
  { id: "job-2", companyName: "카카오", role: "웹 프론트엔드", deadline: "2026-03-30", dDay: 7, status: "applied" },
  { id: "job-3", companyName: "토스", role: "Frontend Developer", deadline: "2026-03-25", dDay: 2, status: "interview" },
  { id: "job-4", companyName: "당근마켓", role: "Frontend Engineer", deadline: "2026-03-10", dDay: -13, status: "result" },
];

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      jobs: MOCK_JOBS,
      addJob: (jobData) => 
        set((state) => ({
          jobs: [...state.jobs, { ...jobData, id: `job-${Date.now()}`, status: "interested" }],
        })),
      moveJob: (jobId, toColumn) => 
        set((state) => ({
          jobs: state.jobs.map((job) => 
            job.id === jobId ? { ...job, status: toColumn } : job
          ),
        })),
      deleteJob: (jobId) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== jobId),
        })),
    }),
    {
      name: "personal-crm-board",
    }
  )
);
