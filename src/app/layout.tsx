import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { cn } from '@/utils/cn'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          roboto.className,
          "text-[#F1F1F1] min-h-screen bg-[url('/images/background.jpg')] bg-cover bg-fixed",
        )}
      >
        {children}
      </body>
    </html>
  )
}
