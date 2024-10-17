import { Suspense } from "react";
import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import { LoadingIndicator } from "@/components/loading-indicator";

export default function EventsPage() {
  return (
    <Suspense fallback={<LoadingIndicator message="Loading Events..." />}>
      <Events />
    </Suspense>
  );
}

async function Events() {
  const { events, username } = await getUserEvents();

  if (events.length === 0) {
    return <p>You haven&apos;t created any events yet.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  );
}


