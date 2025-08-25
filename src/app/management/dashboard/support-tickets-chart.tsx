"use client"

import { useState, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data generator - in real app this would come from API
function generateMockData(min: number, max: number): { cozulen: number; acilan: number } {
  const acilan = Math.floor(Math.random() * (max - min + 1)) + min
  const cozulen = Math.floor(Math.random() * acilan) // Çözülen sayısı açılandan az olmalı
  return { cozulen, acilan }
}

function generateChartData() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() // 0-based
  const currentDate = now.getDate()
  
  // Yıllık data - Ocak'tan Aralık'a kadar (Ay-Yıl formatında)
  const yearly = []
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ]
  
  for (let i = 0; i < 12; i++) {
    const hasData = i <= currentMonth // Sadece geçmiş ve mevcut ay için data
    const data = hasData ? generateMockData(80, 200) : { cozulen: 0, acilan: 0 }
    yearly.push({
      period: `${monthNames[i]} ${currentYear}`,
      ...data
    })
  }

  // Bu hafta - gün-ay-gün kısaltması formatında (25 Ağt. Pzt.)
  const thisWeek = []
  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
  const monthNamesShort = [
    "Ock", "Şbt", "Mrt", "Nsn", "Mys", "Hzr",
    "Tmz", "Ağt", "Eyl", "Ekm", "Ksm", "Arl"
  ]
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay() + 1) // Pazartesi'yi bul
  
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek)
    dayDate.setDate(startOfWeek.getDate() + i)
    const isPast = dayDate <= now
    const data = isPast ? generateMockData(1, 8) : { cozulen: 0, acilan: 0 }
    const dayOfMonth = dayDate.getDate()
    const monthShort = monthNamesShort[dayDate.getMonth()]
    const dayShort = dayNames[i]
    
    thisWeek.push({
      period: `${dayOfMonth} ${monthShort}. ${dayShort}.`,
      ...data
    })
  }

  // Bu ay - gün-ay-gün kısaltması formatında
  const thisMonth = []
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const monthShort = monthNamesShort[currentMonth]
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isPast = i <= currentDate
    const data = isPast ? generateMockData(1, 7) : { cozulen: 0, acilan: 0 }
    const dayDate = new Date(currentYear, currentMonth, i)
    const dayOfWeek = dayDate.getDay()
    const dayShort = dayNames[dayOfWeek === 0 ? 6 : dayOfWeek - 1] // Pazar = 0, Pazartesi = 1
    
    thisMonth.push({
      period: `${i} ${monthShort}. ${dayShort}.`,
      ...data
    })
  }

  // Son 3 ay - Ay-Yıl formatında
  const last3Months = []
  for (let i = 2; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1)
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()
    last3Months.push({
      period: `${monthName} ${year}`,
      ...generateMockData(100, 220)
    })
  }

  // Son 6 ay - Ay-Yıl formatında
  const last6Months = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1)
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()
    last6Months.push({
      period: `${monthName} ${year}`,
      ...generateMockData(90, 200)
    })
  }

  return {
    yearly,
    "this-week": thisWeek,
    "this-month": thisMonth,
    "last-3-months": last3Months,
    "last-6-months": last6Months
  }
}

function generatePeriodLabels() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.toLocaleDateString('tr-TR', { month: 'long' })
  
  return {
    "yearly": `Yıllık (Ocak - Aralık ${currentYear})`,
    "this-week": "Bu Hafta",
    "this-month": `Bu Ay (${currentMonth} ${currentYear})`,
    "last-3-months": "Son 3 Ay",
    "last-6-months": "Son 6 Ay"
  }
}

const chartConfig = {
  cozulen: {
    label: "Çözülen Talepler",
    color: "#3b82f6",
  },
  acilan: {
    label: "Açılan Talepler",
    color: "#06d6a0",
  },
} satisfies ChartConfig

type PeriodType = "yearly" | "this-week" | "this-month" | "last-3-months" | "last-6-months"

// Custom tooltip component with opaque background
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: unknown[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: unknown, index: number) => {
          const typedEntry = entry as { dataKey: string; value: number; color: string }
          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: typedEntry.color }}
              />
              <span className="text-gray-700">
                {typedEntry.dataKey === 'cozulen' ? 'Çözülen Talepler' : 'Açılan Talepler'}: {typedEntry.value}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export function SupportTicketsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("last-6-months")
  
  const chartDataSets = useMemo(() => generateChartData(), [])
  const periodLabels = useMemo(() => generatePeriodLabels(), [])

  return (
    <Card className="bg-white/90 backdrop-blur-md border border-gray-100 h-[420px]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <CardTitle className="text-base">Talepler Analizi</CardTitle>
          </div>
          <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as PeriodType)}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="yearly" className="hover:bg-gray-100">Yıllık</SelectItem>
              <SelectItem value="last-6-months" className="hover:bg-gray-100">Son 6 Ay</SelectItem>
              <SelectItem value="last-3-months" className="hover:bg-gray-100">Son 3 Ay</SelectItem>
              <SelectItem value="this-month" className="hover:bg-gray-100">Bu Ay</SelectItem>
              <SelectItem value="this-week" className="hover:bg-gray-100">Bu Hafta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="text-xs">
          {periodLabels[selectedPeriod]}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart accessibilityLayer data={chartDataSets[selectedPeriod]} maxBarSize={30}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="cozulen"
              stackId="a"
              fill="var(--color-cozulen)"
              radius={[0, 0, 2, 2]}
            />
            <Bar
              dataKey="acilan"
              stackId="a"
              fill="var(--color-acilan)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs pt-0">
        <div className="text-muted-foreground leading-none">
          Talep analiz verileri
        </div>
      </CardFooter>
    </Card>
  )
}
