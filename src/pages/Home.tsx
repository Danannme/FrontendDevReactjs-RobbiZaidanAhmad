import { useState, useMemo } from "react";

// components
import FilterBar from "@/components/FilterBar";
import CardItem from "@/components/CardItem";

// tanstack
import { useQuery } from "@tanstack/react-query";
import getRestaurants from "../api/getRestaurants.ts";
import getRestaurantByCategory from "../api/getRestaurantByCategory.ts";

export default function Home() {
  const [filters, setFilters] = useState({
    openNow: false,
    price: "",
    category: "",
  });

  // all restaurant data
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants", "all"],
    queryFn: getRestaurants,
    enabled: !filters.category,
  });

  // restaurant data by the category
  const { data: restaurantByCategory, isLoading: isResByCatLoading } = useQuery(
    {
      queryKey: ["restaurants", filters.category],
      queryFn: () => getRestaurantByCategory(filters.category),
      enabled: !!filters.category,
    },
  );

  // choose the data between all restaurants and restaurants by category
  const data = filters.category ? restaurantByCategory : restaurants;

  // filtering the data based on the filters
  const filteredData = useMemo(() => {
    if (!data) return [];

    let filtered = [...data];

    if (filters.openNow) {
      filtered = filtered.filter((item) => item.open);
    }

    if (filters.price) {
      filtered = filtered.filter((item) => item.price_range === filters.price);
    }

    return filtered;
  }, [data, filters]);

  return (
    <>
      <div className="px-10 pt-5 ">
        {/* title */}
        <h1 className="text-5xl mb-5">Restaurant</h1>
        <p className="mb-5">
          Ultricies, velit faucibus, quam pellentesque et magna nibh eu vel
          luctus ac. Quam tristique non at, turpis posuere dapibus rhoncus, eu
          velit vitae congue. Magna eu, gravida ullamcorper, magna posuere
          natoque sed penatibus parturient consectetur elementum. Neque ut,
          suscipit convallis etiam eget diam ullamcorper est, penatibus
          pellentesque est. Nulla, id.
        </p>
      </div>
      {/* filter bar */}
      <FilterBar onFilterChange={setFilters} />

      {/* card item list */}
      <div className="px-10 my-5">
        {isLoading || isResByCatLoading ? (
          <h1 className="text-center text-2xl mt-4">Getting the data...</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 ">
            {filteredData?.map((restaurant) => (
              <CardItem item={restaurant} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
