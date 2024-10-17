import { Suspense } from "react";
import { getUserMeetings } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";

export const metadata = {
  title: "Your Meetings | Calndr",
  description: "View and manage your upcoming and past meetings.",
};

export default function MeetingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Tabs defaultValue="upcoming" className="bg-white shadow-lg rounded-lg p-4">
        <TabsList className="mb-4 flex border-b">
          <TabsTrigger value="upcoming" className="mr-4 py-2 px-4 hover:bg-gray-100 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="py-2 px-4 hover:bg-gray-100 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<div className="text-center py-4">Loading upcoming meetings...</div>}>
            <UpcomingMeetings />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback={<div className="text-center py-4">Loading past meetings...</div>}>
            <PastMeetings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type="past" />;
}