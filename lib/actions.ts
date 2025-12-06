'use server';

import supabase from '@/lib/supabase/server';

export type FormState = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email')?.toString();
  const rawConsent = formData.get('marketing')?.toString();
  const marketing_consent = rawConsent === 'true';

  if (!email) {
    return {
      success: false,
      message: 'Email is required.',
    };
  }

  try {
    const { error } = await supabase.from('subscribers').insert([
      {
        email,
        marketing_consent,
      },
    ]);

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    }

    return {
      success: true,
      message: 'You’ve been subscribed to the newsletter!',
    };
  } catch (err: any) {
    console.error('❌ Unexpected error:', err);
    return {
      success: false,
      message: 'Unexpected error. Try again later.',
    };
  }
}
