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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
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
import { mockAgreements, type Agreement } from "@/lib/mock-data";
import { AgreementFormDialog } from "./agreement-form-dialog";

export default function AgreementsPage() {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateRange, setDateRange] = useState<{from?: string; to?: string}>({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [agreements, setAgreements] = useState(mockAgreements);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string | undefined>("filters");

  const getStatusBadgeClass = (status: Agreement["status"]) => {
    if (status === "active") return "bg-green-100 text-green-700";
    if (status === "expired") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = (status: Agreement["status"]) => {
    if (status === "active") return "Devam Ediyor";
    if (status === "expired") return "Süresi Doldu";
    return "Taslak";
  };

  const columns = useMemo<ColumnDef<Agreement>[]>(
    () => [
      {
        accessorKey: "customerInfo",
        header: "Müşteri Bilgisi",
        cell: ({ getValue }) => (
          <span className="font-medium whitespace-normal break-words block max-w-[200px]">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "agreementNumber",
        header: "Sözleşme Numarası",
        cell: ({ getValue }) => (
          <span className="font-mono font-medium text-gray-600">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Başlangıç Tarihi",
        cell: ({ getValue }) => (
          <span className="text-gray-600 font-medium">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "endDate",
        header: "Bitiş Tarihi",
        cell: ({ getValue }) => (
          <span className="text-gray-600 font-medium">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Sözleşme Durumu",
        cell: ({ getValue }) => {
          const status = getValue() as Agreement["status"];
          return (
            <Badge className={`border-0 px-3 py-1 ${getStatusBadgeClass(status)}`}>
              {getStatusText(status)}
            </Badge>
          );
        },
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
              onClick={() => router.push(`/management/agreements/${row.original.id}`)}
              className="hover:bg-gray-100"
            >
              <Eye className="size-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Düzenle"
              className="hover:bg-gray-100"
              onClick={() => handleEditAgreement(row.original)}
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
    data: agreements,
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
    setDateRange({});
    setGlobalFilter("");
    table.setPageIndex(0);
  };

  const handleEditAgreement = (agreement: Agreement) => {
    setEditingAgreement(agreement);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleNewAgreement = () => {
    setEditingAgreement(undefined);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/management/dashboard" },
    { label: "Sözleşme Listesi" },
  ];

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader title="Sözleşme Listesi" subtitle="Sözleşmeleri görüntüleyin ve yönetin" />

      <Card className="bg-white/90 backdrop-blur border-gray-100">
        <CardContent className="p-0">
          <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
            <AccordionItem value="filters" className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline border-b">
                <CardTitle className="text-base font-semibold">
                  Filtreler
                </CardTitle>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 pt-4">
                  <div className="space-y-2 space-x-2">
                    <label className="text-sm font-medium">
                      Sözleşme Bitiş Tarih Aralığı:
                    </label>
                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[280px] justify-start text-left font-normal"
                        >
                          <CalendarRange className="mr-2 h-4 w-4" />
                          {dateRange.from && dateRange.to ? (
                            `${new Date(dateRange.from).toLocaleDateString('tr-TR')} - ${new Date(dateRange.to).toLocaleDateString('tr-TR')}`
                          ) : dateRange.from ? (
                            `${new Date(dateRange.from).toLocaleDateString('tr-TR')} - Bitiş tarihi seçin`
                          ) : (
                            <span className="text-muted-foreground">Tarih aralığı seçin</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 bg-white border shadow-lg z-50" align="start">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Başlangıç</label>
                              <Input
                                type="date"
                                value={dateRange.from || ""}
                                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Bitiş</label>
                              <Input
                                type="date"
                                value={dateRange.to || ""}
                                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                                className="w-full"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setDateRange({});
                                setIsDatePickerOpen(false);
                              }}
                            >
                              Temizle
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setIsDatePickerOpen(false)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              Uygula
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                    >
                      Temizle
                    </Button>
                    <Button onClick={handleFilter}>
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
              Sözleşme Listesi
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
                  onClick={handleNewAgreement}
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
                          header.column.id === "customerInfo"
                            ? "whitespace-normal max-w-[200px]"
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
                          cell.column.id === "customerInfo"
                            ? "font-medium whitespace-normal break-words max-w-[200px]"
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

      <AgreementFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingAgreement={editingAgreement}
        isEditMode={isEditMode}
      />
    </ManagementMainLayout>
  );
}
