"use client"

import type React from "react"
import Header from "./header"
import Footer from "./footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* 背景图片层 */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-0"
        aria-hidden="true"
        style={{
          backgroundImage: "url(/bg-pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/90" />
      </div>
      {/* 内容层 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-20 flex flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
