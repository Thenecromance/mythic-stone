import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mythic Stone Plus',
  description: 'Made with ❤️ by Thenecromance',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
