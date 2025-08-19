import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RefreshCcw, FileDown, Printer, ChevronLeft, ChevronRight, Users } from "lucide-react"

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
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
      <CardContent className="p-0">
        {/* Controls Section */}
        <div className="p-6 border-b bg-gradient-to-r from-gray-50/50 to-slate-50/50">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-20 border-gray-200 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600 font-medium">kayıt göster</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Ara:</span>
              <div className="flex gap-2">
                <Input
                  placeholder="Arama yapın..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-48 border-gray-200 bg-white/80"
                />
                <Button variant="outline" size="icon" className="border-gray-200 bg-white/80 hover:bg-gray-50">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-200 bg-white/80 hover:bg-gray-50">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-200 bg-white/80 hover:bg-gray-50">
                  <FileDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-200 bg-white/80 hover:bg-gray-50">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50">
                <TableHead className="font-bold text-gray-700 h-14">Ad Soyad</TableHead>
                <TableHead className="font-bold text-gray-700">Ünvan</TableHead>
                <TableHead className="font-bold text-gray-700">Müşteri</TableHead>
                <TableHead className="font-bold text-gray-700">Telefon</TableHead>
                <TableHead className="font-bold text-gray-700">E-Mail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContacts.length > 0 ? (
                paginatedContacts.map((contact) => (
                  <TableRow key={contact.id} className="border-gray-50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30">
                    <TableCell className="font-bold py-6">{contact.name}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{contact.title}</TableCell>
                    <TableCell className="text-gray-600 font-medium">{contact.customer}</TableCell>
                    <TableCell className="text-gray-600 font-medium">
                      <span className="inline-flex items-center gap-2">
                        📞 {contact.phone}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">
                      <span className="inline-flex items-center gap-2">
                        ✉️ {contact.email}
                      </span>
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

        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-slate-50/50 gap-4">
          <div className="text-sm text-gray-600 font-medium">
            {filteredContacts.length} kayıttan{" "}
            {currentPage * parseInt(rowsPerPage) + 1} -{" "}
            {Math.min((currentPage + 1) * parseInt(rowsPerPage), filteredContacts.length)}{" "}
            arasındaki kayıtlar
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-200 bg-white/80 hover:bg-gray-50 gap-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Önceki
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
              {currentPage + 1}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-200 bg-white/80 hover:bg-gray-50 gap-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Sonraki
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
