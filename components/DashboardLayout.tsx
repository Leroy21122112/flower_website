'use client';

import React from 'react';
import Link from 'next/link';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          Admin
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link href="/admin" className="block hover:text-gray-300">Dashboard</Link>
          <Link href="/admin/subscribers" className="block hover:text-gray-300">Subscribers</Link>
          <Link href="/admin/products" className="block hover:text-gray-300">Products</Link>
          <Link href="/admin/categories" className="block hover:text-gray-300">Categories</Link>
          <Link href="/admin/tour-dates" className="block hover:text-gray-300">Tour Dates</Link>
          <Link href="/admin/settings" className="block hover:text-gray-300">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
