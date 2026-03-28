import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import NotificationToast from '@/components/NotificationToast'

export const metadata = {
  title: 'Phantom Bot - WhatsApp Bot Deployment Platform',
  description: 'Deploy your Phantom WhatsApp bot with custom configuration to multiple platforms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <NotificationToast />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}