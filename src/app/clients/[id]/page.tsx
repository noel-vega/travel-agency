"use client";

import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return (
    <div>
      <Button asChild variant="outline">
        <Link href="/clients">
          <MoveLeftIcon />
        </Link>
      </Button>
      Client Page: {params.id}
    </div>
  );
}
