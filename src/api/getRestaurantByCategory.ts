import axios from "axios";

//types
import type { Restaurant } from "../types/types.ts";

export default async function getRestaurantByCategory(category) {
  const res = await axios.get<Restaurant[]>(
    "https://685ac7619f6ef9611157c1d3.mockapi.io/restaurants",
  );

  // get the restaurants by the category
  const restaurants = res.data.filter((item) =>
    item.categories.includes(category),
  );
  return restaurants;
}
