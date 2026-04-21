"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Mail, MapPin, CalendarDays } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type TourDate = {
  id: string;
  city: string;
  venue: string;
  date: string;
  address?: string;
  time?: string;
};

export default function Home() {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);

  useEffect(() => {
    const fetchTourDates = async () => {
      const { data, error } = await supabase
        .from("tour_dates")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data) {
        setTourDates(data);
      }
    };

    fetchTourDates();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="w-full border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/80">
            <Link href="/tour" className="hover:text-white transition-colors">
              Tour
            </Link>
            <Link href="/booking" className="hover:text-white transition-colors">
              Booking
            </Link>
            <Link
              href="https://txr0hi-iu.myshopify.com/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Shop
            </Link>
          </div>

          <div className="flex items-center gap-4 text-white/70">
            <a
              href="https://www.instagram.com/flowerbandlive/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@flowerbandlive"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </nav>

      <section className="flex min-h-[85vh] items-center justify-center px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <div className="mb-8">
            <Image
              src="/images/flower-logo.png"
              alt="flower. logo"
              width={700}
              height={220}
              priority
              className="mx-auto h-auto w-full max-w-[520px]"
            />
          </div>

          <p className="mb-8 text-sm uppercase tracking-[0.35em] text-white/70 sm:text-base">
            Alt Shoegaze Metal • Houston TX
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://open.spotify.com/album/5FBDkZe5NpfiaSWqwk3147"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
            >
              Listen Now
            </a>

            <Link
              href="/booking"
              className="rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
            >
              Booking
            </Link>

            <Link
              href="https://txr0hi-iu.myshopify.com/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
            >
              Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/50">
              Current Release
            </p>

            <h2 className="mb-6 text-4xl font-semibold uppercase tracking-[0.12em] sm:text-5xl">
              Welcome Home
            </h2>

            <p className="mb-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              Stream the latest release from flower. and stay connected for new music,
              live dates, and upcoming announcements.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://open.spotify.com/album/5FBDkZe5NpfiaSWqwk3147"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
              >
                Spotify
              </a>

              <a
                href="https://www.youtube.com/@flowerbandlive"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
              >
                YouTube
              </a>

              <Link
                href="/booking"
                className="rounded-full border border-white/30 px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
              >
                Booking
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/welcome-home-album.png"
              alt="Welcome Home album cover"
              width={520}
              height={520}
              className="h-auto w-full max-w-[420px]"
            />
            <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/50">
              Welcome Home
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/50">
              Tour / Live
            </p>
            <h2 className="text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
              Upcoming Dates
            </h2>
          </div>

          {tourDates.length > 0 ? (
            <div className="space-y-4">
              {tourDates.map((show) => (
                <div
                  key={show.id}
                  className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[160px_1fr_auto]"
                >
                  <div className="flex items-center gap-2 text-white/70">
                    <CalendarDays size={16} />
                    <span>{show.date}</span>
                  </div>

                  <div>
                    <p className="text-lg font-medium text-white">{show.venue}</p>
                    <p className="flex items-center gap-2 text-white/70">
                      <MapPin size={16} />
                      {show.city}
                    </p>
                    {show.time && (
                      <p className="mt-1 text-sm text-white/50">{show.time}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <a
                      href="mailto:flowerbandlive@gmail.com"
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="mb-3 text-lg text-white">
                Now booking Houston, Texas and regional dates.
              </p>
              <p className="mb-6 text-white/70">
                For support slots, festivals, club shows, and touring inquiries:
              </p>
              <a
                href="mailto:flowerbandlive@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
              >
                <Mail size={16} />
                flowerbandlive@gmail.com
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/50">
            Booking
          </p>
          <h2 className="mb-6 text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">
            Let’s Connect
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            flower. is available for clubs, support slots, festivals, private events,
            regional runs, and touring opportunities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
            >
              View Booking Page
            </Link>

            <a
              href="mailto:flowerbandlive@gmail.com"
              className="rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
            >
              Email Booking
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}