

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar';
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/Footer';
import { AppProvider } from '../../context/AppContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HouseHub.com',
  description: 'This is RealEstad Houses selling and buying webappication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <NextTopLoader />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
