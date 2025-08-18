// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import {AuthProvider} from './components/AuthProvider.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Clockify Clone',
  description: 'Professional time tracking solution',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}