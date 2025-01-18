import { StarRating } from "@/components/star-rating-component";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  calculateDistance,
  cn,
  formatDistance,
  LatLon,
  ratingFormatter,
} from "@/lib/utils";
import { Hotel } from "@/types/hotels";
import { SquareArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  hotel: Hotel;
  from?: LatLon;
} & Omit<React.ComponentProps<"div">, "onSelect">;

export function HotelCard({ hotel, from, ...props }: Props) {
  return (
    <Card
      {...props}
      className={cn("flex w-full border rounded-lg group", props.className)}
    >
      <Skeleton className="h-32 w-52 shrink-0" />
      <div className="p-2 pl-4 space-y-2">
        <p className="font-semibold group-hover:underline">
          {hotel.displayName.text}
        </p>
        <div className="text-xs space-y-1">
          <p className="text-xs">{hotel.formattedAddress}</p>
          <div className="flex items-center gap-1.5">
            <span>{hotel.rating}</span>
            <StarRating rating={hotel.rating} size={15} />
            <span>({ratingFormatter.format(hotel.userRatingCount)})</span>
          </div>
          {from && (
            <p>
              {formatDistance(calculateDistance({ from, to: hotel.location }))}{" "}
              from venue
            </p>
          )}

          {hotel?.websiteUri && (
            <Link
              href={hotel.websiteUri}
              target="_blank"
              className="flex gap-1.5 items-center w-fit"
            >
              <p className="text-blue-500 hover:underline">Website</p>
              <SquareArrowUpRightIcon size={10} />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
