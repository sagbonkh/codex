import { ClerkProvider } from "@clerk/nextjs"
import { Inter, Zen_Kaku_Gothic_New } from "next/font/google"
import '../globals.css';

export const metadata = {
    title: 'Codex',
    description: 'A Next.js 13 Threads-like Codex Application'
}

// const inter = Inter({ subsets: ["latin"]})
const zen = Zen_Kaku_Gothic_New({ subsets: ["latin"], weight: ['300', '400','700'],});

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className= {`${zen.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}