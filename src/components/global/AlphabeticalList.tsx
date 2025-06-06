import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { fetchBrandsStores } from "@/axios/fetchFunctions/fetchBrandsStores";
import { useQuery } from "@tanstack/react-query";
import SmallCard from "./SmallCard";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type AlphabeticalListProps = {
  title: string;
  type: string;
};

const AlphabeticalList = ({ title, type }: AlphabeticalListProps) => {
  const { data } = useQuery({
    queryKey: ["brands-stores"],
    queryFn: fetchBrandsStores,
    staleTime: 60 * 1000 * 5,
  });

  const [hideEmptyItems, setHideEmptyItems] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [finalFilterTerm, setFinalFilterTerm] = useState<null | string>(null);

  let listData = [...data.data[type]];

  if (hideEmptyItems) {
    listData = listData.filter((item) => item.count > 0);
  }
  if (finalFilterTerm) {
    listData = listData.filter((item) =>
      item.name.toLowerCase().includes(finalFilterTerm.toLowerCase())
    );
  }

  const alphTransformedData: any = {};
  listData.forEach((item: { name: string; count: number; logo: string }) => {
    if (alphTransformedData[item.name[0]]) {
      alphTransformedData[item.name[0]].push(item);
    } else {
      alphTransformedData[item.name[0]] = [item];
    }
  });
  const alphSortedListData = Object.entries(alphTransformedData).sort();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFinalFilterTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <div className="pt-16">
      <header className=" mb-16 flex flex-col gap-y-3 md:flex-row md:justify-between md:items-center ">
        <h2 className=" border-l-4 border-l-primary pl-3 text-xl md:text-3xl font-semibold">
          {title}
        </h2>
        <div className=" flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-3 ">
          <div
            className={` ${
              type === "stores" && "hidden"
            } flex items-center gap-3 min-w-[250px] `}
          >
            <Checkbox
              id="hide_brands"
              checked={hideEmptyItems}
              onCheckedChange={(checked) => setHideEmptyItems(!!checked)}
            />
            <Label htmlFor="hide_brands">Sakrij proizvođače bez vozila</Label>
          </div>

          <Input
            type="search"
            name="searchTerm"
            id="searchTerm"
            placeholder="Pretraga"
            className=" border-2 border-gray-200 "
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <section>
        {alphSortedListData.map(([alphChar, items]) => {
          const typedItems = items as {
            name: string;
            logo: string;
            count: number;
          }[];

          return (
            <div className=" mb-10">
              <h2 className=" mb-4 font-semibold text-lg md:text-xl">
                {alphChar}
              </h2>
              <ul className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {typedItems.map((item) => {
                  return (
                    <SmallCard
                      logo={item.logo}
                      count={item.count}
                      name={item.name}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default AlphabeticalList;
