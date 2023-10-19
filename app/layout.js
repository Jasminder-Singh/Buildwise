import './globals.css'
const inter = Inter({ subsets: ['latin'] });
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar/navbar';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Provider from './provider';

export const metadata = {
  title: 'Buildwise',
  description: 'Buildwise website for renting the construction tools for customers',
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html >
  )
}
