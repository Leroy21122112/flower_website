'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type TourDate = {
  id: string;
  city: string;
  venue: string;
  date: string;
};

export default function TourPage() {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTourDates = async () => {
      const { data, error } = await supabase
        .from('tour_dates')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching tour dates:', error);
      } else {
        setTourDates(data || []);
      }
      setIsLoading(false);
    };

    fetchTourDates();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Tour Dates</h1>

      {isLoading ? (
        <p>Loading tour dates...</p>
      ) : tourDates.length === 0 ? (
        <p>No upcoming shows yet.</p>
      ) : (
        <div className="space-y-6 w-full max-w-3xl">
          {tourDates.map((tour) => (
            <div
              key={tour.id}
              className="border border-zinc-800 bg-zinc-900 p-6 rounded-lg flex flex-col md:flex-row md:justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{tour.city}</h2>
                <p className="text-gray-400">{tour.venue}</p>
              </div>
              <p className="text-gray-400 mt-4 md:mt-0">{new Date(tour.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
