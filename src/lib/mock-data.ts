// Merkezi mock data dosyası - tüm sayfalarda aynı veri kullanılır

export interface Customer {
  id: number;
  name: string;
  relatedCustomer?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface Task {
  id: number;
  project: string;
  title: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
  startDate: string; // DD.MM.YYYY formatında
  endDate: string; // DD.MM.YYYY formatında
  estimateHours: number;
  description?: string;
}

export interface TimeRecord {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  description: string;
  billable: boolean;
}

export interface Agreement {
  id: number;
  customerInfo: string;
  agreementNumber: string;
  startDate: string; // DD.MM.YYYY formatında
  endDate: string; // DD.MM.YYYY formatında
  status: "active" | "expired" | "draft";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastLogin: string;
  status: "Aktif" | "Pasif";
  role: string;
}

export interface LeaveRequest {
  id: number;
  personName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "Onaylandı" | "Beklemede" | "Reddedildi";
  approver?: string;
  createdDate: string;
}

export interface Agreement {
  id: number;
  customerInfo: string;
  agreementNumber: string;
  startDate: string; // DD.MM.YYYY formatında
  endDate: string; // DD.MM.YYYY formatında
  status: "active" | "expired" | "draft";
}

export const mockCustomers: Customer[] = [
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

// Detay sayfası için ek bilgileri hesaplayan helper function
export function getCustomerDetails(customer: Customer) {
  return {
    ...customer,
    description: getDescription(customer.name),
    createdAt: getCreatedDate(customer.id),
    updatedAt: getUpdatedDate(customer.id),
  };
}

function getDescription(name: string): string {
  if (name.includes("ConcentIT")) return "IT Danışmanlık";
  if (name.includes("Ebtr")) return "E-ticaret";
  if (name.includes("Erhan")) return "Danışmanlık";
  if (name.includes("İnci")) return "Otomotiv Yedek Parça";
  if (name.includes("Inervo")) return "Yazılım Geliştirme";
  if (name.includes("Ismail")) return "İthalat/İhracat";
  if (name.includes("Mayesoft")) return "Yazılım";
  if (name.includes("Ntt")) return "Teknoloji";
  if (name.includes("Test")) return "Test Firması";
  if (name.includes("Uisap")) return "Danışmanlık";
  return "Genel";
}

function getCreatedDate(id: number): string {
  const dates = [
    "15.01.2024 09:30",
    "10.03.2024 11:20", 
    "25.02.2024 16:45",
    "05.04.2024 14:10",
    "12.05.2024 08:25",
    "18.06.2024 13:40",
    "22.07.2024 10:15",
    "08.08.2024 16:30",
    "14.09.2024 09:50",
    "28.10.2024 12:05"
  ];
  return dates[id - 1] || "01.01.2024 10:00";
}

function getUpdatedDate(id: number): string | null {
  // Sadece bazı müşteriler güncellenmiş
  const updateDates: { [key: number]: string } = {
    1: "20.05.2024 14:15",
    3: "18.08.2024 10:55",
    4: "15.09.2024 11:30",
    8: "25.11.2024 09:45"
  };
  return updateDates[id] || null;
}

// Tasks Mock Data
export const mockTasks: Task[] = [
  {
    id: 1,
    project: "ConcentIT Web Sitesi",
    title: "Ana Sayfa Tasarımı",
    assignee: "Ahmet Yılmaz",
    priority: "high",
    startDate: "01.12.2024",
    endDate: "15.12.2024",
    estimateHours: 40,
    description: "Ana sayfa UI/UX tasarımı ve kodlaması"
  },
  {
    id: 2,
    project: "ConcentIT Web Sitesi",
    title: "Backend API Geliştirme",
    assignee: "Mehmet Demir",
    priority: "high",
    startDate: "05.12.2024",
    endDate: "20.12.2024",
    estimateHours: 60,
    description: "RESTful API endpoints geliştirme"
  },
  {
    id: 3,
    project: "E-ticaret Platformu",
    title: "Ürün Kataloğu",
    assignee: "Ayşe Kaya",
    priority: "medium",
    startDate: "10.12.2024",
    endDate: "30.12.2024",
    estimateHours: 80,
    description: "Ürün listeleme ve detay sayfaları"
  },
  {
    id: 4,
    project: "E-ticaret Platformu", 
    title: "Sepet İşlemleri",
    assignee: "Fatma Öz",
    priority: "high",
    startDate: "15.12.2024",
    endDate: "25.12.2024",
    estimateHours: 35,
    description: "Sepete ekleme, çıkarma ve güncelleme"
  },
  {
    id: 5,
    project: "Mobil Uygulama",
    title: "Login Ekranı",
    assignee: "Can Şen",
    priority: "medium",
    startDate: "01.01.2025",
    endDate: "10.01.2025",
    estimateHours: 25,
    description: "Kullanıcı giriş ve kayıt ekranları"
  },
  {
    id: 6,
    project: "Mobil Uygulama",
    title: "Push Notification",
    priority: "low",
    startDate: "05.01.2025",
    endDate: "15.01.2025",
    estimateHours: 30,
    description: "Bildirim sistemi entegrasyonu"
  },
  {
    id: 7,
    project: "CRM Sistemi",
    title: "Müşteri Yönetimi",
    assignee: "Hasan Çelik",
    priority: "high",
    startDate: "20.12.2024",
    endDate: "10.01.2025",
    estimateHours: 50,
    description: "Müşteri CRUD işlemleri"
  },
  {
    id: 8,
    project: "CRM Sistemi",
    title: "Raporlama Modülü",
    assignee: "Zeynep Akar",
    priority: "medium",
    startDate: "25.12.2024",
    endDate: "20.01.2025",
    estimateHours: 45,
    description: "Satış ve müşteri raporları"
  }
];

// Time Records Mock Data
export const timeRecordsByTaskId: Record<number, TimeRecord[]> = {
  1: [
    { id: 1, date: "01.12.2024", startTime: "09:00", endTime: "17:00", duration: 8, description: "Ana sayfa wireframe çalışması", billable: true },
    { id: 2, date: "02.12.2024", startTime: "09:30", endTime: "16:30", duration: 7, description: "Tasarım mockup hazırlama", billable: true }
  ],
  2: [
    { id: 3, date: "05.12.2024", startTime: "10:00", endTime: "18:00", duration: 8, description: "API endpoint planlaması", billable: true },
    { id: 4, date: "06.12.2024", startTime: "09:00", endTime: "17:30", duration: 8.5, description: "Veritabanı şema tasarımı", billable: true }
  ],
  3: [
    { id: 5, date: "10.12.2024", startTime: "09:15", endTime: "17:15", duration: 8, description: "Ürün listeleme component", billable: true }
  ]
};

// Task Completion Percentage Calculation
export function computeTaskCompletionPercentage(taskId: number, estimateHours: number): number {
  const records = timeRecordsByTaskId[taskId] || [];
  
  const totalWorkedHours = records.reduce((total, record) => {
    const [startHour, startMin] = record.startTime.split(':').map(Number);
    const [endHour, endMin] = record.endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const workedMinutes = endMinutes - startMinutes;
    
    return total + (workedMinutes / 60);
  }, 0);
  
  const percentage = Math.round((totalWorkedHours / estimateHours) * 100);
  return Math.min(percentage, 100); // Max %100
}

export const mockAgreements: Agreement[] = [
  {
    id: 1,
    customerInfo: "A",
    agreementNumber: "2025-6",
    startDate: "01.08.2025",
    endDate: "31.08.2025",
    status: "active",
  },
  {
    id: 2,
    customerInfo: "ConcentIT Ltd. Şti.",
    agreementNumber: "2025-Test",
    startDate: "01.07.2025",
    endDate: "31.07.2025",
    status: "expired",
  },
  {
    id: 3,
    customerInfo: "EBTR",
    agreementNumber: "73249243",
    startDate: "01.07.2025",
    endDate: "31.12.2027",
    status: "active",
  },
  {
    id: 4,
    customerInfo: "Erhan Danışmanlık LTD.ŞTİ.",
    agreementNumber: "999999999999",
    startDate: "01.01.2025",
    endDate: "31.12.2028",
    status: "active",
  },
  {
    id: 5,
    customerInfo: "NTT DATA Türkiye",
    agreementNumber: "20240301",
    startDate: "01.03.2024",
    endDate: "31.12.2025",
    status: "active",
  },
  {
    id: 6,
    customerInfo: "Test",
    agreementNumber: "2025/2",
    startDate: "01.07.2025",
    endDate: "01.11.2025",
    status: "active",
  },
];

// Project Members Interface
export interface ProjectMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
}

// Project Milestone Interface
export interface ProjectMilestone {
  id: number;
  title: string;
  completionDate: string;
  stageType: string;
  billingType: string;
  amount: number;
  kdvRate: number;
  creationDate: string;
}

// Project Task Interface
export interface ProjectTask {
  id: number;
  title: string;
  developer: string;
  status: string;
  priority: string;
  startDate: string;
  duration: number;
  creationDate: string;
}

export interface Project {
  id: string;
  name: string;
  projectNumber: string;
  customer: string;
  status: "Aktif" | "Tamamlandı" | "Pasif";
  type: "Yazılım Projesi" | "Proje Başı" | "Fiyat Değişken";
  fabricationTime: string;
  duration: string;
  isImportant?: boolean;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Abuduwood Geliştime Projesi",
    projectNumber: "412512",
    customer: "Ismail Ali Abudawood Trading Company Limited",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "01.08.2026 - 01.08.2026",
  },
  {
    id: "2",
    name: "Dessek EBTR",
    projectNumber: "EBTR2425",
    customer: "EBTR",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "Tanımsız",
  },
  {
    id: "3",
    name: "EBTR DESSEK",
    projectNumber: "957452534",
    customer: "EBTR",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "02.07.2026",
  },
  {
    id: "4",
    name: "IATCO DESSEK",
    projectNumber: "20240523",
    customer: "Ismail Ali Abudawood Trading Company Limited",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "01.01.2024",
  },
  {
    id: "5",
    name: "İnci Roll-Out",
    projectNumber: "20240301",
    customer: "NTT DATA Türkiye",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Proje Başı",
    duration: "01.03.2024 - 31.12.2025",
    isImportant: true,
  },
  {
    id: "6",
    name: "mega",
    projectNumber: "123412",
    customer: "Inervo",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Proje Başı",
    duration: "01.01.2025 - 31.12.2025",
  },
  {
    id: "7",
    name: "Proje-A",
    projectNumber: "2025-1",
    customer: "A",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "01.08.2025 - 31.08.2025",
  },
  {
    id: "8",
    name: "Proje Test",
    projectNumber: "2025/1",
    customer: "ConcentIT Ltd. Şti.",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "01.07.2025 - 31.07.2025",
  },
  {
    id: "9",
    name: "Proje Test 2",
    projectNumber: "2025/2",
    customer: "Test",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "01.07.2025 - 01.11.2025",
  },
  {
    id: "10",
    name: "S4 Geçişi",
    projectNumber: "9999999999",
    customer: "Erhan Danışmanlık LTD.ŞTİ.",
    status: "Aktif",
    type: "Yazılım Projesi",
    fabricationTime: "Task/Milestone Bazlı",
    duration: "01.01.2025 - 31.12.2025",
  },
];

