import { tv } from "@aqua/tailwind";

export const InputStyles = tv({
  base: [
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:font-medium file:text-sm",
  ],
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  ref,
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      ref={ref}
      className={InputStyles({ className })}
      type="text"
      {...props}
    />
  );
}
