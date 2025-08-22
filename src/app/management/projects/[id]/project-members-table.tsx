"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw, FileDown, Pencil, Trash2 } from "lucide-react"
import { ProjectMember } from "@/lib/mock-data"

interface ProjectMembersTableProps {
  members: ProjectMember[]
}

export function ProjectMembersTable({ members }: ProjectMembersTableProps) {
  const isEmpty = !members || members.length === 0

  if (isEmpty) {
    return (
      <div className="p-12">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.196-2.121M9 20h8v-2a3 3 0 00-2.824-2.995M7 20h2v-2a3 3 0 00-3-3 3 3 0 00-3 3v2h2zM15 9a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Proje Üyeleri</h3>
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
            <Button size="sm" className="bg-teal-500 text-white hover:bg-teal-600">
              <Plus className="h-4 w-4 mr-1" />
              Yeni Üye
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Adı Soyadı</TableHead>
              <TableHead className="font-semibold text-gray-700">Rolü</TableHead>
              <TableHead className="font-semibold text-gray-700">Arama Tarihi</TableHead>
              <TableHead className="font-semibold text-gray-700">Telefon</TableHead>
              <TableHead className="font-semibold text-gray-700">E-Mail</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
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
