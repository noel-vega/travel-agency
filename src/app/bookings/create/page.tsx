import { Button } from "@/components/ui/button";
// import { CreateClientForm } from "./create-client-form";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline">
          <Link href="/clients">
            <MoveLeftIcon />
          </Link>
        </Button>
        <h1 className="font-semibold text-3xl ">Create Booking</h1>
      </div>
      <div className="max-w-sm">{/* <CreateClientForm /> */}</div>
    </div>
  );
}
