'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { subscribeToNewsletter, type FormState } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/toaster'
import { supabase } from '@/lib/supabase/client'

type TourDate = {
  id: string
  city: string
  venue: string
  date: string
  address?: string
  time?: string
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [formState, setFormState] = useState<FormState>({})
  const [tourDates, setTourDates] = useState<TourDate[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (formState.message) {
      toast({
        title: formState.success ? 'Success!' : 'Error',
        description: formState.message,
        variant: formState.success ? 'default' : 'destructive',
      })

      if (formState.success) {
        setEmail('')
        setIsChecked(false)
      }
    }
  }, [formState, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const result = await subscribeToNewsletter(formState, formData)
      setFormState(result)
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState({
        success: false,
        message: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    const fetchTourDates = async () => {
      const { data, error } = await supabase
        .from('tour_dates')
        .select('id, city, venue, date, address, time')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching tour dates:', error)
      } else {
        setTourDates(data || [])
      }
    }

    fetchTourDates()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Social Links - now fully responsive */}
      <nav className="flex flex-wrap justify-center items-center py-4 px-4 gap-4 text-sm sm:gap-6 md:gap-8">
        <Link href="https://www.instagram.com/flowerbandlive/" className="hover:text-gray-400 transition-colors" target="_blank" rel="noopener noreferrer">Instagram</Link>
        <Link href="https://x.com/flowerbandlive" className="hover:text-gray-400 transition-colors" target="_blank" rel="noopener noreferrer">X</Link>
        <Link href="https://www.youtube.com/channel/UCJ5-agpiZAK0aemQFFVgELQ" className="hover:text-gray-400 transition-colors">YouTube</Link>
        <Link href="https://www.facebook.com/profile.php?id=61575398646073" className="hover:text-gray-400 transition-colors">Facebook</Link>
        <Link href="#" className="hover:text-gray-400 transition-colors">Spotify</Link>
        <Link href="#" className="sm:inline hover:text-gray-400 transition-colors">Apple Music</Link>
        <Link href="https://txr0hi-iu.myshopify.com/shop" className="hover:text-gray-400 transition-colors">Shop</Link>
      </nav>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/flower-logo.png"
            alt="flower. logo"
            width={400}
            height={400}
            className="mx-auto"
            priority
          />
        </div>
      </main>

      {/* Album Image Section */}
      <div className="w-full pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-lg sm:text-xl tracking-wider uppercase text-gray-300">
              Debut EP - <span className="text-white font-semibold">Welcome Home</span> - drops Summer 2025
            </p>
          </div>

          <Link href="#" className="block transition-opacity hover:opacity-90">
            <Image
              src="/images/welcome-home-album.png"
              alt="flower. - Welcome Home album cover"
              width={1200}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </Link>
        </div>
      </div>

      {/* ✨ Email Signup Section */}
      <section className="w-full bg-zinc-950 py-12 border-t border-b border-zinc-800">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center border-b border-white">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 py-2 px-0 w-full"
              />
              <Button
                type="submit"
                variant="ghost"
                disabled={isPending}
                className="text-white hover:bg-transparent hover:text-gray-300 disabled:opacity-50"
              >
                {isPending ? 'Submitting...' : 'Submit'}
                {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-start space-x-3 justify-center">
              <Checkbox
                id="marketing"
                name="marketing"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked as boolean)}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <label htmlFor="marketing" className="text-sm leading-tight text-gray-300 text-left max-w-md">
                I want to receive updates about Flower. Unsubscribe at any time. View our{' '}
                <Link href="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link>.
              </label>
            </div>
          </form>
        </div>
      </section>

      {/* Tour Dates Section */}
      <section className="w-full bg-zinc-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Tour Dates Coming Soon!</h2>

          {tourDates.length === 0 ? (
            <p className="text-center text-gray-400">No upcoming shows yet. Stay tuned!</p>
          ) : (
            <div className="space-y-6">
              {tourDates.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-zinc-800"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 opacity-70" />
                      <span className="text-lg">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{event.venue}</h3>
                    <div className="flex items-center mt-1 text-zinc-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.city}</span>
                    </div>
                    {event.address && (
                      <div className="flex items-center mt-1 text-zinc-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.address}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center mt-1 text-zinc-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
