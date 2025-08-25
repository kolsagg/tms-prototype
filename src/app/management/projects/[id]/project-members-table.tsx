"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, RefreshCcw, FileDown, Pencil, Trash2, Users, Search } from "lucide-react"
import { ProjectMember } from "@/lib/mock-data"

interface ProjectMembersTableProps {
  members: ProjectMember[]
}

export function ProjectMembersTable({ members }: ProjectMembersTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(0)

  const filteredMembers = useMemo(() => {
    if (!globalFilter) return members
    return members.filter(member => 
      member.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      member.role.toLowerCase().includes(globalFilter.toLowerCase()) ||
      member.phone.includes(globalFilter) ||
      member.email.toLowerCase().includes(globalFilter.toLowerCase())
    )
  }, [members, globalFilter])

  const paginatedMembers = useMemo(() => {
    const startIndex = currentPage * parseInt(rowsPerPage)
    const endIndex = startIndex + parseInt(rowsPerPage)
    return filteredMembers.slice(startIndex, endIndex)
  }, [filteredMembers, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredMembers.length / parseInt(rowsPerPage))

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

  const isEmpty = !members || members.length === 0

  if (isEmpty) {
    return (
      <div className="p-12">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Proje Üyeleri</h3>
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
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="size-4 mr-2" />
              Yeni Üye
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-gray-700 font-medium h-12 px-4">Adı Soyadı</TableHead>
              <TableHead className="text-gray-700 font-medium">Rolü</TableHead>
              <TableHead className="text-gray-700 font-medium">Arama Tarihi</TableHead>
              <TableHead className="text-gray-700 font-medium">Telefon</TableHead>
              <TableHead className="text-gray-700 font-medium">E-Mail</TableHead>
              <TableHead className="text-gray-700 font-medium text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member) => (
                <TableRow key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900 px-4 py-3">{member.name}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{member.role}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">-</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{member.phone}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{member.email}</TableCell>
                  <TableCell className="text-center px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4" />
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
          {filteredMembers.length} kayıttan{" "}
          {currentPage * parseInt(rowsPerPage) + 1} -{" "}
          {Math.min((currentPage + 1) * parseInt(rowsPerPage), filteredMembers.length)}{" "}
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
