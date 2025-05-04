type FormState = {
  success?: boolean
  message?: string
}

export async function subscribeToNewsletter(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email')?.toString()

  if (!email) {
    return {
      success: false,
      message: 'Email is required',
    }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Supabase API error response:', errorBody)
      throw new Error(`Supabase error: ${errorBody}`)
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
