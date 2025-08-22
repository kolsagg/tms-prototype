"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, RefreshCw, FileDown, FileUp, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { ProjectMilestone } from "@/lib/mock-data"
import { MilestoneEditDialog } from "./milestone-edit-dialog"

interface ProjectMilestonesTableProps {
  milestones: ProjectMilestone[]
}

export function ProjectMilestonesTable({ milestones }: ProjectMilestonesTableProps) {
  const [editingMilestone, setEditingMilestone] = useState<ProjectMilestone | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingMilestone, setDeletingMilestone] = useState<ProjectMilestone | null>(null)
  
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
            <Button size="sm" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              <FileUp className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              <MoreHorizontal className="h-4 w-4 mr-1" />
            </Button>
            <Button size="sm" className="bg-teal-500 text-white hover:bg-teal-600">
              <Plus className="h-4 w-4 mr-1" />
              Yeni Bölüm
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
              <TableHead className="font-semibold text-gray-700">Bitiş Tarihi</TableHead>
              <TableHead className="font-semibold text-gray-700">Aşama Türü</TableHead>
              <TableHead className="font-semibold text-gray-700">Faturalama Tipi</TableHead>
              <TableHead className="font-semibold text-gray-700">Para Birimi</TableHead>
              <TableHead className="font-semibold text-gray-700">Birim Fiyat</TableHead>
              <TableHead className="font-semibold text-gray-700">KDV Oranı</TableHead>
              <TableHead className="font-semibold text-gray-700">Oluşturulma Tarihi</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{milestone.title}</TableCell>
                <TableCell>{milestone.completionDate}</TableCell>
                <TableCell>{milestone.stageType}</TableCell>
                <TableCell>{milestone.billingType}</TableCell>
                <TableCell>EUR</TableCell>
                <TableCell>{milestone.amount}</TableCell>
                <TableCell>{milestone.kdvRate}</TableCell>
                <TableCell>{milestone.creationDate}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={() => handleEditClick(milestone)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog open={deletingMilestone?.id === milestone.id} onOpenChange={(open) => !open && handleDeleteCancel()}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
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
