'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

type Product = {
  id: string
  title: string
  price: string
  status: string
  created_at: string
  image: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Products" />
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-400">No products found.</p>
          ) : (
            <div className="space-y-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center bg-zinc-900 border border-zinc-800 rounded p-4"
                >
                  <a href={product.image || '#'} target="_blank" rel="noopener noreferrer">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="rounded mr-4 hover:scale-105 transition-transform"
                      />
                    )}
                  </a>
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-400">Price: ${product.price}</p>
                    <p className="text-sm text-gray-500">Status: {product.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
