import type { TimeRecord } from "@/types/project"

export type Task = {
  id: number
  title: string
  project: string
  priority: "low" | "medium" | "high"
  startDate: string
  endDate: string
  estimateHours: number
  assignedAt: string
  assignee?: string
  description?: string
}

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "ABAP kodlarının revizesi",
    project: "IATCO DESTEK / Destek Hizmetleri",
    priority: "high",
    startDate: "02.08.2025",
    endDate: "03.08.2025",
    estimateHours: 10,
    assignedAt: "02.08.2025 10:42",
    assignee: "Emre Kolunsağ",
    description: "CR maddelerinde müşteri tarafından talep edilen ABAP hatalarının düzeltilmesi ve optimizasyonu.",
  },
  {
    id: 2,
    title: "test",
    project: "IATCO DESTEK / Geliştirme2",
    priority: "medium",
    startDate: "02.08.2025",
    endDate: "06.08.2025",
    estimateHours: 10,
    assignedAt: "02.08.2025 11:13",
    assignee: "Emre Kolunsağ",
    description: "Modül üzerinde genel geliştirmeler ve testler.",
  },
  {
    id: 3,
    title: "deneme",
    project: "Bilkent",
    priority: "low",
    startDate: "02.08.2025",
    endDate: "06.10.2025",
    estimateHours: 100,
    assignedAt: "01.08.2025 11:13",
    assignee: "Emre Kolunsağ",
    description: "Yeni deneme görevi için detay açıklama.",
  },
]

export const timeRecordsByTaskId: Record<number, TimeRecord[]> = {
  1: [
    {
      id: 1,
      date: "2025-08-02",
      startTime: "09:00",
      endTime: "15:00",
      duration: 6,
      description: "Genel çalışma ve kod incelemesi",
      billable: true,
    },
    {
      id: 2,
      date: "2025-08-02",
      startTime: "09:00",
      endTime: "13:00",
      duration: 4,
      description: "Kod revizyonu ve test",
      billable: true,
    },
  ],
  2: [
    {
      id: 1,
      date: "2025-08-03",
      startTime: "09:00",
      endTime: "19:00",
      duration: 10,
      description: "Geliştirme çalışması",
      billable: true,
    },
  ],
  3: [],
}

export function computeTaskActualHours(taskId: number): number {
  const records = timeRecordsByTaskId[taskId] ?? []
  return records.reduce((sum, r) => sum + (r.duration || 0), 0)
}

export function computeTaskCompletionPercentage(taskId: number, estimateHours?: number): number {
  const task = mockTasks.find((t) => t.id === taskId)
  const est = estimateHours ?? task?.estimateHours ?? 0
  if (est <= 0) return 0
  const actual = computeTaskActualHours(taskId)
  return Math.round((actual / est) * 100)
}


