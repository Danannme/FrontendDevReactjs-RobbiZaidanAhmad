import { useParams, Link } from "react-router";

// tanstack
import { useQuery } from "@tanstack/react-query";
import getRestaurantById from "../api/getRestaurantById.ts";

// types
import type { Review } from "../types/types.ts";

export default function Detail() {
  const { id } = useParams(); // get is from url params

  // get restaurant data by id
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id!),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Restaurant not found.</p>
        <Link to="/" className="text-blue-600 mt-4 underline">
          Go back
        </Link>
      </div>
    );
  }

  const { name, rating, price_range, open, categories, photos, reviews } =
    restaurant;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="underline mb-4 inline-block">
        ← Back to list
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={photos?.[0] || "https://via.placeholder.com/400x250"}
          alt={name}
          className="rounded-lg w-full md:w-1/2 h-64 object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold mb-2">{name}</h1>
          <p className="text-gray-600">
            {categories?.join(", ") || "No categories"}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              ⭐ {rating}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {price_range || "$$"}
            </span>
            <span
              className={`px-3 py-1 rounded-full ${
                open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {open ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews && reviews?.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review: Review) => (
              <div
                key={review.id}
                className="flex gap-2 items-center border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <img src={review.image} className="rounded-full w-[80px]" />
                <div className="w-full">
                  <div className="flex  items-center justify-between mb-2">
                    <span className="font-medium">
                      {review.name || "Anonymous"}
                    </span>
                    <span className="text-yellow-600">⭐ {review.rating}</span>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
}
