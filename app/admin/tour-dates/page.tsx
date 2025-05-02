'use client';

import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase/client';

type TourDate = {
  id: string;
  venue: string;
  city: string;
  address: string;
  time: string;
  date: string;
};

export default function TourDatesPage() {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast();

  const fetchTourDates = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('tour_dates').select('*').order('date', { ascending: true });
    if (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to fetch tour dates.', variant: 'destructive' });
    } else {
      setTourDates(data || []);
    }
    setIsLoading(false);
  };

  const addTourDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!venue || !city || !address || !time || !date) {
      toast({ title: 'Error', description: 'Please fill out all fields.', variant: 'destructive' });
      return;
    }
    const { error } = await supabase.from('tour_dates').insert([
      {
        venue,
        city,
        address,
        time,
        date: date.toISOString(),
      },
    ]);
    if (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to add tour date.', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Tour date added!' });
      setVenue('');
      setCity('');
      setAddress('');
      setTime('');
      setDate(undefined);
      fetchTourDates();
    }
  };

  const deleteTourDate = async (id: string) => {
    const { error } = await supabase.from('tour_dates').delete().eq('id', id);
    if (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to delete tour date.', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Tour date deleted.' });
      fetchTourDates();
    }
  };

  useEffect(() => {
    fetchTourDates();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Tour Dates" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Tour Dates</h2>
          </div>

          {/* Add New Tour Date */}
          <form onSubmit={addTourDate} className="space-y-4 mb-10">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Input placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="bg-zinc-900 border-zinc-800" />
              <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="bg-zinc-900 border-zinc-800" />
            </div>
            <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-zinc-900 border-zinc-800" />
            <Input placeholder="Time (e.g., 8:00 PM)" value={time} onChange={(e) => setTime(e.target.value)} className="bg-zinc-900 border-zinc-800" />
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selected) => setDate(selected)}
                captionLayout="dropdown-buttons"
                fromYear={2024}
                toYear={2030}
              />
            </div>
            <Button type="submit" className="bg-white text-black hover:bg-gray-200">Add Tour Date</Button>
          </form>

          {/* List of Tour Dates */}
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : tourDates.length === 0 ? (
              <p>No tour dates yet.</p>
            ) : (
              tourDates.map((event) => (
                <div key={event.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="text-lg font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                    <p>{event.venue}</p>
                    <p className="text-sm text-zinc-400">{event.city}</p>
                    <p className="text-sm text-zinc-400">{event.address}</p>
                    <p className="text-sm text-zinc-400">{event.time}</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTourDate(event.id)}
                    className="mt-4 sm:mt-0"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
