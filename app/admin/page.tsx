'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'

export default function AdminPage() {
  const [productsCount, setProductsCount] = useState(0)
  const [subscribersCount, setSubscribersCount] = useState(0)
  const [tourDatesCount, setTourDatesCount] = useState(0)
  const [categoriesCount, setCategoriesCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // ✅ Supabase counts
        const [{ count: subscribers }, { count: tours }, { count: categories }] = await Promise.all([
          supabase.from('subscribers').select('*', { count: 'exact', head: true }),
          supabase.from('tour_dates').select('*', { count: 'exact', head: true }),
          supabase.from('categories').select('*', { count: 'exact', head: true }),
        ])
        setSubscribersCount(subscribers || 0)
        setTourDatesCount(tours || 0)
        setCategoriesCount(categories || 0)

        // ✅ Count from local mock data (until dynamic product loading is restored)
        const mockProducts = [
          { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' },
        ]
        setProductsCount(mockProducts.length)
      } catch (error) {
        console.error('Error fetching dashboard counts:', error)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="flex h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Admin Dashboard" />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-zinc-900 border border-zinc-800 text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Products</h2>
                <p className="text-3xl">{productsCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-zinc-800 text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Subscribers</h2>
                <p className="text-3xl">{subscribersCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-zinc-800 text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Categories</h2>
                <p className="text-3xl">{categoriesCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-zinc-800 text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Tour Dates</h2>
                <p className="text-3xl">{tourDatesCount}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
