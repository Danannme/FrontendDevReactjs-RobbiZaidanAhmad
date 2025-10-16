import axios from "axios";

export default async function getRestaurantById(id) {
  const res = await axios.get(
    `https://685ac7619f6ef9611157c1d3.mockapi.io/restaurants/${id}`,
  );

  return res.data;
}
