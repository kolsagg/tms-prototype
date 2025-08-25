"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Users, FileText, Pencil } from "lucide-react";
import { mockCustomers, getCustomerDetails } from "@/lib/mock-data";
import { ContactsTable } from "./contacts-table";
import { InvoicesTable } from "./invoices-table";

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
    const [activeTab, setActiveTab] = useState<"contacts" | "invoices">("contacts");

    // Contact and Invoice state
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

    // ID'ye göre müşteriyi bul ve detay bilgilerini ekle
    const baseCustomer = mockCustomers.find((c) => c.id === Number(customerId));

    if (!baseCustomer) {
        // Müşteri bulunamazsa 404 sayfasına yönlendir veya hata mesajı göster
        router.push("/management/customers");
        return null;
    }

    const customer = getCustomerDetails(baseCustomer);

    // Contact handlers
    const handleAddContact = (contactData: Omit<Contact, "id">) => {
        const newContact: Contact = {
            id: Date.now(),
            ...contactData,
        };
        setContacts([...contacts, newContact]);
    };

    const handleUpdateContact = (updatedContact: Contact) => {
        setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
    };

    const handleDeleteContact = (contactId: number) => {
        setContacts(contacts.filter((c) => c.id !== contactId));
    };

    // Invoice handlers
    const handleAddInvoice = (invoiceData: Omit<Invoice, "id">) => {
        const newInvoice: Invoice = {
            id: Date.now(),
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
        <ManagementMainLayout contentClassName="max-w-none">
            <div className="flex items-center justify-between mb-6">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <PageHeader title="Müşteri Detayı" />

            {/* Müşteri Bilgileri Kartı */}
            <Card className="bg-white/90 backdrop-blur border-gray-100 mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{customer.name}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-200">
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
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
                <CardHeader className="border-b pb-6">
                    <div className="flex space-x-6">
                        <button
                            onClick={() => setActiveTab("contacts")}
                            className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                                activeTab === "contacts"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <Users className="h-4 w-4 inline mr-2" />
                            İletişim Bilgileri
                        </button>
                        <button
                            onClick={() => setActiveTab("invoices")}
                            className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                                activeTab === "invoices"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            <FileText className="h-4 w-4 inline mr-2" />
                            Fatura Bilgileri
                        </button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {activeTab === "contacts" && (
                        <ContactsTable 
                            contacts={contacts}
                            onAddContact={handleAddContact}
                            onUpdateContact={handleUpdateContact}
                            onDeleteContact={handleDeleteContact}
                        />
                    )}
                    {activeTab === "invoices" && (
                        <InvoicesTable 
                            invoices={invoices}
                            onAddInvoice={handleAddInvoice}
                            onUpdateInvoice={handleUpdateInvoice}
                            onDeleteInvoice={handleDeleteInvoice}
                        />
                    )}
                </CardContent>
            </Card>
        </ManagementMainLayout>
    );
}
