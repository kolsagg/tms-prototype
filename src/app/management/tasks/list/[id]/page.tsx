"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown, Eye } from "lucide-react";
import { mockTasks } from "@/lib/mock-data";
import { TaskDetailsCard } from "./task-details-card";
import { FileUploadCard } from "@/components/ui/file-upload-card";
import { TimeEntriesTab } from "./time-entries-tab";
import { ActivityLogTab } from "./activity-log-tab";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Mock data for activity log
const mockActivityLog = [
  {
    id: 1,
    description: 'Görev güncellendi. Atanan Kişi: "Faruk Serdar Köse" → "(ID: 9a8b848a-1d5b-481c-a642-67d44ee3dd45)"; Başlangıç: "1.08.2025" → "1.08.2025 00:00:00"; Bitiş: "31.08.2025" → "31.08.2025 00:00:00"',
    user: "İbrahim Demir",
    date: "02.08.2025",
    time: "11:46"
  },
  {
    id: 2,
    description: 'Görev güncellendi. Durum: "New" → "Cancelled"; Başlangıç: "1.08.2025" → "22.08.2025"; Bitiş: "31.08.2025" → "31.08.2025 00:00:00"',
    user: "İbrahim Demir", 
    date: "02.08.2025",
    time: "11:46"
  },
  {
    id: 3,
    description: 'Görev güncellendi. Öncelik: "0" → "Normal"; Başlangıç: "1.08.2025" → "1.08.2025 00:00:00"; Bitiş: "31.08.2025" → "31.08.2025 00:00:00"',
    user: "İbrahim Demir",
    date: "02.08.2025", 
    time: "11:46"
  },
  {
    id: 4,
    description: "Görev Oluşturuldu.",
    user: "İbrahim Demir",
    date: "02.08.2025",
    time: "11:30"
  }
];

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"time-entries" | "activity-log">("time-entries");

  const task = useMemo(() => mockTasks.find((t) => t.id === id) ?? mockTasks[0], [id]);

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Görevler", href: "/management/tasks/list" },
    { label: "Görev Detayı" },
  ];

  return (
    <ManagementMainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Görev Detayı</h1>
          </div>
        </div>

        {/* Task Details and File Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Details Card - Takes 2/3 of space */}
          <div className="lg:col-span-2">
            <TaskDetailsCard task={task} />
          </div>
          
          {/* File Upload Card - Takes 1/3 of space */}
          <div className="lg:col-span-1">
            <FileUploadCard />
          </div>
        </div>

        {/* Tabs Section - Agreements style */}
        <Card className="bg-white/90 backdrop-blur border-gray-100">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100/50 px-6 pt-4 pb-0">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("time-entries")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2 ${
                    activeTab === "time-entries"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  Zaman Girişleri
                </button>
                <button
                  onClick={() => setActiveTab("activity-log")}
                  className={`pb-3 px-2 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2 ${
                    activeTab === "activity-log"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <FileDown className="h-4 w-4" />
                  İşlem Geçmişi
                </button>
              </div>
            </div>
            <div className="p-6">
              {activeTab === "time-entries" && (
                <TimeEntriesTab
                  entriesPerPage={entriesPerPage}
                  setEntriesPerPage={setEntriesPerPage}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              )}
              {activeTab === "activity-log" && (
                <ActivityLogTab
                  entriesPerPage={entriesPerPage}
                  setEntriesPerPage={setEntriesPerPage}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activityLog={mockActivityLog}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagementMainLayout>
  );
}