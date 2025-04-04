import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Joby - Hello World',
  description: 'A simple Hello World app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}