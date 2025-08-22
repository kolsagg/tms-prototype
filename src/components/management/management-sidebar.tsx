"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Handshake,
  ListTodo,
  Users,
  Split,
  ClockPlus,
} from "lucide-react";

type ManagementSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

const managementNav = [
  { name: "Kontrol Paneli", href: "/management/dashboard", icon: LayoutDashboard },
  { name: "Ajanda", href: "/management/calendar", icon: Calendar },
  { name: "Müşteriler", href: "/management/customers", icon: Building2 },
  { name: "Sözleşmeler", href: "/management/agreements", icon: Handshake },
  { name: "Projeler", href: "/management/projects", icon: Briefcase },
  { name: "Görevler", href: "/management/tasks", icon: ListTodo },
  { name: "Kullanıcılar", href: "/management/users", icon: Users },
  { name: "İzin Yönetimi", href: "/management/permissions", icon: Split },
  { name: "Aktivite", href: "/", icon: ClockPlus },
];

export const ManagementSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: ManagementSidebarProps) => {
  const pathname = usePathname();
  const activitySubNav = [
    { name: "Kontrol Paneli", href: "/activity/dashboard" },
    { name: "Takvim", href: "/activity/calendar" },
    { name: "İş Listesi", href: "/activity/tasks" },
    { name: "Raporlar", href: "/activity/reports" },
  ];

  const tasksSubNav = [
    { name: "Gelen Talepler", href: "#" },
    { name: "Talep Listesi", href: "/management/tasks/list" },
  ];

  return (
    <>
      <aside
        className={cn(
          "bg-white/95 backdrop-blur-md border-r border-gray-200/50 min-h-screen transition-all duration-300 fixed lg:static z-40 shadow-xl lg:shadow-none",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn(
            "absolute top-6 z-20 h-8 w-8 rounded-full bg-white border-2 border-gray-200 shadow-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hidden lg:flex items-center justify-center",
            isCollapsed ? "-right-4" : "-right-4"
          )}
          aria-label={isCollapsed ? "Menüyü genişlet" : "Menüyü daralt"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </Button>

        <div
          className={cn(
            "p-4 border-b border-gray-200/50 flex items-center",
            isCollapsed ? "justify-center" : "gap-3"
          )}
        >
          {!isCollapsed ? (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">cT</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                  ConcentIT
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  Management Suite
                </p>
              </div>
            </>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs">cT</span>
            </div>
          )}
        </div>

        <div className="flex-1 p-3">
          <div className="space-y-1">
            {managementNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isProjects = item.name === "Projeler";
              const isProjectsSectionActive = pathname.startsWith(
                "/management/projects"
              );
              const isActivity = item.name === "Aktivite";
              const isActivitySectionActive = pathname.startsWith("/activity");
              const isTasks = item.name === "Görevler";
              const isTasksSectionActive = pathname.startsWith("/management/tasks");

              if (isProjects) {
                // Special rendering for "Projeler": accordion in expanded, popover in collapsed
                if (isCollapsed) {
                  return (
                    <Popover key={item.href}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          aria-label={item.name}
                          className={cn(
                            "w-full transition-all rounded-lg relative",
                            "h-10 px-0 justify-center",
                            isProjectsSectionActive
                              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="right"
                        align="start"
                        sideOffset={12}
                        className="w-60 p-2 bg-white text-gray-900 border border-gray-200 shadow-xl"
                      >
                        <div className="flex flex-col">
                          <Link
                            href="/management/projects"
                            aria-label="Proje Yönetimi"
                            onClick={onClose}
                          >
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start gap-3 h-9 px-3 rounded-md",
                                pathname === "/management/projects"
                                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                              )}
                            >
                              <span className="text-sm">Proje Yönetimi</span>
                            </Button>
                          </Link>
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }

                return (
                  <Accordion type="single" collapsible key={item.href}>
                    <AccordionItem value="projects" className="border-0">
                      <AccordionTrigger
                        className={cn(
                          "w-full transition-all rounded-lg px-3 h-10 items-center hover:no-underline py-0",
                          isProjectsSectionActive
                            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                        )}
                        aria-label={item.name}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium text-sm truncate">
                            {item.name}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-1">
                        <div className="pl-9 pr-2 space-y-1">
                          <Link
                            href="/management/projects"
                            aria-label="Proje Yönetimi"
                          >
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start gap-3 h-9 px-3 rounded-md",
                                pathname === "/management/projects"
                                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                              )}
                              onClick={onClose}
                            >
                              <span className="text-sm">Proje Yönetimi</span>
                            </Button>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }

              if (isTasks) {
                // Special rendering for "Görevler": accordion in expanded, popover in collapsed
                if (isCollapsed) {
                  return (
                    <Popover key={item.href}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          aria-label={item.name}
                          className={cn(
                            "w-full transition-all rounded-lg relative",
                            "h-10 px-0 justify-center",
                            isTasksSectionActive
                              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="right"
                        align="start"
                        sideOffset={12}
                        className="w-60 p-2 bg-white text-gray-900 border border-gray-200 shadow-xl"
                      >
                        <div className="flex flex-col">
                          {tasksSubNav.map((sub) => (
                            <Link key={sub.href} href={sub.href} aria-label={sub.name} onClick={onClose}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 h-9 px-3 rounded-md",
                                  pathname === sub.href
                                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                                )}
                              >
                                <span className="text-sm">{sub.name}</span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }

                return (
                  <Accordion type="single" collapsible key={item.href}>
                    <AccordionItem value="tasks" className="border-0">
                      <AccordionTrigger
                        className={cn(
                          "w-full transition-all rounded-lg px-3 h-10 items-center hover:no-underline py-0",
                          isTasksSectionActive
                            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                        )}
                        aria-label={item.name}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium text-sm truncate">{item.name}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-1">
                        <div className="pl-9 pr-2 space-y-1">
                          {tasksSubNav.map((sub) => (
                            <Link key={sub.href} href={sub.href} aria-label={sub.name}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 h-9 px-3 rounded-md",
                                  pathname === sub.href
                                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                                )}
                                onClick={onClose}
                              >
                                <span className="text-sm">{sub.name}</span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }

              if (isActivity) {
                // Special rendering for "Aktivite": accordion in expanded, popover in collapsed
                if (isCollapsed) {
                  return (
                    <Popover key={item.href}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          aria-label={item.name}
                          className={cn(
                            "w-full transition-all rounded-lg relative",
                            "h-10 px-0 justify-center",
                            isActivitySectionActive
                              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="right"
                        align="start"
                        sideOffset={12}
                        className="w-60 p-2 bg-white text-gray-900 border border-gray-200 shadow-xl"
                      >
                        <div className="flex flex-col">
                          {activitySubNav.map((sub) => (
                            <Link key={sub.href} href={sub.href} aria-label={sub.name} onClick={onClose}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 h-9 px-3 rounded-md",
                                  pathname === sub.href
                                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                                )}
                              >
                                <span className="text-sm">{sub.name}</span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }

                return (
                  <Accordion type="single" collapsible key={item.href}>
                    <AccordionItem value="activity" className="border-0">
                      <AccordionTrigger
                        className={cn(
                          "w-full transition-all rounded-lg px-3 h-10 items-center hover:no-underline py-0",
                          isActivitySectionActive
                            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                        )}
                        aria-label={item.name}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium text-sm truncate">{item.name}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-1">
                        <div className="pl-9 pr-2 space-y-1">
                          {activitySubNav.map((sub) => (
                            <Link key={sub.href} href={sub.href} aria-label={sub.name}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-3 h-9 px-3 rounded-md",
                                  pathname === sub.href
                                    ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                                )}
                                onClick={onClose}
                              >
                                <span className="text-sm">{sub.name}</span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }

              return (
                <Link key={item.href} href={item.href} aria-label={item.name}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full transition-all rounded-lg relative group",
                      isCollapsed
                        ? "h-10 px-0 justify-center"
                        : "justify-start gap-3 h-10 px-3",
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                    )}
                    onClick={onClose}
                  >
                    <Icon className="flex-shrink-0 h-4 w-4" />

                    {!isCollapsed && (
                      <span className="font-medium text-sm truncate">
                        {item.name}
                      </span>
                    )}

                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}
    </>
  );
};
