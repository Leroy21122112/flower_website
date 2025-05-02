'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Product = {
  id: string
  title: string
  price: string
  image: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/shopify/products')
      const data = await res.json()
      setProducts(data.products || [])
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-white hover:text-gray-400 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">flower.</h1>
        </div>
      </header>

      {/* Shop Content */}
      <main className="flex-1 px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-8">Shop</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-center"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="rounded-lg mb-4 w-full h-auto object-cover"
                />
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-400 mb-4">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-zinc-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} flower. All rights reserved.
      </footer>
    </div>
  )
}
