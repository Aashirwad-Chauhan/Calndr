import { LoadingIndicator } from "@/components/loading-indicator";
import { Suspense } from "react";

export default function AvailabilityLayout({children}) {
    return (
        <div className="mx-auto overflow-y-hidden no-scrollbar">
            <Suspense fallback={<LoadingIndicator message="Loading Availability..."/>}>
                {children}
            </Suspense>
        </div>
    );
  }