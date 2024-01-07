import { Inter } from 'next/font/google'
import '@/scss/global.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Three.js',
  description: 'Three.js Sandbox',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}
