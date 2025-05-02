'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';

export default function SettingsPage() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Settings" />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p className="text-gray-400">Settings management coming soon...</p>
        </main>
      </div>
    </div>
  );
}
