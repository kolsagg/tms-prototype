"use client";

import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  CalendarRange,
  Eye,
  FileDown,
  Pencil,
  Plus,
  Printer,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CustomerFormDialog } from "@/components/management/customer-form-dialog";
type Customer = {
  id: number;
  name: string;
  relatedCustomer?: string;
  phone?: string;
  email?: string;
  address?: string;
};

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "ConcentIT Ltd. Şti.",
    relatedCustomer: "",
    phone: "0 545 842 0511",
    email: "contact@concentit.com",
    address:
      "Küçükbakkalköy Mah. Vedat Günyol Cad, Defne Sk No:1 Kat:24 No: 2401-2402 Ataşehir/İstanbul",
  },
  {
    id: 2,
    name: "Ebtr",
    phone: "0 530 076 3628",
    email: "fatih.yasak@gmail.com",
    address: "İstanbul",
  },
  {
    id: 3,
    name: "Erhan Danışmanlık Ltd.Şti.",
    relatedCustomer: "ConcentIT Ltd. Şti.",
    phone: "0 545 522 3575",
    email: "erhan.polat@concentit.com",
    address: "Lüleburgaz",
  },
  {
    id: 4,
    name: "İnci Gs Yuasa",
    relatedCustomer: "NTT DATA Türkiye",
    phone: "0 236 233 2510",
    email: "info@inci.com.tr",
    address:
      "Starter Fabrika: Manisa OSB 2. Kısım Keçiliköy OSB Mahallesi Gaziler Caddesi No:6 45030 Yunusemre Manisa",
  },
  {
    id: 5,
    name: "Inervo",
    relatedCustomer: "",
    phone: "+90(532)384 6819",
    email: "kutay.emeksiz@inervo.com",
    address:
      "Cevizli Mah. Tugay Yolu Cad. No: 69C İç Kapı: 222 Plaza AYM-OfficeLink Maltepe / İstanbul",
  },
  {
    id: 6,
    name: "Ismail Ali Abudawood Trading Company Limited",
    relatedCustomer: "Inervo",
    phone: "0 216 216 1616",
    email: "info@iatco.com",
    address:
      "Sahara building 227, from 90th St. Fifth Settlement - New Cairo 11865 Cairo, Egypt.",
  },
  {
    id: 7,
    name: "Mayesoft",
    phone: "+905(555)555 5555",
    email: "YavuzKAYA@mayesoft.onmicrosoft.com",
    address: "XXX XXX XXX",
  },
  {
    id: 8,
    name: "Ntt Data Türkiye",
    phone: "0 216 600 0500",
    email: "info@ntdata.com",
    address:
      "Nidakule Ataşehir Kuzey, İş Merkezi, Barbaros Mah. Begonya Sok. No:3/A Ataşehir TR-34746 İstanbul",
  },
  {
    id: 9,
    name: "Test",
    phone: "0 216 518 8221",
    email: "test@gmail.com",
    address: "Selamiali, Bakkal Adem Sk. 2 A, 34664 Üsküdar/İstanbul",
  },
  {
    id: 10,
    name: "Uisap",
    phone: "+90(542)558 1022",
    email: "cem.dereli@uisap.com",
    address:
      "Cevizli Mah. Enderun Sokak Nursanlar C Blok Kapı No: 10 C Daire:9 Kartal / İSTANBUL",
  },
];