// Mock project members data
export const mockProjectMembers: Record<string, ProjectMember[]> = {
  "1": [
    { id: 1, name: "Adem Göğebakan", role: "test", phone: "0 505 618 8221", email: "aaa@gmail.com" },
    { id: 2, name: "Adem Göğebakan-B", role: "test", phone: "0 505 618 8221", email: "abc@gmail.com" }
  ],
  "2": [
    { id: 3, name: "Mehmet Yılmaz", role: "Developer", phone: "0 532 123 4567", email: "mehmet@example.com" },
    { id: 4, name: "Ayşe Demir", role: "Designer", phone: "0 543 987 6543", email: "ayse@example.com" }
  ]
};

// Mock project milestones data
export const mockProjectMilestones: Record<string, ProjectMilestone[]> = {
  "1": [
    {
      id: 1,
      title: "geliştirmeler",
      completionDate: "30.08.2025",
      stageType: "Aşama / Milestone",
      billingType: "Adam/Gün",
      amount: 100,
      kdvRate: 20,
      creationDate: "02.08.2025"
    }
  ]
};

// Mock project tasks data  
export const mockProjectTasks: Record<string, ProjectTask[]> = {
  "1": [
    {
      id: 1,
      title: "x programı",
      developer: "Fatih Yasak",
      status: "geliştirilmeler",
      priority: "Normal",
      startDate: "Tamamlandı",
      duration: 24,
      creationDate: "02.08.2025 10:54"
    }
  ]
};

