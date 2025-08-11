
import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Yönetim Paneli | ConcentIT",
    description: "Yönetim paneline hoş geldiniz",
  }

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="min-h-dvh w-full">{children}</section>
}


