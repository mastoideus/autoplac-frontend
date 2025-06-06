import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchBrandsStores } from "@/axios/fetchFunctions/fetchBrandsStores";
import ListWrapper from "./ListWrapper";
import SmallCard from "../global/SmallCard";

const BrandsStoresList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["brands-stores"],
    queryFn: fetchBrandsStores,
    staleTime: 60 * 1000 * 5,
  });

  return (
    <>
      <ListWrapper
        subtitle="najpopularniji proizvođači"
        textMore="pogledajte sve proizvođače"
        data={data.data.brands.slice(0, 6)}
        moreLink="/brands"
        className={
          " grid grid-cols-2 gap-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4"
        }
      >
        {function (item: { count: number; logo: string; name: string }) {
          return (
            <SmallCard count={item.count} logo={item.logo} name={item.name} />
          );
        }}
      </ListWrapper>
      <ListWrapper
        subtitle="AutoPlacevi"
        textMore="pogledajte sve Autoplac-eve"
        data={data.data.brands.slice(0, 6)}
        moreLink="/stores"
        className={
          " grid grid-cols-2 gap-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4"
        }
      >
        {function (item: { count: number; logo: string; name: string }) {
          return (
            <SmallCard count={item.count} logo={item.logo} name={item.name} />
          );
        }}
      </ListWrapper>
    </>
  );
};

export default BrandsStoresList;