// İş Türleri
export interface JobType {
  id: string;
  name: string;
}

export const mockJobTypes: JobType[] = [
  { id: "development", name: "Geliştirme" },
  { id: "design", name: "Tasarım" },
  { id: "testing", name: "Test" },
  { id: "documentation", name: "Dokümantasyon" },
  { id: "meeting", name: "Toplantı" },
  { id: "research", name: "Araştırma" },
  { id: "maintenance", name: "Bakım" },
  { id: "support", name: "Destek" },
  { id: "analysis", name: "Analiz" },
  { id: "planning", name: "Planlama" }
];

// Kullanıcılar (Atanan Kişiler)
export const mockUsers: User[] = [
  { 
    id: "1", 
    name: "Ali Yıldırım", 
    email: "ali.yildirim@concentit.com", 
    phone: "0 533 018 1100",
    lastLogin: "02.08.2025 09:38",
    status: "Aktif",
    role: "Developer" 
  },
  { 
    id: "2", 
    name: "Alper Atak", 
    email: "alper.atak@concentit.com", 
    phone: "0 532 304 8784",
    lastLogin: "13.08.2025 09:53",
    status: "Aktif",
    role: "Designer" 
  },
  { 
    id: "3", 
    name: "Ata Çetinkol", 
    email: "ata.cetinkol@concentit.com", 
    phone: "0 546 686 7009",
    lastLogin: "13.08.2025 09:46",
    status: "Aktif",
    role: "Tester" 
  },
  { 
    id: "4", 
    name: "Berkcan Temur", 
    email: "berkcan.temur@concentit.com", 
    phone: "0 539 876 8768",
    lastLogin: "13.08.2025 15:43",
    status: "Aktif",
    role: "Project Manager" 
  },
  { 
    id: "5", 
    name: "Burak Karadağ", 
    email: "burak.karadag@concentit.com", 
    phone: "0 505 095 2936",
    lastLogin: "02.08.2025 11:06",
    status: "Aktif",
    role: "Developer" 
  },
  { 
    id: "6", 
    name: "Elif Zehra Alp", 
    email: "elif.alp@concentit.com", 
    phone: "0 537 224 6476",
    lastLogin: "25.07.2025 02:46",
    status: "Aktif",
    role: "UI/UX Designer" 
  },
  { 
    id: "7", 
    name: "Emre Kolunsağ", 
    email: "emre.kolunsag@concentit.com", 
    phone: "0 534 834 5813",
    lastLogin: "25.08.2025 09:38",
    status: "Aktif",
    role: "DevOps" 
  },
  { 
    id: "8", 
    name: "Emre Zeyrek", 
    email: "emre.zeyrek@concentit.com", 
    phone: "0 544 723 9798",
    lastLogin: "30.07.2025 11:24",
    status: "Pasif",
    role: "Business Analyst" 
  },
  { 
    id: "9", 
    name: "Erhan Can Polat", 
    email: "erhan.polat@concentit.com", 
    phone: "0 545 522 3575",
    lastLogin: "02.08.2025 09:30",
    status: "Aktif",
    role: "Business Analyst" 
  },
  { 
    id: "10", 
    name: "Faruk Serdar Köse", 
    email: "serdar.kose@concentit.com", 
    phone: "0 543 158 2958",
    lastLogin: "02.08.2025 11:04",
    status: "Aktif",
    role: "Developer" 
  }
];