export default function ManagementCustomersPage() {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Adı",
        cell: ({ getValue }) => (
          <span className="font-medium whitespace-normal break-words block max-w-[260px]">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "relatedCustomer",
        header: "İlişkili Müşteri",
        cell: ({ getValue }) => <span>{String(getValue() || "-")}</span>,
      },
      {
        accessorKey: "phone",
        header: "Telefon",
        cell: ({ getValue }) => <span>{String(getValue() || "-")}</span>,
      },
      {
        accessorKey: "email",
        header: "E-Posta",
        cell: ({ getValue }) => <span>{String(getValue() || "-")}</span>,
      },
      {
        accessorKey: "address",
        header: "Adres",
        cell: ({ getValue }) => (
          <span className="block max-w-[320px] whitespace-normal break-words line-clamp-3">
            {String(getValue() || "-")}
          </span>
        ),
      },
      {
        id: "actions",
        header: () => <span className="sr-only">İşlemler</span>,
        cell: ({ row }) => (
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Görüntüle"
              onClick={() => router.push(`/management/customers/${row.original.id}`)}
              className="hover:bg-gray-100"
            >
              <Eye className="size-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Düzenle"
              className="hover:bg-gray-100"
              onClick={() => handleEditCustomer(row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Sil" className="hover:bg-gray-100">
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [router]
  );

  const table = useReactTable({
    data: customers,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleChangePageSize = (value: string) => {
    const nextSize = Number(value);
    if (!nextSize) return;
    table.setPageSize(nextSize);
  };

  const handleSearch = (value: string) => {
    setGlobalFilter(value);
    table.setPageIndex(0);
  };

  const handleFilter = () => {
    table.setPageIndex(0);
  };

  const handleClearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setGlobalFilter("");
    table.setPageIndex(0);
  };

  const handleAddCustomer = (newCustomer: Omit<Customer, "id">) => {
    const maxId = Math.max(...customers.map(c => c.id));
    const customerWithId = {
      ...newCustomer,
      id: maxId + 1,
    };
    setCustomers([...customers, customerWithId]);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ));
    setEditingCustomer(undefined);
    setIsEditMode(false);
  };

  const handleNewCustomer = () => {
    setEditingCustomer(undefined);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const breadcrumbItems = [{ label: "Anasayfa", href: "/management/dashboard" }, { label: "Müşteri Listesi" }]

  return (
    <ManagementMainLayout>
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader title="Müşteri Listesi" subtitle="Müşterileri görüntüleyin ve yönetin" />

      <Card className="bg-white/90 backdrop-blur border-gray-100">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="filters">
            <AccordionItem value="filters">
              <AccordionTrigger className="px-0">
                Sözleşme Bitiş. Tarih Aralığı
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-2 rounded-md border border-input px-3 py-1.5 bg-transparent"
                        aria-label="Tarih aralığı"
                      >
                        <CalendarRange className="size-4 text-muted-foreground" />
                        <Input
                          aria-label="Başlangıç tarihi"
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="h-9 w-40 border-0 px-0"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          aria-label="Bitiş tarihi"
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="h-9 w-40 border-0 px-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      aria-label="Filtreleri temizle"
                    >
                      Temizle
                    </Button>
                    <Button onClick={handleFilter} aria-label="Filtreleme yap">
                      Filtreleme Yap
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="h-6" />

      <Card className="bg-white/90 backdrop-blur border-gray-100">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-base font-semibold">
              Müşteri Listesi
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onValueChange={handleChangePageSize}
                >
                  <SelectTrigger aria-label="Sayfa boyutu seç">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="10" className="hover:bg-gray-100">
                      10
                    </SelectItem>
                    <SelectItem value="25" className="hover:bg-gray-100">
                      25
                    </SelectItem>
                    <SelectItem value="50" className="hover:bg-gray-100">
                      50
                    </SelectItem>
                    <SelectItem value="100" className="hover:bg-gray-100">
                      100
                    </SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  kaydı göster
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Ara:</span>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      aria-label="Ara"
                      placeholder="Ara"
                      value={globalFilter}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-8 w-56"
                    />
                  </div>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Dışa aktar"
                    className="hover:bg-gray-100"
                  >
                    <FileDown className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Yazdır"
                    className="hover:bg-gray-100"
                  >
                    <Printer className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Yenile"
                    className="hover:bg-gray-100"
                  >
                    <RefreshCcw className="size-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleNewCustomer}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  aria-label="Yeni kayıt oluştur"
                >
                  <Plus className="size-4" />
                  Yeni Kayıt
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={
                          header.column.id === "name"
                            ? "whitespace-normal max-w-[260px]"
                            : header.column.id === "actions"
                            ? "text-right"
                            : ""
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "name"
                            ? "font-medium whitespace-normal break-words max-w-[260px]"
                            : cell.column.id === "address"
                            ? "max-w-[320px] whitespace-normal break-words"
                            : cell.column.id === "actions"
                            ? "text-right"
                            : ""
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length === 0
                  ? "0 kayıttan 0 - 0 arası"
                  : `${table.getFilteredRowModel().rows.length} kayıttan ${
                      table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                      1
                    } - ${Math.min(
                      table.getFilteredRowModel().rows.length,
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize
                    )} arası`}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Önceki sayfa"
                >
                  Önceki
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-current="page"
                  aria-label={`Sayfa ${
                    table.getState().pagination.pageIndex + 1
                  }`}
                  disabled
                >
                  <span className="text-sm">
                    {table.getState().pagination.pageIndex + 1}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Sonraki sayfa"
                >
                  Sonraki
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CustomerFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        existingCustomers={customers}
        onSubmit={handleAddCustomer}
        isEdit={isEditMode}
        editingCustomer={editingCustomer}
        onUpdate={handleUpdateCustomer}
      />
    </ManagementMainLayout>
  );
}
