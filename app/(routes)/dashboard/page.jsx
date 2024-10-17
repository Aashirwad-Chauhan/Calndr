"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userNameSchema } from "@/app/lib/validators";
import React, { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { updateUserName } from "@/actions/users";
import { BarLoader } from "react-spinners";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns";

const Dashboard = () => {
  const {isLoaded, user} = useUser();
  const {register, handleSubmit, setValue, formState:{errors}} = useForm({
    resolver: zodResolver(userNameSchema)
  });

  useEffect(()=>{
    setValue("username", user?.username)
  }, [isLoaded]);

  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);

  const {loading, error, fn:funcUpdateUserName} = useFetch(updateUserName);

  const [showModal, setShowModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const onSubmit = async (data) => {
    await funcUpdateUserName(data.username);
  };

  const handleGenerateLink = () => {
    setGeneratedLink(`${window.location.origin}/${user?.username}`);
    setShowModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {`Konnichiwa! ${user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() : "Guest"}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!loadingUpdates ? (
            <div className="space-y-6 font-light bg-gray-100 p-4 rounded-lg shadow">
              <div>
                {upcomingMeetings && upcomingMeetings?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {upcomingMeetings?.map((meeting) => (
                      <li key={meeting.id} className="py-2 border-b last:border-b-0">
                        {meeting.event.title} on{" "}
                        {format(
                          new Date(meeting.startTime),
                          "MMM d, yyyy h:mm a"
                        )}{" "}
                        with {meeting.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No upcoming meetings</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading updates...</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Your Unique Link!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2">
              <span>
                {window?.location.origin}/
              </span>
              <Input {...register("username")} placeholder="username" />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-1">
                {error?.message}
              </p>
            )}
            <div className="flex space-x-2">
                {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
                <Button type="submit">Update Username</Button>
                <Button type="button" onClick={handleGenerateLink}>Generate Link</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Your Generated Link:</h3>
            <p>{generatedLink}</p>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => setShowModal(false)}>Close</Button>
              <Button onClick={handleCopyLink}>Copy Link</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;