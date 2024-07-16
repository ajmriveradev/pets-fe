import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adopt-a-Pet",
  description: "Adopt Pets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='h-screen'>
          <Navbar />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
