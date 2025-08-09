export interface Project {
    id: string
    name: string
    type: string
    assignee: string
    priority: "low" | "medium" | "high"
    status: "pending" | "in-progress" | "completed"
    description: string
    startDate: string
    endDate: string
    estimatedHours: number
    actualHours: number
    completionPercentage: number
  }
  
  export interface TimeRecord {
    id: number
    date: string
    startTime: string
    endTime: string
    duration: number
    description: string
    billable: boolean
  }