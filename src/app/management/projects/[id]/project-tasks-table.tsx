"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RefreshCcw, FileDown, FileUp, MoreHorizontal, Eye, Plus, Search } from "lucide-react"
import { ProjectTask } from "@/lib/mock-data"

interface ProjectTasksTableProps {
  tasks: ProjectTask[]
}

export function ProjectTasksTable({ tasks }: ProjectTasksTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(0)

  const filteredTasks = useMemo(() => {
    if (!globalFilter) return tasks
    return tasks.filter(task => 
      task.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      task.developer.toLowerCase().includes(globalFilter.toLowerCase()) ||
      task.status.toLowerCase().includes(globalFilter.toLowerCase()) ||
      task.priority.toLowerCase().includes(globalFilter.toLowerCase())
    )
  }, [tasks, globalFilter])

  const paginatedTasks = useMemo(() => {
    const startIndex = currentPage * parseInt(rowsPerPage)
    const endIndex = startIndex + parseInt(rowsPerPage)
    return filteredTasks.slice(startIndex, endIndex)
  }, [filteredTasks, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredTasks.length / parseInt(rowsPerPage))

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

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

  const isEmpty = !tasks || tasks.length === 0

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
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
            <SelectTrigger className="w-16" aria-label="Sayfa boyutu seç">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="5" className="hover:bg-gray-100">5</SelectItem>
              <SelectItem value="10" className="hover:bg-gray-100">10</SelectItem>
              <SelectItem value="25" className="hover:bg-gray-100">25</SelectItem>
              <SelectItem value="50" className="hover:bg-gray-100">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">kayıt göster</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Ara:</span>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                aria-label="Ara"
                placeholder="Ara"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 w-56 h-9"
              />
            </div>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hover:bg-gray-100 h-9 w-9">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 h-9 w-9">
              <FileDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 h-9 w-9">
              <FileUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="size-4 mr-2" />
              Yeni Görev
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-gray-700 font-medium h-12 px-4">Başlık</TableHead>
              <TableHead className="text-gray-700 font-medium">Danışman</TableHead>
              <TableHead className="text-gray-700 font-medium">Milestone</TableHead>
              <TableHead className="text-gray-700 font-medium">Öncelik</TableHead>
              <TableHead className="text-gray-700 font-medium">Durum</TableHead>
              <TableHead className="text-gray-700 font-medium">Süre</TableHead>
              <TableHead className="text-gray-700 font-medium">Oluşturulma Tarihi</TableHead>
              <TableHead className="text-gray-700 font-medium text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <TableRow key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900 px-4 py-3">{task.title}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{task.developer}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{task.status}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">
                    <Badge className={`px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{task.startDate}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{task.duration}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{task.creationDate}</TableCell>
                  <TableCell className="text-center px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="text-gray-500">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <p>Kayıt bulunamadı.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap py-4">
        <p className="text-sm text-gray-600">
          {filteredTasks.length} kayıttan{" "}
          {currentPage * parseInt(rowsPerPage) + 1} -{" "}
          {Math.min((currentPage + 1) * parseInt(rowsPerPage), filteredTasks.length)}{" "}
          arasındaki kayıtlar
        </p>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Önceki
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="bg-blue-600 text-white hover:bg-blue-600"
          >
            {currentPage + 1}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  )
}
