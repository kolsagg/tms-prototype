"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  id: string;
  title: string;
  project?: string;
  start: string; // ISO
  end?: string; // ISO
  color: "blue" | "green" | "purple" | "amber";
}

interface DayEventsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  events: CalendarEvent[];
  projectIdToName: Record<string, string>;
}

function colorToClasses(color: CalendarEvent["color"]): string {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "green":
      return "bg-green-50 text-green-700 border-green-200";
    case "purple":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "amber":
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export function DayEventsDialog({
  open,
  onOpenChange,
  date,
  events,
  projectIdToName,
}: DayEventsDialogProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-700 font-semibold">
            {formatDate(date)} - Etkinlikler
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Bu gün için herhangi bir etkinlik bulunmuyor.
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`rounded-lg border p-4 ${colorToClasses(event.color)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                      <span>
                        {formatTime(event.start)}
                        {event.end && ` - ${formatTime(event.end)}`}
                      </span>
                      {event.project && (
                        <>
                          <span>•</span>
                          <Badge 
                            variant="secondary" 
                            className="text-xs px-2 py-0.5 bg-white/80 text-gray-700 border border-gray-200"
                          >
                            {projectIdToName[event.project]}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
