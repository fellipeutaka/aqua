import { ButtonStyles } from "@aqua/ui/button";
import { Separator } from "@aqua/ui/separator";
import Link from "next/link";

export default function Page() {
  return (
    <main className="grid place-content-center gap-6">
      <div className="flex items-center gap-6">
        <h1 className="font-medium text-2xl">404</h1>
        <Separator orientation="vertical" />
        <h2 className="text-sm">This page could not be found.</h2>
      </div>
      <Link
        className={ButtonStyles({
          variant: "secondary",
        })}
        href="/"
      >
        Go back to the home page
      </Link>
    </main>
  );
}
