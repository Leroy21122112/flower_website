// app/admin/layout.tsx
import '@/styles/globals.css';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-black text-white min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
