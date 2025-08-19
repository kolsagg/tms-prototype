"use client";

import { useMemo, useState } from "react";

import { ManagementMainLayout } from "@/components/management/management-main-layout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayEventsDialog } from "@/app/management/calendar/day-events-dialog";

type ViewMode = "month" | "week" | "day";

interface CalendarEvent {
    id: string;
    title: string;
    project?: string;
    start: string; // ISO
    end?: string; // ISO
    color: "blue" | "green" | "purple" | "amber";
}

type DayCell = {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
};

export default function CalendarPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("month");
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    
    // User events - sadece görüntüleme için
    const userEvents = useMemo<CalendarEvent[]>(() => [], []);

    // Day events dialog state
    const [isDayEventsDialogOpen, setIsDayEventsDialogOpen] = useState(false);
    const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
    const [selectedDialogDate, setSelectedDialogDate] = useState<Date>(new Date());
    const userProjects = useMemo(
        () => [
            { id: "iatco", name: "IATCO" },
            { id: "bilkent", name: "BİLKENT" },
            { id: "ilbak", name: "İLBAK" },
            { id: "limak", name: "LİMAK" },
        ],
        []
    );

    const projectIdToName = useMemo(() => {
        return userProjects.reduce<Record<string, string>>((m, p) => {
            m[p.id] = p.name;
            return m;
        }, {});
    }, [userProjects]);

    const breadcrumbItems = useMemo(
        () => [
            { label: "Anasayfa", href: "/" },
            { label: "Yönetim Paneli", href: "/management/dashboard" },
            { label: "Ajanda" },
        ],
        []
    );

    const handleDayDoubleClick = (date: Date, events: CalendarEvent[]) => {
        setSelectedDialogDate(date);
        setSelectedDayEvents(events);
        setIsDayEventsDialogOpen(true);
    };

    const currentLabel = useMemo(() => {
        const formatter = new Intl.DateTimeFormat("tr-TR", {
            month: "long",
            year: "numeric",
        });
        const label = formatter.format(currentDate);
        return label.charAt(0).toUpperCase() + label.slice(1);
    }, [currentDate]);

    function addMonths(date: Date, months: number) {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    }

    function addDays(date: Date, days: number) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }

    function formatDateKey(date: Date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    const monthDays: DayCell[] = useMemo(() => {
        const first = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        const day = (first.getDay() + 6) % 7; // Monday=0
        const start = new Date(first);
        start.setDate(first.getDate() - day);
        const days: DayCell[] = [];
        const todayKey = formatDateKey(new Date());
        for (let i = 0; i < 42; i += 1) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const inCurrentMonth = d.getMonth() === currentDate.getMonth();
            days.push({
                date: d,
                inCurrentMonth,
                isToday: formatDateKey(d) === todayKey,
            });
        }
        return days;
    }, [currentDate]);

    const mockDataset = useMemo<CalendarEvent[]>(() => {
        const now = new Date();
        const months = [0, 1, 2].map(
            (off) => new Date(now.getFullYear(), now.getMonth() + off, 1)
        );
        const data: CalendarEvent[] = [];
        const make = (
            y: number,
            m: number,
            day: number,
            color: CalendarEvent["color"],
            title: string,
            project?: string
        ): CalendarEvent => ({
            id: `${y}-${m + 1}-${day}-${title}`,
            title,
            project,
            start: new Date(y, m, day, 9, 0, 0).toISOString(),
            end: new Date(y, m, day, 11, 0, 0).toISOString(),
            color,
        });
        months.forEach((d, i) => {
            const y = d.getFullYear();
            const m = d.getMonth();
            data.push(
                make(y, m, 1, "blue", "Matco Destek - Geliştirme", "iatco"),
                make(y, m, 8, "blue", "Sprint Planlama", "bilkent"),
                make(y, m, 12 + i, "blue", "Kod İncelemesi", "bilkent"),
                make(y, m, 14 + i, "blue", "Müşteri Toplantısı", "ilbak"),
                make(y, m, 21, "blue", "Yayın Hazırlığı", "bilkent"),
                make(y, m, 25, "blue", "QA Senaryoları", "iatco"),
                make(y, m, 28, "blue", "Retrospektif", "limak")
            );
        });
        return data;
    }, []);

    const eventsByDay = useMemo(() => {
        const merged = [...mockDataset, ...userEvents];
        return merged.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
            const d = new Date(ev.start);
            const key = formatDateKey(d);
            acc[key] = acc[key] || [];
            acc[key].push(ev);
            return acc;
        }, {});
    }, [mockDataset, userEvents]);

    const weekdayLabels = ["Pts", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"];

    return (
        <ManagementMainLayout>
            <Breadcrumb items={breadcrumbItems} />

            <PageHeader title="Ajanda" />

            <div className="w-full">
                <Card className="bg-white/90 backdrop-blur-md border-gray-100">
                    <CardHeader className="border-b">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    aria-label="Önceki"
                                    onClick={() => {
                                        if (viewMode === "month")
                                            setCurrentDate((d) =>
                                                addMonths(d, -1)
                                            );
                                        if (viewMode === "week") {
                                            setSelectedDate((d) =>
                                                addDays(d, -7)
                                            );
                                            setCurrentDate((d) =>
                                                addDays(d, -7)
                                            );
                                        }
                                        if (viewMode === "day") {
                                            setSelectedDate((d) =>
                                                addDays(d, -1)
                                            );
                                            setCurrentDate((d) =>
                                                addDays(d, -1)
                                            );
                                        }
                                    }}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    aria-label="Sonraki"
                                    onClick={() => {
                                        if (viewMode === "month")
                                            setCurrentDate((d) =>
                                                addMonths(d, 1)
                                            );
                                        if (viewMode === "week") {
                                            setSelectedDate((d) =>
                                                addDays(d, 7)
                                            );
                                            setCurrentDate((d) =>
                                                addDays(d, 7)
                                            );
                                        }
                                        if (viewMode === "day") {
                                            setSelectedDate((d) =>
                                                addDays(d, 1)
                                            );
                                            setCurrentDate((d) =>
                                                addDays(d, 1)
                                            );
                                        }
                                    }}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentDate(new Date())}>
                                    Bugün
                                </Button>
                                <CardTitle className="text-xl sm:text-2xl ml-1">
                                    {currentLabel}
                                </CardTitle>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={
                                        viewMode === "month"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setViewMode("month")}>
                                    Ay
                                </Button>
                                <Button
                                    variant={
                                        viewMode === "week"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setViewMode("week")}>
                                    Hafta
                                </Button>
                                <Button
                                    variant={
                                        viewMode === "day"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setViewMode("day")}>
                                    Gün
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {viewMode === "month" && (
                            <div className="rounded-xl border bg-white overflow-hidden">
                                <div className="grid grid-cols-7 border-b bg-gray-50/60 text-xs font-medium text-gray-600">
                                    {weekdayLabels.map((d) => (
                                        <div
                                            key={d}
                                            className="px-3 py-2 text-center uppercase tracking-wide">
                                            {d}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 auto-rows-[minmax(90px,1fr)] sm:auto-rows-[minmax(110px,1fr)] lg:auto-rows-[minmax(130px,1fr)]">
                                    {monthDays.map((day) => {
                                        const key = formatDateKey(day.date);
                                        const dayEvents =
                                            eventsByDay[key] || [];
                                        const isSelected =
                                            formatDateKey(selectedDate) === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setSelectedDate(day.date);
                                                }}
                                                onDoubleClick={() => {
                                                    handleDayDoubleClick(day.date, dayEvents);
                                                }}
                                                className={
                                                    "group relative flex flex-col items-stretch border-r border-b p-2 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/30"
                                                }
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                }}>
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        className={
                                                            "text-sm font-medium " +
                                                            (day.inCurrentMonth
                                                                ? "text-gray-900"
                                                                : "text-gray-400")
                                                        }>
                                                        {day.date.getDate()}
                                                    </span>
                                                    {day.isToday && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                                                            Bugün
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-2 flex flex-col gap-1">
                                                    {dayEvents
                                                        .slice(0, 2)
                                                        .map((ev) => (
                                                            <div
                                                                key={ev.id}
                                                                className={
                                                                    "rounded-md border px-2 py-1 text-[11px] font-medium " +
                                                                    colorToClasses(
                                                                        ev.color
                                                                    )
                                                                }
                                                                title={`${
                                                                    ev.title
                                                                }${
                                                                    ev.project
                                                                        ? ` • ${
                                                                              projectIdToName[
                                                                                  ev
                                                                                      .project
                                                                              ]
                                                                          }`
                                                                        : ""
                                                                }`}>
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <span className="truncate">
                                                                        {
                                                                            ev.title
                                                                        }
                                                                    </span>
                                                                    {ev.project && (
                                                                        <span className="shrink-0 rounded bg-white/80 px-1 py-[1px] text-[9px] font-semibold text-gray-700 border border-gray-200">
                                                                            {
                                                                                projectIdToName[
                                                                                    ev
                                                                                        .project
                                                                                ]
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    {dayEvents.length > 2 && (
                                                        <div className="text-[11px] text-gray-500">
                                                            +
                                                            {dayEvents.length -
                                                                2}{" "}
                                                            daha fazla
                                                        </div>
                                                    )}
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute inset-0 ring-2 ring-blue-500/60 rounded-sm pointer-events-none" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {viewMode === "week" && (
                            <div className="rounded-xl border bg-white overflow-hidden">
                                {(() => {
                                    const day = (selectedDate.getDay() + 6) % 7;
                                    const start = addDays(selectedDate, -day);
                                    const days = Array.from(
                                        { length: 7 },
                                        (_, i) => addDays(start, i)
                                    );
                                    return (
                                        <>
                                            <div className="grid grid-cols-7 border-b bg-gray-50/60 text-xs font-medium text-gray-600">
                                                {days.map((d, i) => (
                                                    <div
                                                        key={i}
                                                        className="px-3 py-2 text-center uppercase tracking-wide">
                                                        {weekdayLabels[i]}{" "}
                                                        {d.getDate()}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-7">
                                                {days.map((d, i) => {
                                                    const key =
                                                        formatDateKey(d);
                                                    const dayEvents =
                                                        eventsByDay[key] || [];
                                                    return (
                                                        <button
                                                            key={i}
                                                            className="min-h-[200px] border-r p-3 text-left"
                                                            onDoubleClick={() => {
                                                                handleDayDoubleClick(d, dayEvents);
                                                            }}
                                                        >
                                                            <div className="flex flex-col gap-2">
                                                                {dayEvents.length ===
                                                                    0 && (
                                                                    <div className="text-xs text-gray-400">
                                                                        Etkinlik
                                                                        yok
                                                                    </div>
                                                                )}
                                                                {dayEvents.map(
                                                                    (ev) => (
                                                                        <div
                                                                            key={
                                                                                ev.id
                                                                            }
                                                                            className={
                                                                                "rounded-md border px-2 py-1 text-xs " +
                                                                                colorToClasses(
                                                                                    ev.color
                                                                                )
                                                                            }
                                                                            title={`${
                                                                                ev.title
                                                                            }${
                                                                                ev.project
                                                                                    ? ` • ${
                                                                                          projectIdToName[
                                                                                              ev
                                                                                                  .project
                                                                                          ]
                                                                                      }`
                                                                                    : ""
                                                                            }`}>
                                                                            <div className="flex items-center justify-between gap-2">
                                                                                <span className="truncate">
                                                                                    {
                                                                                        ev.title
                                                                                    }
                                                                                </span>
                                                                                {ev.project && (
                                                                                    <span className="shrink-0 rounded bg-white/80 px-1 py-[1px] text-[10px] font-semibold text-gray-700 border border-gray-200">
                                                                                        {
                                                                                            projectIdToName[
                                                                                                ev
                                                                                                    .project
                                                                                            ]
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}

                        {viewMode === "day" && (
                            <div
                                className="rounded-xl border bg-white overflow-hidden p-4"
                                onDoubleClick={() => {
                                    const key = formatDateKey(selectedDate);
                                    const dayEvents = eventsByDay[key] || [];
                                    handleDayDoubleClick(selectedDate, dayEvents);
                                }}
                            >
                                {(() => {
                                    const key = formatDateKey(selectedDate);
                                    const dayEvents = eventsByDay[key] || [];
                                    return (
                                        <div className="space-y-3">
                                            <div className="text-sm text-gray-600">
                                                {selectedDate.toLocaleDateString(
                                                    "tr-TR",
                                                    {
                                                        weekday: "long",
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </div>
                                            {dayEvents.length === 0 && (
                                                <div className="text-sm text-gray-400">
                                                    Etkinlik yok.{" "}
                                                </div>
                                            )}
                                            {dayEvents.map((ev) => (
                                                <div
                                                    key={ev.id}
                                                    className={
                                                        "rounded-lg border p-3 text-sm " +
                                                        colorToClasses(ev.color)
                                                    }
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }>
                                                    <div className="font-medium">
                                                        {ev.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        09:00 - 11:00{" "}
                                                        {ev.project
                                                            ? projectIdToName[
                                                                  ev.project
                                                              ]
                                                            : ""}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Day Events Dialog */}
            <DayEventsDialog
                open={isDayEventsDialogOpen}
                onOpenChange={setIsDayEventsDialogOpen}
                date={selectedDialogDate}
                events={selectedDayEvents}
                projectIdToName={projectIdToName}
            />
        </ManagementMainLayout>
    );
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

// kept for potential reuse if we show colored bullets elsewhere
// function dotColor(color: CalendarEvent["color"]): string {
//   switch (color) {
//     case "blue":
//       return "bg-blue-600"
//     case "green":
//       return "bg-green-600"
//     case "purple":
//       return "bg-purple-600"
//     case "amber":
//       return "bg-amber-500"
//   }
// }