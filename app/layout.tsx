'use client'; // Ensure this directive is present

import { AuthProvider } from '@/lib/auth/AuthContext'
import { ReactNode } from 'react';
import '@/styles/globals.css'; // Import global styles here

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-zinc-950 text-white">
        {/* Wrap the app with AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
