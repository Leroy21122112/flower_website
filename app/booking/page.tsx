import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking | flower.",
  description: "Book flower. for clubs, support slots, festivals, tours, and private events.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-6">
            Booking
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-white/80 leading-8">
            <span className="font-semibold text-white">flower.</span> is a Houston, Texas based
            alt shoegaze metal project blending heaviness, atmosphere, and melody into a sound
            inspired by Deftones, Hum, and Nothing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
            <h2 className="text-xl uppercase tracking-[0.18em] mb-4">Booking Contact</h2>
            <p className="text-white/70 mb-2">Email</p>
            <a
              href="mailto:flowerbandlive@gmail.com"
              className="text-white underline underline-offset-4 hover:text-white/80"
            >
              flowerbandlive@gmail.com
            </a>

            <div className="mt-6 space-y-3 text-white/80">
              <p>
                <span className="text-white font-medium">Based in:</span> Houston, TX
              </p>
              <p>
                <span className="text-white font-medium">Style:</span> Alt Shoegaze Metal
              </p>
              <p>
                <span className="text-white font-medium">Available for:</span> Clubs, support
                slots, festivals, tours, and private events
              </p>
              <p>
                <span className="text-white font-medium">FFO:</span> Deftones, Hum, Nothing
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/5 p-6">
            <h2 className="text-xl uppercase tracking-[0.18em] mb-4">Links</h2>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/flowerbandlive/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white underline underline-offset-4 hover:text-white/80"
              >
                Instagram
              </a>

              <a
                href="https://open.spotify.com/album/5FBDkZe5NpfiaSWqwk3147"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white underline underline-offset-4 hover:text-white/80"
              >
                Spotify
              </a>

              <a
                href="https://www.youtube.com/@flowerbandlive"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white underline underline-offset-4 hover:text-white/80"
              >
                YouTube
              </a>

              
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-6">
          <h2 className="text-xl uppercase tracking-[0.18em] mb-4">About flower.</h2>
          <p className="text-white/80 leading-8">
            flower. delivers a dark, melodic blend of alt metal and shoegaze with a sound built
            for heavy live rooms, support slots, and immersive bills. Based in Houston, TX, the
            project is currently seeking booking opportunities for local shows, regional runs,
            support dates, festivals, and touring opportunities.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-6">
          <h2 className="text-xl uppercase tracking-[0.18em] mb-4">For Booking Inquiries</h2>
          <ul className="space-y-2 text-white/80">
            <li>• Venue or event name</li>
            <li>• City and proposed date</li>
            <li>• Other bands on the bill</li>
            <li>• Set length and compensation details</li>
            <li>• Links or promo information</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}