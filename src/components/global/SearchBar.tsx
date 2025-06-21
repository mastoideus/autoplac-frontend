import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdSearch } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import customFetch from "@/axios";
import { CgSearchLoading } from "react-icons/cg";
import { queryClient } from "@/axios/queryClient";
import { Link } from "react-router";
import { useLocation, useSearchParams, useNavigate } from "react-router";

type SearchBarProps = {
  placeholder?: string;
  name: string;
  className: string;
  asChild?: boolean;
};

const SearchBar = ({
  placeholder,
  name,
  className,
  asChild,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<null | any>(null);

  useEffect(() => {
    setSearch("");
  }, [pathname]);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults(null);
      return;
    }

    const controller = new AbortController();

    const fetchSearchResults = async () => {
      setResults(null);
      setIsSearching(true);
      try {
        const data: any = await queryClient.fetchQuery({
          queryKey: ["search", debouncedSearch],
          queryFn: () =>
            customFetch.get("/api/cars/quickSearch", {
              params: { searchTerm: debouncedSearch },
              signal: controller.signal,
            }),
        });
        setIsSearching(false);
        setResults(data);
      } catch (err: any) {
        setIsSearching(false);
        if (err.name === "AbortError") {
          console.log("Request was cancelled");
        } else {
          console.error(err);
        }
      }
    };

    fetchSearchResults();

    return () => controller.abort();
  }, [debouncedSearch, queryClient]);

  console.log(results?.data?.data);
  const cars = results?.data?.data?.cars || [];
  const stores = results?.data?.data?.stores || [];
  const users = results?.data?.data?.users || [];

  const handleClickSearch = () => {
    setSearch("");
    navigate(`/main-search?searchTerm=${search}`);
  };

  return (
    <div className=" relative h-full">
      <div className={cn("flex items-center", className)}>
        <Input
          value={search}
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          onChange={(e) => setSearch(e.target.value)}
          className="  border border-gray-200 h-[100%] rounded-r-none w-full"
        />
        <Button
          asChild={asChild}
          onClick={handleClickSearch}
          className="h-[100%] rounded-l-none  w-16  bg-blue-900"
        >
          {isSearching ? (
            <CgSearchLoading color="white" />
          ) : (
            <IoMdSearch color="white" className=" " />
          )}
        </Button>
      </div>
      {results?.data?.data && debouncedSearch !== "" && (
        <div className=" absolute top-[68px] p-6 bg-white w-full  shadow-md rounded-md">
          {cars.length === 0 &&
          stores.length === 0 &&
          users.length === 0 &&
          !isSearching ? (
            <div>
              <p className=" font-semibold">Nema rezultata za datu pretragu</p>
            </div>
          ) : (
            <>
              <div className=" mb-4">
                <h3 className="  font-medium uppercase text-sm mb-3">vozila</h3>
                <ul>
                  {cars.map((car: any) => {
                    return (
                      <Link to={`/car/${car._id}`}>
                        <li className=" flex gap-x-3 items-center">
                          <img
                            src={car.images[0]}
                            className=" w-20 h-20 object-cover rounded-md"
                          />
                          <p className=" text-gray-600">
                            {car.basicInfo.brandName} {car.basicInfo.modelName}
                          </p>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="  font-medium uppercase text-sm mb-3">
                  korisnici
                </h3>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
