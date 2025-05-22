type FormState = {
  success?: boolean
  message?: string
}

export async function subscribeToNewsletter(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email')?.toString()
  
  // FIX 1: Get the actual checkbox value, not just if it exists
  const marketingValue = formData.get('marketing')
  const marketing = marketingValue === 'on' || marketingValue === 'true' || marketingValue === true
  
  console.log('Debug - Email:', email)
  console.log('Debug - Marketing raw value:', marketingValue)
  console.log('Debug - Marketing processed:', marketing)

  if (!email) {
    return {
      success: false,
      message: 'Email is required',
    }
  }

  try {
    // FIX 2: Save BOTH email and marketing consent to Supabase
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ 
        email,
        marketing_consent: marketing  // ADD THIS LINE
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Supabase API error response:', errorBody)
      throw new Error(`Supabase error: ${errorBody}`)
    }

    // Send data to Make via API endpoint
    try {
      const makeResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          marketing,
          timestamp: new Date().toISOString(),
          source: 'flower_website'
        }),
      });

      if (!makeResponse.ok) {
        console.error('Failed to send data to Make:', await makeResponse.text());
      }
    } catch (makeError) {
      console.error('Error sending to Make:', makeError);
    }

    return {
      success: true,
      message: 'Thanks for subscribing!',
    }
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}

export type { FormState }