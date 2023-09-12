import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter, Zen_Kaku_Gothic_New } from 'next/font/google'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'

const inter = Inter({ subsets: ['latin'] })
const zen = Zen_Kaku_Gothic_New({ subsets: ["latin"], weight: ['300', '400','700'],});

export const metadata = {
  title: 'Codex',
  description: 'A Next.js 13 Threads-like Codex Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={zen.className}>
          <Topbar />
          
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className = 'w-full max-w-4x1'>
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
