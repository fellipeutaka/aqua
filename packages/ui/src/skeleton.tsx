import { cn } from "@aqua/tailwind";

export type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton({ ref, className, ...props }: SkeletonProps) {
  return (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  );
}
