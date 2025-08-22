"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { TaskFormDialog } from "../task-form-dialog";

interface Task {
  id: number;
  project: string;
  title: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
  startDate: string;
  endDate: string;
  estimateHours: number;
  description?: string;
}

interface TaskDetailsCardProps {
  task: Task;
}

export function TaskDetailsCard({ task }: TaskDetailsCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-gray-800">Görev Detayı</CardTitle>
        <TaskFormDialog
          editTask={task}
          trigger={
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 h-8 px-3 text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Düzenle
            </Button>
          }
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Sol Kolon */}
          <div className="space-y-4">
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Proje Adı:</dt>
              <dd className="text-gray-900">{task.project}</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">İş Türü:</dt>
              <dd className="text-gray-900">geliştirme3</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Atanan Kişi Adı:</dt>
              <dd className="text-gray-900">Faruk Serdar Köse</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Öncelik:</dt>
              <dd>
                <Badge className={`${getPriorityColor(task.priority)} text-xs px-2 py-1`}>
                  Normal
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Durum:</dt>
              <dd>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-xs px-2 py-1">
                  İptal Edildi
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Açıklama:</dt>
              <dd className="text-gray-900">{task.description || "test"}</dd>
            </div>
          </div>

          {/* Orta Kolon */}
          <div className="space-y-4">
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Başlangıç:</dt>
              <dd className="text-gray-900">{task.startDate}</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Bitiş:</dt>
              <dd className="text-gray-900">{task.endDate}</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Tahmini Süre (h):</dt>
              <dd className="text-gray-900">{task.estimateHours}</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Gerçekleşen Süre (h):</dt>
              <dd className="text-gray-900">0</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Tamamlanma %:</dt>
              <dd className="text-gray-900">0</dd>
            </div>
          </div>

          {/* Sağ Kolon - Tarih Bilgileri */}
          <div className="space-y-4">
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Kayıt Tarihi:</dt>
              <dd className="text-gray-900">02.08.2025 11:30</dd>
            </div>
            <div>
              <dt className="text-gray-500 mb-1 font-medium">Son İşlem Tarihi:</dt>
              <dd className="text-gray-900">02.08.2025 11:46</dd>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
