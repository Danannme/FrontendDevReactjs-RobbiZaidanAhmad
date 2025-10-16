import axios from "axios";

// types
import type { Restaurant } from "../types/types.ts";

export default async function getCategories() {
  const res = await axios.get<Restaurant[]>(
    "https://685ac7619f6ef9611157c1d3.mockapi.io/restaurants",
  );

  // collect categories from the data
  const categories = [
    ...new Set(res.data.flatMap((restaurant) => restaurant.categories)),
  ];
  return categories;
}
