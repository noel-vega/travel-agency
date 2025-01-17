"use client";
import React, { useState, useEffect, ComponentProps, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPinIcon } from "lucide-react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import type { Place, PlacesResponse } from "@/types/places";

import { Card } from "./ui/card";

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
  const [debouncedValue] = useDebounceValue(input, 750);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const isFromSelection = useRef(false);

  const handleClickOutside = () => {
    setShowResults(false);
  };

  // @ts-expect-error IDK
  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    // Skip if the input change was from selection
    if (isFromSelection.current) {
      isFromSelection.current = false;
      return;
    }

    if (!debouncedValue?.trim()) {
      setPlaces([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    const fetchPlaces = async () => {
      if (!debouncedValue.trim()) {
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
          body: JSON.stringify({ input: debouncedValue }),
        });

        if (!response.ok) {
          const errorData = (await response.json()) as ApiError;
          throw new Error(errorData.error || "Failed to fetch places");
        }

        const data = (await response.json()) as PlacesResponse;
        setPlaces(data.places || []);
        setShowResults(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [debouncedValue]);

  const handlePlaceSelect = (place: Place): void => {
    isFromSelection.current = true;
    setInput(place.formattedAddress);
    setPlaces([]);
    setShowResults(false);
    setLoading(false);
    onPlaceSelect?.(place);
    if (place) {
      onChange(place);
    }
  };

  return (
    <>
      <div className="relative border">
        <Input
          type="text"
          value={input}
          onChange={(e) => {
            const newValue = e.target.value;
            // Only show loading if we're actually going to search
            setInput(newValue);
          }}
          aria-label="Search places"
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div
              className="rounded-full border-2 border-t-blue-500 animate-spin h-5 w-5"
              role="status"
            ></div>
          </div>
        )}
      </div>

      {showResults && (
        <Card
          className="absolute mt-2 max-w-lg w-full z-50 max-h-[300px] overflow-auto"
          ref={ref}
        >
          <div className="p-2">
            {places.length === 0 ? (
              <p className="text-sm text-muted-foreground p-2">
                No venues found.
              </p>
            ) : (
              places.map((place) => (
                <button
                  key={place.id}
                  onClick={() => handlePlaceSelect(place)}
                  className="w-full text-left px-2 py-3 hover:bg-accent rounded-md flex items-center gap-2 focus:outline-none focus:bg-accent"
                >
                  <MapPinIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {place.formattedAddress}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {place.displayName.text}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
