"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/alert-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowLeft, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { mockCustomers, getCustomerDetails } from "@/lib/mock-data";
import { ContactFormDialog } from "@/app/management/customers/[id]/contact-form-dialog";
import { InvoiceFormDialog } from "@/app/management/customers/[id]/invoice-form-dialog";

interface Contact {
    id: number;
    fullName: string;
    title: string;
    phone: string;
    email: string;
}

interface Invoice {
    id: number;
    title: string;
    taxOffice: string;
    taxNumber: string;
    address: string;
}

const mockContacts: Contact[] = [];

const mockInvoices: Invoice[] = [];

export default function CustomerDetailPage() {
    const router = useRouter();
    const params = useParams();
    const customerId = params.id;

    // Contact form dialog state
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | undefined>();
    const [isEditMode, setIsEditMode] = useState(false);

    // Invoice form dialog state
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | undefined>();
    const [isInvoiceEditMode, setIsInvoiceEditMode] = useState(false);
    const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);

    // ID'ye göre müşteriyi bul ve detay bilgilerini ekle
    const baseCustomer = mockCustomers.find((c) => c.id === Number(customerId));

    if (!baseCustomer) {
        // Müşteri bulunamazsa 404 sayfasına yönlendir veya hata mesajı göster
        router.push("/management/customers");
        return null;
    }

    const customer = getCustomerDetails(baseCustomer);

    const handleGoBack = () => {
        router.push("/management/customers");
    };

    // Contact dialog handlers
    const handleOpenContactDialog = () => {
        setIsEditMode(false);
        setEditingContact(undefined);
        setIsContactDialogOpen(true);
    };

    const handleEditContact = (contact: Contact) => {
        setIsEditMode(true);
        setEditingContact(contact);
        setIsContactDialogOpen(true);
    };

    const handleAddContact = (contactData: Omit<Contact, "id">) => {
        const newContact: Contact = {
            id: Date.now(), // Simple ID generation for demo
            ...contactData,
        };
        setContacts([...contacts, newContact]);
    };

    const handleUpdateContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map((c) =>
                c.id === updatedContact.id ? updatedContact : c
            )
        );
    };

    const handleDeleteContact = (contactId: number) => {
        setContacts(contacts.filter((c) => c.id !== contactId));
    };

    // Invoice dialog handlers
    const handleOpenInvoiceDialog = () => {
        setIsInvoiceEditMode(false);
        setEditingInvoice(undefined);
        setIsInvoiceDialogOpen(true);
    };

    const handleEditInvoice = (invoice: Invoice) => {
        setIsInvoiceEditMode(true);
        setEditingInvoice(invoice);
        setIsInvoiceDialogOpen(true);
    };

    const handleAddInvoice = (invoiceData: Omit<Invoice, "id">) => {
        const newInvoice: Invoice = {
            id: Date.now(), // Simple ID generation for demo
            ...invoiceData,
        };
        setInvoices([...invoices, newInvoice]);
    };

    const handleUpdateInvoice = (updatedInvoice: Invoice) => {
        setInvoices(invoices.map(i => i.id === updatedInvoice.id ? updatedInvoice : i));
    };

    const handleDeleteInvoice = (invoiceId: number) => {
        setInvoices(invoices.filter(i => i.id !== invoiceId));
    };

    const breadcrumbItems = [
        { label: "Anasayfa", href: "/management/dashboard" },
        { label: "Müşteri Listesi", href: "/management/customers" },
        { label: "Müşteri Detayı" },
    ];

    return (
        <ManagementMainLayout>
            <div className="flex items-center justify-between mb-6">
                <Breadcrumb items={breadcrumbItems} />
                <Button
                    onClick={handleGoBack}
                    variant="outline"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600">
                    <ArrowLeft className="size-4 mr-2" />
                    Geri Dön
                </Button>
            </div>

            <PageHeader title="Müşteri Detayı" />

            {/* Müşteri Bilgileri Kartı */}
            <Card className="bg-white/90 backdrop-blur border-gray-100 mb-6">
                <CardHeader className="bg-slate-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                        <span>{customer.name}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-white hover:text-slate-600">
                            <Pencil className="size-4 mr-2" />
                            Düzenle
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Müşteri Adı:
                                </dt>
                                <dd className="text-emerald-600 font-medium">
                                    {customer.name}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Adres:
                                </dt>
                                <dd>{customer.address}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    E-Posta:
                                </dt>
                                <dd>{customer.email}</dd>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Telefon:
                                </dt>
                                <dd>{customer.phone}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Açıklama:
                                </dt>
                                <dd>{customer.description}</dd>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    İşlem Tarihi:
                                </dt>
                                <dd>{customer.createdAt}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">
                                    Güncelleme Tarihi:
                                </dt>
                                <dd>{customer.updatedAt || "-"}</dd>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Sekmeli Bölüm */}
            <Card className="bg-white/90 backdrop-blur border-gray-100">
                <CardContent className="p-0">
                    <Tabs defaultValue="contacts" className="w-full">
                        <div className="border-b px-6 pt-4">
                            <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100">
                                <TabsTrigger
                                    value="contacts"
                                    className="flex items-center gap-2">
                                    <Eye className="size-4" />
                                    İletişim Bilgileri
                                </TabsTrigger>
                                <TabsTrigger
                                    value="invoices"
                                    className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="size-4 p-0 rounded-full bg-blue-100 text-blue-600">
                                        📄
                                    </Badge>
                                    Fatura Bilgileri
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* İletişim Bilgileri Sekmesi */}
                        <TabsContent value="contacts" className="mt-0 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">
                                        kayıt göster
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        Ara:
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Ara"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64"
                                    />
                                    <Button
                                        onClick={handleOpenContactDialog}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                        <Plus className="size-4 mr-2" />
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
                                        <TableHead className="text-right">
                                            İşlemler
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contacts.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center py-8 text-gray-500">
                                                Tabloda herhangi bir veri mevcut
                                                değil
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        contacts.map((contact) => (
                                            <TableRow key={contact.id}>
                                                <TableCell>
                                                    {contact.fullName}
                                                </TableCell>
                                                <TableCell>
                                                    {contact.title}
                                                </TableCell>
                                                <TableCell>
                                                    {contact.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {contact.email}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="hover:bg-gray-100"
                                                            onClick={() =>
                                                                handleEditContact(
                                                                    contact
                                                                )
                                                            }>
                                                            <Pencil className="size-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="hover:bg-gray-100"
                                                                    >
                                                                    <Trash2 className="size-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Silmek
                                                                        İstediğinize
                                                                        Emin
                                                                        Misiniz?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Bu işlem
                                                                        geri
                                                                        alınamaz.
                                                                        Lütfen
                                                                        onaylayın.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel
                                                                    className="bg-gray-100 hover:bg-gray-200">
                                                                        İptal
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDeleteContact(
                                                                                contact.id
                                                                            )
                                                                        }
                                                                        className="bg-red-600 text-white hover:bg-red-700">
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

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm text-gray-600">
                                    {contacts.length} kayıt bulundu
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" disabled>
                                        Önceki
                                    </Button>
                                    <Button variant="outline" disabled>
                                        1
                                    </Button>
                                    <Button variant="outline" disabled>
                                        Sonraki
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Fatura Bilgileri Sekmesi */}
                        <TabsContent value="invoices" className="mt-0 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">
                                        kayıt göster
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        Ara:
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Ara"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64"
                                    />
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleOpenInvoiceDialog}>
                                        <Plus className="size-4 mr-2" />
                                        Yeni Kayıt
                                    </Button>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Başlık</TableHead>
                                        <TableHead>Vergi Dairesi</TableHead>
                                        <TableHead>Vergi Numarası</TableHead>
                                        <TableHead>Adres</TableHead>
                                        <TableHead className="text-right">
                                            İşlemler
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoices.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center py-8 text-gray-500">
                                                Tabloda herhangi bir veri mevcut
                                                değil
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        invoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell>
                                                    {invoice.title}
                                                </TableCell>
                                                <TableCell>
                                                    {invoice.taxOffice}
                                                </TableCell>
                                                <TableCell>
                                                    {invoice.taxNumber}
                                                </TableCell>
                                                <TableCell>
                                                    {invoice.address}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="hover:bg-gray-100"
                                                            onClick={() => handleEditInvoice(invoice)}>
                                                            <Pencil className="size-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="hover:bg-gray-100">
                                                                    <Trash2 className="size-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Silmek
                                                                        İstediğinize
                                                                        Emin
                                                                        Misiniz?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Bu işlem
                                                                        geri
                                                                        alınamaz.
                                                                        Lütfen
                                                                        onaylayın.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
                                                                        İptal
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDeleteInvoice(
                                                                                invoice.id
                                                                            )
                                                                        }
                                                                        className="bg-red-600 text-white hover:bg-red-700">
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

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm text-gray-600">
                                    {invoices.length} kayıt bulundu
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" disabled>
                                        Önceki
                                    </Button>
                                    <Button variant="outline" disabled>
                                        1
                                    </Button>
                                    <Button variant="outline" disabled>
                                        Sonraki
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Contact Form Dialog */}
            <ContactFormDialog
                open={isContactDialogOpen}
                onOpenChange={setIsContactDialogOpen}
                onSubmit={handleAddContact}
                isEdit={isEditMode}
                editingContact={editingContact}
                onUpdate={handleUpdateContact}
            />

            {/* Invoice Form Dialog */}
            <InvoiceFormDialog
                open={isInvoiceDialogOpen}
                onOpenChange={setIsInvoiceDialogOpen}
                onSubmit={handleAddInvoice}
                isEdit={isInvoiceEditMode}
                editingInvoice={editingInvoice}
                onUpdate={handleUpdateInvoice}
            />
        </ManagementMainLayout>
    );
}
