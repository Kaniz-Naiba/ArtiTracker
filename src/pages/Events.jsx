import { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://artifacts-tracker-server-sigma.vercel.app/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((e) => (
          <div key={e._id} className="border rounded p-4 shadow bg-yellow-800 text-white">
            <img src={e.image} alt={e.title} className="w-full h-48 object-cover rounded mb-3"/>
            <h2 className="text-2xl font-semibold">{e.title}</h2>
            <p>{e.description}</p>
            <p><strong>Date:</strong> {new Date(e.date).toLocaleString()}</p>
            <p><strong>Location:</strong> {e.location}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
