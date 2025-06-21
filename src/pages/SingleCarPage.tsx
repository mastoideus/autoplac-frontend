import SingleCar from "@/components/single_car_page/SingleCar";
import type { Params } from "react-router";
import { queryClient } from "@/axios/queryClient";
import customFetch from "@/axios";
import SuspenseErrorFallback from "@/components/global/SuspenseErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export const loader = async ({ params }: { params: Params }) => {
  const carId = params.carId;

  await queryClient.prefetchQuery({
    queryKey: ["single_car", carId],
    queryFn: () => customFetch.get(`/api/cars/${carId}`),
  });

  return null;
};

const SingleCarPage = () => {
  return (
    <div className=" bg-gray-50">
      <div className=" page_layout pt-7">
        <ErrorBoundary FallbackComponent={SuspenseErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
            <SingleCar />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default SingleCarPage;
