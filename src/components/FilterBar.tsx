import { useState } from "react";

// components
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

// tanstack
import { useQuery } from "@tanstack/react-query";
import getCategories from "../api/getCategories.ts";

export default function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    openNow: false,
    price: "",
    category: "",
  });

  // get all restaurant category
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // function to changne filters value
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  // function to clear all filters
  const clearFilters = () => {
    const newFilters = { openNow: false, price: "", category: "" };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div>
      {/* // filter bar container */}
      <Separator /> {/* horizontal line */}
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-3 my-4 px-10 items-center">
          <span>Filter By:</span>
          {/* open now filter */}
          <Button className="cursor-pointer bg-white text-black hover:bg-white bg:text-black border-b-2 rounded-none shadow-none focus-visible:ring-0">
            <input
              type="checkbox"
              checked={filters.openNow}
              className="cursor-pointer"
              onChange={(e) => handleChange("openNow", e.target.checked)}
            />
            <label>Open Now</label>{" "}
          </Button>

          {/* price filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant=""
                className="cursor-pointer bg-white text-black hover:bg-white bg:text-black border-b-2 rounded-none shadow-none focus-visible:ring-0"
              >
                Price
                <IoIosArrowDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={filters.price}
                onValueChange={(value) => handleChange("price", value)}
              >
                <DropdownMenuRadioItem value="$">$</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="$$">$$</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="$$$">$$$</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* categories filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant=""
                className="cursor-pointer bg-white text-black hover:bg-white bg:text-black border-b-2 rounded-none shadow-none focus-visible:ring-0"
              >
                Categories
                <IoIosArrowDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={filters.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                {isLoading == false &&
                  categories.map((item) => (
                    <DropdownMenuRadioItem value={item}>
                      {item}
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* button to clear all filters */}
        <Button
          onClick={clearFilters}
          variant="outline"
          className="cursor-pointer mx-10 rounded-xs"
        >
          Clear All
        </Button>
      </div>
      <Separator /> {/* horizontal line */}
    </div>
  );
}
