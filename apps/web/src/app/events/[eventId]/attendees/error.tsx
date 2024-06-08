"use client";

import { Button } from "@aqua/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="grid place-content-center gap-6">
      <h1 className="font-medium text-2xl">Something went wrong!</h1>
      <p className="max-w-sm text-pretty text-sm">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
