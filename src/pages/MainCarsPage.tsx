import customFetch from "@/axios";
import { queryClient } from "@/axios/queryClient";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainCars from "@/components/main_cars_page/MainCars";

export const loader = async ({ request }: { request: Request }) => {
  const searchParams = new URL(request.url).searchParams;
  const searchParamsObj = Object.fromEntries(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["cars", Object.fromEntries([...searchParams.entries()].sort())],
    queryFn: () => customFetch.get("/api/cars", { params: searchParamsObj }),
  });
  console.log(searchParamsObj);
  return searchParamsObj;
};

const MainCarsPage = () => {
  const [searchParams] = useSearchParams();

  const queryParamsObj = Object.fromEntries([...searchParams.entries()].sort());

  const { data: responseData } = useQuery({
    queryKey: ["cars", queryParamsObj],
    queryFn: () => customFetch.get("/api/cars", { params: queryParamsObj }),
  });

  return (
    <div className="">
      <MainCars
        cars={responseData?.data?.data}
        hasMore={responseData?.data.hasMore}
        currentPage={responseData?.data.currentPage}
        totalCount={responseData?.data.totalCount}
        pages={responseData?.data.pages}
      />
    </div>
  );
};

export default MainCarsPage;
