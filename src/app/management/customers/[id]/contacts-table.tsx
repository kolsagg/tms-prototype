import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { ContactFormDialog } from "./contact-form-dialog"

interface Contact {
  id: number
  fullName: string
  title: string
  phone: string
  email: string
}

interface ContactsTableProps {
  contacts: Contact[]
  onAddContact: (contact: Omit<Contact, "id">) => void
  onUpdateContact: (contact: Contact) => void
  onDeleteContact: (id: number) => void
}

export function ContactsTable({ contacts, onAddContact, onUpdateContact, onDeleteContact }: ContactsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(0)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | undefined>()
  const [isEditMode, setIsEditMode] = useState(false)

  const filteredContacts = useMemo(() => {
    if (!globalFilter) return contacts
    return contacts.filter(contact => 
      contact.fullName.toLowerCase().includes(globalFilter.toLowerCase()) ||
      contact.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      contact.phone.includes(globalFilter) ||
      contact.email.toLowerCase().includes(globalFilter.toLowerCase())
    )
  }, [contacts, globalFilter])

  const paginatedContacts = useMemo(() => {
    const startIndex = currentPage * parseInt(rowsPerPage)
    const endIndex = startIndex + parseInt(rowsPerPage)
    return filteredContacts.slice(startIndex, endIndex)
  }, [filteredContacts, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredContacts.length / parseInt(rowsPerPage))

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

  const handleOpenContactDialog = () => {
    setIsEditMode(false)
    setEditingContact(undefined)
    setIsContactDialogOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setIsEditMode(true)
    setEditingContact(contact)
    setIsContactDialogOpen(true)
  }

  const handleAddContactSubmit = (contactData: Omit<Contact, "id">) => {
    onAddContact(contactData)
    setIsContactDialogOpen(false)
  }

  const handleUpdateContactSubmit = (updatedContact: Contact) => {
    onUpdateContact(updatedContact)
    setIsContactDialogOpen(false)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">kayıt göster</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Ara:</span>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Ara"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
          <Button
            onClick={handleOpenContactDialog}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kayıt
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adı Soyadı</TableHead>
            <TableHead>Unvan</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedContacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                Tabloda herhangi bir veri mevcut değil
              </TableCell>
            </TableRow>
          ) : (
            paginatedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.fullName}</TableCell>
                <TableCell>{contact.title}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-gray-100"
                      onClick={() => handleEditContact(contact)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Silmek İstediğinize Emin Misiniz?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu işlem geri alınamaz. Lütfen onaylayın.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
                            İptal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteContact(contact.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
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
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-600">
          {filteredContacts.length} kayıt bulundu
        </span>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Önceki
          </Button>
          <Button variant="outline" disabled>
            {currentPage + 1}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            Sonraki
          </Button>
        </div>
      </div>

      <ContactFormDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        onSubmit={handleAddContactSubmit}
        isEdit={isEditMode}
        editingContact={editingContact}
        onUpdate={handleUpdateContactSubmit}
      />
    </div>
  )
}
