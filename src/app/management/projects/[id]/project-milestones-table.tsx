"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, RefreshCcw, FileDown, FileUp, MoreHorizontal, Pencil, Trash2, Search } from "lucide-react"
import { ProjectMilestone } from "@/lib/mock-data"
import { MilestoneEditDialog } from "./milestone-edit-dialog"

interface ProjectMilestonesTableProps {
  milestones: ProjectMilestone[]
}

export function ProjectMilestonesTable({ milestones }: ProjectMilestonesTableProps) {
  const [editingMilestone, setEditingMilestone] = useState<ProjectMilestone | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingMilestone, setDeletingMilestone] = useState<ProjectMilestone | null>(null)
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(0)

  const filteredMilestones = useMemo(() => {
    if (!globalFilter) return milestones
    return milestones.filter(milestone => 
      milestone.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      milestone.stageType.toLowerCase().includes(globalFilter.toLowerCase()) ||
      milestone.billingType.toLowerCase().includes(globalFilter.toLowerCase())
    )
  }, [milestones, globalFilter])

  const paginatedMilestones = useMemo(() => {
    const startIndex = currentPage * parseInt(rowsPerPage)
    const endIndex = startIndex + parseInt(rowsPerPage)
    return filteredMilestones.slice(startIndex, endIndex)
  }, [filteredMilestones, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredMilestones.length / parseInt(rowsPerPage))

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
  
  const handleEditClick = (milestone: ProjectMilestone) => {
    setEditingMilestone(milestone)
    setIsEditDialogOpen(true)
  }

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false)
    setEditingMilestone(null)
  }

  const handleSaveMilestone = (updatedMilestone: ProjectMilestone) => {
    // Here you would typically update the milestone in your data store
    console.log("Saving milestone:", updatedMilestone)
  }

  const handleDeleteClick = (milestone: ProjectMilestone) => {
    setDeletingMilestone(milestone)
  }

  const handleDeleteConfirm = () => {
    if (deletingMilestone) {
      // Here you would typically delete the milestone from your data store
      console.log("Deleting milestone:", deletingMilestone)
      setDeletingMilestone(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeletingMilestone(null)
  }

  const isEmpty = !milestones || milestones.length === 0

  if (isEmpty) {
    return (
      <div className="p-12">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Milestones</h3>
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
              Yeni Bölüm
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-gray-700 font-medium h-12 px-4">Başlık</TableHead>
              <TableHead className="text-gray-700 font-medium">Bitiş Tarihi</TableHead>
              <TableHead className="text-gray-700 font-medium">Aşama Türü</TableHead>
              <TableHead className="text-gray-700 font-medium">Faturalama Tipi</TableHead>
              <TableHead className="text-gray-700 font-medium">Para Birimi</TableHead>
              <TableHead className="text-gray-700 font-medium">Birim Fiyat</TableHead>
              <TableHead className="text-gray-700 font-medium">KDV Oranı</TableHead>
              <TableHead className="text-gray-700 font-medium">Oluşturulma Tarihi</TableHead>
              <TableHead className="text-gray-700 font-medium text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMilestones.length > 0 ? (
              paginatedMilestones.map((milestone) => (
                <TableRow key={milestone.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900 px-4 py-3">{milestone.title}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{milestone.completionDate}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{milestone.stageType}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{milestone.billingType}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">EUR</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{milestone.amount}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{milestone.kdvRate}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{milestone.creationDate}</TableCell>
                  <TableCell className="text-center px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100"
                        onClick={() => handleEditClick(milestone)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog open={deletingMilestone?.id === milestone.id} onOpenChange={(open) => !open && handleDeleteCancel()}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-100"
                            onClick={() => handleDeleteClick(milestone)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bölüm Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              &ldquo;{milestone.title}&rdquo; bölümünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleDeleteCancel}>İptal</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDeleteConfirm}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-12">
                  <div className="text-gray-500">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
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
          {filteredMilestones.length} kayıttan{" "}
          {currentPage * parseInt(rowsPerPage) + 1} -{" "}
          {Math.min((currentPage + 1) * parseInt(rowsPerPage), filteredMilestones.length)}{" "}
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

      {/* Milestone Edit Dialog */}
      <MilestoneEditDialog
        milestone={editingMilestone || undefined}
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveMilestone}
      />
    </div>
  )
}
