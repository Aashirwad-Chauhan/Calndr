"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { updateAvailability } from "@/actions/availability";
import { availabilitySchema } from "@/app/lib/validators";
import { timeSlots } from "../data";
import useFetch from "@/hooks/useFetch";

export default function AvailabilityForm({ initialData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const {
    loading,
    error,
    fn: fnupdateAvailability,
  } = useFetch(updateAvailability);

  const onSubmit = async (data) => {
    await fnupdateAvailability(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);

        return (
          <div key={day} className="flex items-center space-x-4 mb-4 no-scrollbar">
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${day}.isAvailable`, checked);
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                />
              )}
            />
            <span className="w-24 font-medium text-gray-700">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>
            {isAvailable && (
              <>
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} className="rounded-md shadow-sm">
                      <SelectTrigger className="w-32 rounded-md bg-gray-100">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-md shadow-lg">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="hover:bg-gray-200">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <span>to</span>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} className="rounded-md shadow-sm">
                      <SelectTrigger className="w-32 rounded-md bg-gray-100">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-md shadow-lg">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="hover:bg-gray-200">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[day]?.endTime && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors[day].endTime.message}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}

      <div className="flex items-center space-x-4">
        <span className="w-48 font-medium text-gray-700">Minimum gap before booking (minutes):</span>

        <Input
          type="number"
          {...register("timeGap", {
            valueAsNumber: true,
          })}
          className="w-32 rounded-md bg-gray-100 shadow-sm"
        />

        {errors.timeGap && (
          <span className="text-red-500 text-sm">{errors.timeGap.message}</span>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error?.message}</div>}
      <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? "Updating..." : "Update Availability"}
      </Button>
    </form>
  );
}