import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.SHOPIFY_ACCESS_TOKEN
  const shop = process.env.SHOPIFY_STORE_NAME

  if (!token || !shop) {
    return res.status(500).json({ error: 'Missing Shopify token or store name in environment variables.' })
  }

  try {
    const response = await fetch(`https://${shop}/admin/api/2023-04/products.json`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      return res.status(response.status).json({ error: errorBody })
    }

    const data = await response.json()
    res.status(200).json({ products: data.products || [] })
  } catch (error) {
    console.error('Shopify API error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
