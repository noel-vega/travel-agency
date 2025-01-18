import React from "react";
import { Building2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmptySelectedHotels = () => {
  return (
    <Card className="flex flex-col items-center justify-center p-8 m-4 space-y-6 ">
      <div className="relative">
        <Building2 className="w-16 h-16 text-gray-300" />
        <div className="absolute -bottom-2 -right-2  rounded-full p-1">
          <Search className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold ">No Hotels Selected</h3>
        <p className="text-mute max-w-sm">
          Start by searching for hotels in your desired location. Selected
          hotels will appear here for easy comparison.
        </p>
      </div>

      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6"
        onClick={() => {
          // Handle tab switch to Search Hotel tab
          console.log("Switch to search tab");
        }}
      >
        Search Hotels
      </Button>
    </Card>
  );
};

export default EmptySelectedHotels;
