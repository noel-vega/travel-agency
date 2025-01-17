"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Client, useClientsStore } from "@/stores/clients";

export default function Page() {
  const { clients } = useClientsStore();
  const router = useRouter();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Clients</h1>
      <div className="flex items-end mb-4">
        <div className="max-w-xs w-full">
          <Label htmlFor="search-clients">Search</Label>
          <Input id="search-clients" className="w-full" />
        </div>
        <Button className="ml-auto" asChild>
          <Link href="/clients/create">Create Client</Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={clients}
        rowCursorPointer
        onRowClick={({ id }) => {
          router.push(`/clients/${id}`);
        }}
      />
    </div>
  );
}

const columns: ColumnDef<Client>[] = [
  { accessorKey: "id", header: "id" },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];
