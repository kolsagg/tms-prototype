"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, FileDown, Eye } from "lucide-react"
import { ProjectTask } from "@/lib/mock-data"

interface ProjectTasksTableProps {
  tasks: ProjectTask[]
}

export function ProjectTasksTable({ tasks }: ProjectTasksTableProps) {
  const isEmpty = !tasks || tasks.length === 0

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "yüksek":
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "orta":
      case "normal":
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "düşük":
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isEmpty) {
    return (
      <div className="p-12">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Task/Ticket</h3>
          <p className="text-gray-500 mb-4">Tabloda herhangi bir veri mevcut değil</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Table Actions */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-500">kayıt göster</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Ara:</span>
          <input 
            type="text" 
            className="text-sm border border-gray-300 rounded px-2 py-1 w-40" 
            placeholder=""
          />
          
          {/* Action Buttons moved here */}
          <div className="flex items-center space-x-2 ml-4">
            <Button size="sm" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              <RefreshCw className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              <FileDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Başlık</TableHead>
              <TableHead className="font-semibold text-gray-700">Danışman</TableHead>
              <TableHead className="font-semibold text-gray-700">Milestone</TableHead>
              <TableHead className="font-semibold text-gray-700">Öncelik</TableHead>
              <TableHead className="font-semibold text-gray-700">Durum</TableHead>
              <TableHead className="font-semibold text-gray-700">Süre</TableHead>
              <TableHead className="font-semibold text-gray-700">Oluşturulma Tarihi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.developer}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Badge className={`px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.duration}</TableCell>
                <TableCell>{task.creationDate}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          1 kayıttan 1 - 1 arasındaki kayıtlar
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled className="text-gray-400">
            Önceki
          </Button>
          <Button size="sm" className="bg-teal-500 text-white">
            1
          </Button>
          <Button variant="outline" size="sm" disabled className="text-gray-400">
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  )
}