// İzin Başvuruları
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    personName: "Ali Yıldırım",
    leaveType: "Yıllık İzin",
    startDate: "01.09.2025",
    endDate: "08.09.2025",
    status: "Onaylandı",
    approver: "İbrahim Demir",
    createdDate: "02.08.2025 11:29"
  },
  {
    id: 2,
    personName: "Alper Atak",
    leaveType: "Sağlık Raporu",
    startDate: "04.09.2025",
    endDate: "15.09.2025",
    status: "Onaylandı",
    approver: "Fatih Yasak",
    createdDate: "01.08.2025 17:16"
  },
  {
    id: 3,
    personName: "Ata Çetinkol",
    leaveType: "Yıllık İzin",
    startDate: "01.09.2025",
    endDate: "08.09.2025",
    status: "Beklemede",
    createdDate: "02.08.2025 11:23"
  },
  {
    id: 4,
    personName: "Ata Çetinkol",
    leaveType: "Ücretsiz İzin",
    startDate: "01.07.2025",
    endDate: "02.07.2025",
    status: "Beklemede",
    createdDate: "02.08.2025 12:57"
  },
  {
    id: 5,
    personName: "Elif Zehra Alp",
    leaveType: "İdari İzin",
    startDate: "31.07.2025",
    endDate: "31.07.2025",
    status: "Reddedildi",
    approver: "Fatih Yasak",
    createdDate: "01.08.2025 18:00"
  },
  {
    id: 6,
    personName: "Elif Zehra Alp",
    leaveType: "Ücretsiz İzin",
    startDate: "21.07.2025",
    endDate: "27.07.2025",
    status: "Onaylandı",
    approver: "Fatih Yasak",
    createdDate: "01.08.2025 17:16"
  },
  {
    id: 7,
    personName: "Emre Kolunsağ",
    leaveType: "Babalık İzni",
    startDate: "01.09.2025",
    endDate: "08.09.2025",
    status: "Beklemede",
    createdDate: "01.08.2025 10:32"
  },
  {
    id: 8,
    personName: "Fatih Taşpın",
    leaveType: "Yıllık İzin",
    startDate: "08.07.2025",
    endDate: "11.07.2025",
    status: "Onaylandı",
    approver: "İbrahim Demir",
    createdDate: "25.07.2025 19:05"
  },
  {
    id: 9,
    personName: "Fatih Yasak",
    leaveType: "Yıllık İzin",
    startDate: "05.08.2025",
    endDate: "08.08.2025",
    status: "Beklemede",
    createdDate: "02.08.2025 10:41"
  },
  {
    id: 10,
    personName: "İbrahim Demir",
    leaveType: "Yıllık İzin",
    startDate: "28.07.2025",
    endDate: "31.07.2025",
    status: "Onaylandı",
    approver: "İbrahim Demir",
    createdDate: "25.07.2025 17:41"
  }
];