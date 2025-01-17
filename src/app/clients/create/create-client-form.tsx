"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useClientsStore } from "../page";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
});

export function CreateClientForm() {
  const router = useRouter();
  const { addClient } = useClientsStore();
  const form = useForm({
    validators: {
      onMount: formSchema,
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      addClient(value);
      router.push("/clients");
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="name">
        {(field) => (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </div>
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </div>
        )}
      </form.Field>
      <form.Field name="phone">
        {(field) => (
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              onChange={(e) => field.handleChange(e.target.value)}
              required
            />
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      />
    </form>
  );
}
