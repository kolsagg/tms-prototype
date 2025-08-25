"use client"

import { useState } from "react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
  ChartTooltip,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dashboard'dan gelen mock veriler - gerçek uygulamada API'den gelecek
const mockStats = {
  weekly: {
    total: 142, // Bu hafta gelen talepler
    resolved: 128, // Bu hafta çözülen talepler
  },
  monthly: {
    total: 568, // Bu ay gelen talepler
    resolved: 531, // Bu ay çözülen talepler
  },
  yearly: {
    total: 6742, // Bu yıl gelen talepler
    resolved: 6308, // Bu yıl çözülen talepler
  },
}

function generateChartData(period: PeriodType) {
  const stats = mockStats[period]
  return [
    {
      category: "completion",
      resolved: stats.resolved,
      remaining: stats.total - stats.resolved,
    }
  ]
}

function getPeriodLabels() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.toLocaleDateString('tr-TR', { month: 'long' })
  
  return {
    weekly: "Bu Hafta",
    monthly: `Bu Ay (${currentMonth} ${currentYear})`,
    yearly: `Bu Yıl (${currentYear})`,
  }
}

type PeriodType = "weekly" | "monthly" | "yearly"

const chartConfig = {
  resolved: {
    label: "Çözülen Talepler",
    color: "#10b981", // Green color for resolved
  },
  remaining: {
    label: "Bekleyen Talepler",
    color: "#e5e7eb", // Light gray for remaining
  },
} satisfies ChartConfig

// Custom tooltip component with Turkish labels
function CustomTooltip({ active, payload }: { active?: boolean; payload?: unknown[] }) {
  if (active && payload && payload.length) {
    const data = (payload[0] as { payload: { resolved: number; remaining: number } })?.payload
    if (data) {
      const resolvedCount = data.resolved
      const remainingCount = data.remaining
      const totalCount = resolvedCount + remainingCount
      const percentage = Math.round((resolvedCount / totalCount) * 100)
      
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[180px]">
          <div className="text-sm font-medium text-gray-900 mb-2">Talepler</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                <span className="text-gray-700">Çözülen</span>
              </div>
              <span className="font-medium text-gray-900">{resolvedCount}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-gray-300"></div>
                <span className="text-gray-700">Bekleyen</span>
              </div>
              <span className="font-medium text-gray-900">{remainingCount}</span>
            </div>
            <div className="border-t border-gray-200 pt-1 mt-2">
              <div className="flex items-center justify-between gap-3 text-xs font-medium">
                <span className="text-gray-700">Tamamlanma Oranı</span>
                <span className="text-green-600">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return null
}

export function CompletionProgressChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("monthly")
  
  const chartData = generateChartData(selectedPeriod)
  const periodLabels = getPeriodLabels()
  const currentStats = mockStats[selectedPeriod]
  const completionPercentage = Math.round((currentStats.resolved / currentStats.total) * 100)

  return (
    <Card className="flex flex-col bg-white/90 backdrop-blur-md border border-gray-100 h-[420px]">
      <CardHeader className="items-center pb-0">
        <div className="flex items-start justify-between w-full mb-2">
          <div className="text-left flex-1">
            <CardTitle className="text-base">Tamamlanma Oranı</CardTitle>
          </div>
          <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as PeriodType)}>
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="weekly" className="hover:bg-gray-100">Haftalık</SelectItem>
              <SelectItem value="monthly" className="hover:bg-gray-100">Aylık</SelectItem>
              <SelectItem value="yearly" className="hover:bg-gray-100">Yıllık</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="text-xs text-center">
          {periodLabels[selectedPeriod]}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={450}
            innerRadius={70}
            outerRadius={120}
          >
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {completionPercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className="fill-muted-foreground text-xs"
                        >
                          Tamamlandı
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="remaining"
              fill="var(--color-remaining)"
              stackId="a"
              cornerRadius={0}
              className="stroke-transparent"
            />
            <RadialBar
              dataKey="resolved"
              fill="var(--color-resolved)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-2">
        <div className="flex items-center justify-between w-full text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
            <span className="text-gray-600">Çözülen: {currentStats.resolved}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-300"></div>
            <span className="text-gray-600">Bekleyen: {currentStats.total - currentStats.resolved}</span>
          </div>
        </div>
        <div className="text-muted-foreground leading-none text-xs text-center">
          Toplam {currentStats.total} talep
        </div>
      </CardFooter>
    </Card>
  )
}
