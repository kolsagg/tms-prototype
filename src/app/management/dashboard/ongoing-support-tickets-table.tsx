"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"
import { mockSupportTickets, type SupportTicket } from "@/lib/mock-data"

export function OngoingSupportTicketsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const itemsPerPage = 10

  // Sadece "Devam Ediyor" durumundaki talepleri filtrele
  const ongoingTickets = mockSupportTickets.filter(ticket => ticket.status === "Devam Ediyor")
  
  // Pagination hesaplamaları
  const totalPages = Math.ceil(ongoingTickets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = ongoingTickets.slice(startIndex, endIndex)

  const handleViewTask = (ticketId: number) => {
    router.push(`/management/tasks/list/${ticketId}`)
  }

  const getPriorityColor = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "Yüksek":
        return "bg-red-100 text-red-800"
      case "Orta":
        return "bg-yellow-100 text-yellow-800"
      case "Düşük":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: SupportTicket["status"]) => {
    switch (status) {
      case "Devam Ediyor":
        return "bg-blue-100 text-blue-800"
      case "Başlamadı":
        return "bg-gray-100 text-gray-800"
      case "Tamamlandı":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Devam Eden Talepler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Başlık</TableHead>
                <TableHead className="w-[150px]">Proje</TableHead>
                <TableHead className="w-[120px]">Atanan Kişi</TableHead>
                <TableHead className="w-[80px]">Öncelik</TableHead>
                <TableHead className="w-[80px]">Durum</TableHead>
                <TableHead className="w-[100px]">Başlangıç</TableHead>
                <TableHead className="w-[80px]">Bitiş</TableHead>
                <TableHead className="w-[80px]">Tahmini (h)</TableHead>
                <TableHead className="w-[80px]">Gerçek (h)</TableHead>
                <TableHead className="w-[100px]">Tamamlanma %</TableHead>
                <TableHead className="w-[80px] text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>{ticket.project}</TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{ticket.startDate}</TableCell>
                  <TableCell className="text-sm">{ticket.endDate}</TableCell>
                  <TableCell className="text-center">{ticket.estimateHours}</TableCell>
                  <TableCell className="text-center">{ticket.completedHours}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(ticket.completionPercentage, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium min-w-[30px]">{ticket.completionPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewTask(ticket.id)}
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
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {startIndex + 1} kayıt - {Math.min(endIndex, ongoingTickets.length)} arası {ongoingTickets.length} kayıttan
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-xs"
            >
              Önceki
            </Button>
            
            {getPageNumbers().map((page, index) => (
              <div key={index}>
                {page === "..." ? (
                  <span className="px-2 text-sm">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page as number)}
                    className="text-xs min-w-[32px]"
                  >
                    {page}
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-xs"
            >
              Sonraki
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
