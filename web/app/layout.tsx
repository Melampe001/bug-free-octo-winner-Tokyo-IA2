import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TokyoIA - AI-Powered Casino Platform',
  description: 'Experience the future of gaming with AI-powered casino platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
