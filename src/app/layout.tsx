import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Cristian Giehl Dev',
    default: 'Cristian Giehl Dev',
  },
  description: 'Cristian Giehl Corretor de Imóveis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">{children}</body>
    </html>
  )
}
