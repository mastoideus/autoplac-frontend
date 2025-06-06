import Hero from "@/components/home/Hero";
import BrandsStoresList from "@/components/home/BrandsStoresList";
import { queryClient } from "@/axios/queryClient.ts";
import { fetchBrandsStores } from "@/axios/fetchFunctions/fetchBrandsStores";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SuspenseErrorFallback from "@/components/global/SuspenseErrorFallback";
import fetchAllCars from "@/axios/fetchFunctions/fetchAllCars";
import CarsList from "@/components/home/CarsList";
import HomeInfo from "@/components/home/HomeInfo";

export const loader = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["brands-stores"],
    queryFn: fetchBrandsStores,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars"],
    queryFn: fetchAllCars,
    initialPageParam: 1,
  });

  return null;
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <main className=" bg-[#fafafa]">
        <section className=" page_layout pt-14">
          <ErrorBoundary FallbackComponent={SuspenseErrorFallback}>
            <Suspense fallback={<div>Loading brands and stores...</div>}>
              <BrandsStoresList />
            </Suspense>
          </ErrorBoundary>
        </section>
        <section className=" page_layout mt-12 ">
          <CarsList />
        </section>
        <section className=" page_layout mt-28">
          <HomeInfo />
        </section>
      </main>
    </>
  );
};

export default HomePage;
