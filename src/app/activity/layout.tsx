import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Aktivite Yönetimi | ConcentIT",
    description: "Kullanıcı aktivitelerini izleyin ve yönetin",
  }

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="min-h-dvh w-full">{children}</section>
}


