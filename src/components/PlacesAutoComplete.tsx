"use client";
import React, { useState, useEffect, ChangeEvent, ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import type { Place, PlacesResponse } from "@/types/places";

interface PlacesAutocompleteProps {
  onPlaceSelect?: (place: Place) => void;
  onChange: (place: Place) => void;
}

interface ApiError {
  error: string;
}

export default function PlacesAutocomplete({
  onPlaceSelect,
  onChange,
  ...props
}: Omit<ComponentProps<"input">, "onChange"> & PlacesAutocompleteProps) {
  const [input, setInput] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedInput] = useDebounceValue(input, 300);

  useEffect(() => {
    const searchPlaces = async () => {
      if (!debouncedInput.trim()) {
        setPlaces([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: debouncedInput }),
        });

        if (!response.ok) {
          const errorData = (await response.json()) as ApiError;
          throw new Error(errorData.error || "Failed to fetch places");
        }

        const data = (await response.json()) as PlacesResponse;
        setPlaces(data.places || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching places");
        console.error("Places API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    searchPlaces();
  }, [debouncedInput]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handlePlaceSelect = (place: Place): void => {
    setInput(place.formattedAddress);
    setPlaces([]);
    onPlaceSelect?.(place);
    if (place) {
      onChange(place);
    }
  };

  return (
    <>
      <div className="relative">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          aria-label="Search places"
          {...props}
        />
        <Search
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>

      {loading && (
        <div className="mt-2 text-sm text-gray-500" role="status">
          Loading...
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </div>
      )}

      {places.length > 0 && (
        <ul
          className="mt-2 absolute w-full bg-white shadow-lg rounded-lg overflow-hidden z-10"
          role="listbox"
        >
          {places.map((place) => (
            <li
              key={place.id}
              onClick={() => handlePlaceSelect(place)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              role="option"
              aria-selected="false"
            >
              <div className="font-medium">{place.displayName.text}</div>
              <div className="text-sm text-gray-500">
                {place.formattedAddress}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
