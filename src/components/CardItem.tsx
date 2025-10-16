// components
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";

// react router
import { Link } from "react-router";

// types
import type { Restaurant } from "../types/types.ts";

export default function CardItem({ item }: { item: Restaurant }) {
  return (
    <div className="w-full max-w-sm p-0 space-y-2">
      {/* img */}
      <CardHeader className="p-0">
        <img
          className="aspect-video w-full object-cover"
          src={item.photos[0]}
        />
      </CardHeader>

      {/* detail */}
      <CardContent className="space-y-2 p-0">
        <CardTitle>{item.name}</CardTitle>
        <div className="flex gap-0.5">
          {Array.from({ length: Math.round(item.rating) }).map((_) => (
            <IoStar />
          ))}
          {Array.from({ length: 5 - Math.round(item.rating) }).map((_) => (
            <IoStarOutline />
          ))}
        </div>
        <CardDescription className="flex justify-between">
          <div className="text-sm">
            {item.categories[0].toUpperCase()} • {item.price_range}
          </div>
          <div className="flex gap-1 text-sm items-center">
            <div
              className={`w-2 h-2 ${item.open == true ? "bg-green-500" : "bg-red-500"} rounded-full`}
            ></div>{" "}
            OPEN NOW
          </div>
        </CardDescription>
      </CardContent>

      {/* button */}
      <CardFooter className="p-0">
        <Link
          to={`/restaurant/${item.id}`}
          className="cursor-pointer w-full text-center py-2 bg-[#072856] rounded-xs text-white"
        >
          LEARN MORE
        </Link>
      </CardFooter>
    </div>
  );
}
