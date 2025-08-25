import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RefreshCcw, FileDown, Printer, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator";

interface Contact {
  id: number
  name: string
  title: string
  customer: string
  phone: string
  email: string
}

interface ContactsTableProps {
  contacts: Contact[]
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(0)

  const filteredContacts = useMemo(() => {
    if (!globalFilter) return contacts
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      contact.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      contact.customer.toLowerCase().includes(globalFilter.toLowerCase()) ||
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
              <FileDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 h-9 w-9">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 h-9 w-9">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-gray-700 font-medium h-12 px-4">Ad Soyad</TableHead>
              <TableHead className="text-gray-700 font-medium">Ünvan</TableHead>
              <TableHead className="text-gray-700 font-medium">Müşteri</TableHead>
              <TableHead className="text-gray-700 font-medium">Telefon</TableHead>
              <TableHead className="text-gray-700 font-medium">E-Mail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact) => (
                <TableRow key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900 px-4 py-3">{contact.name}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{contact.title}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{contact.customer}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{contact.phone}</TableCell>
                  <TableCell className="text-gray-700 px-4 py-3">{contact.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
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
          {filteredContacts.length} kayıttan{" "}
          {currentPage * parseInt(rowsPerPage) + 1} -{" "}
          {Math.min((currentPage + 1) * parseInt(rowsPerPage), filteredContacts.length)}{" "}
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
