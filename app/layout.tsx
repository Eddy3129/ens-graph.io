import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ENS Social Network | Explore Ethereum Identities',
  description:
    'Explore ENS profiles and visualize social connections on Ethereum. View all on-chain data and build your network graph.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
