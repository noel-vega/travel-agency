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
import Image from "next/image";

type Props = {
  hotel: Hotel;
  from?: LatLon;
} & Omit<React.ComponentProps<"div">, "onSelect">;

export function HotelCard({ hotel, from, ...props }: Props) {
  return (
    <Card
      {...props}
      className={cn(
        "flex w-full border rounded-lg group overflow-clip",
        props.className
      )}
    >
      {hotel.photos.length > 0 ? (
        <div className="h-32 w-52 shrink-0 relative border">
          <div className="aspect-[13/8] h-full w-full relative">
            <Image
              src={hotel.photos[0].url}
              alt={`Photo of ${hotel.displayName.text}`}
              fill
              priority
              className="object-cover object-center"
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
          </div>
        </div>
      ) : (
        <Skeleton className="h-32 w-52 shrink-0" />
      )}

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
