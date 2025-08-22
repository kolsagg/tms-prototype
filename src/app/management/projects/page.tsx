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
import { mockProjects, type Project } from "@/lib/mock-data";

export default function ManagementProjectsPage() {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [projects] = useState(mockProjects);

  // Get unique customers for filter dropdown
  const uniqueCustomers = useMemo(() => {
    const customers = Array.from(new Set(projects.map(p => p.customer)));
    return customers.sort();
  }, [projects]);

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Proje Adı",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2 max-w-[200px]">
            <span className="font-medium whitespace-normal break-words">
              {String(getValue())}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "projectNumber",
        header: "Proje Numarası",
        cell: ({ getValue }) => (
          <span className="font-mono">{String(getValue())}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Müşteri",
        cell: ({ getValue }) => (
          <span className="block max-w-[250px] whitespace-normal break-words">
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Durum",
        cell: ({ getValue }) => {
          const status = String(getValue());
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === "Aktif" 
                ? "bg-green-100 text-green-800" 
                : status === "Tamamlandı"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Proje Tipi",
        cell: ({ getValue }) => <span>{String(getValue())}</span>,
      },
      {
        accessorKey: "fabricationTime",
        header: "Faturalama Tipi",
        cell: ({ getValue }) => <span>{String(getValue())}</span>,
      },
      {
        accessorKey: "duration",
        header: "Proje Dönemi",
        cell: ({ getValue }) => (
          <span className="block max-w-[150px] whitespace-normal break-words text-sm">
            {String(getValue())}
          </span>
        ),
      },
      {
        id: "actions",
        header: "İşlemler",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Görüntüle"
              onClick={() => router.push(`/management/projects/${row.original.id}`)}
              className="hover:bg-gray-100"
            >
              <Eye className="size-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              aria-label="Düzenle"
              className="hover:bg-gray-100"
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

  const filteredData = useMemo(() => {
    let filtered = projects;
    
    if (customerFilter && customerFilter !== "all") {
      filtered = filtered.filter(project => 
        project.customer.includes(customerFilter)
      );
    }
    
    return filtered;
  }, [projects, customerFilter]);

  const table = useReactTable({
    data: filteredData,
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
    setCustomerFilter("all");
    setGlobalFilter("");
    table.setPageIndex(0);
  };

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/management/dashboard" }, 
    { label: "Proje Listesi" }
  ];

  return (
    <ManagementMainLayout contentClassName="max-w-none">
      <Breadcrumb items={breadcrumbItems} />

      <PageHeader title="Proje Listesi" subtitle="Projeleri görüntüleyin ve yönetin" />

      <Card className="bg-white/90 backdrop-blur border-gray-100">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold">
            Filtrelenebilir Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible defaultValue="filters">
            <AccordionItem value="filters">
              <AccordionTrigger className="px-0">
                Müşteri Bilgisi
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Select 
                        value={customerFilter} 
                        onValueChange={setCustomerFilter}
                      >
                        <SelectTrigger className="w-[400px]">
                          <SelectValue placeholder="-- Seçiniz --" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-60">
                          <SelectItem value="all" className="hover:bg-gray-100">
                            Tümü
                          </SelectItem>
                          {uniqueCustomers.map((customer) => (
                            <SelectItem 
                              key={customer} 
                              value={customer}
                              className="hover:bg-gray-100"
                            >
                              {customer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    <Button 
                      onClick={handleFilter} 
                      aria-label="Filtreleme yap"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
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
              Proje Listesi
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
                  <SelectTrigger aria-label="Sayfa boyutu seç" className="w-16">
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
                            ? "whitespace-normal max-w-[200px]"
                            : header.column.id === "customer"
                            ? "whitespace-normal max-w-[250px]"
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
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={
                            cell.column.id === "name"
                              ? "font-medium whitespace-normal break-words max-w-[200px]"
                              : cell.column.id === "customer"
                              ? "max-w-[250px] whitespace-normal break-words"
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Bu parametrelerde filvreleme yapabilirsiniz.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length === 0
                  ? "10 kayıttan 1 - 10 arasındaki kayıtlar"
                  : `${table.getFilteredRowModel().rows.length} kayıttan ${
                      table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                      1
                    } - ${Math.min(
                      table.getFilteredRowModel().rows.length,
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize
                    )} arasındaki kayıtlar`}
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
                
                <div className="flex items-center gap-1">
                  {table.getCanPreviousPage() && (
                    <Button variant="outline" size="icon" onClick={() => table.setPageIndex(0)}>
                      <span className="text-sm">1</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    aria-current="page"
                    aria-label={`Sayfa ${
                      table.getState().pagination.pageIndex + 1
                    }`}
                    disabled
                    className="bg-gray-100"
                  >
                    <span className="text-sm font-medium">
                      {table.getState().pagination.pageIndex + 1}
                    </span>
                  </Button>
                  {table.getCanNextPage() && (
                    <Button variant="outline" size="icon">
                      <span className="text-sm">Sonraki</span>
                    </Button>
                  )}
                </div>

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
    </ManagementMainLayout>
  );
}
