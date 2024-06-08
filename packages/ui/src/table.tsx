import { tv } from "@aqua/tailwind";

export const TableStyles = {
  Root: tv({
    base: ["w-full caption-bottom text-sm"],
  }),
  Header: tv({
    base: ["[&_tr]:border-b"],
  }),
  Body: tv({
    base: ["[&_tr:last-child]:border-0"],
  }),
  Footer: tv({
    base: ["bg-primary font-medium text-primary-foreground"],
  }),
  Row: tv({
    base: [
      "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    ],
  }),
  Head: tv({
    base: [
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    ],
  }),
  Cell: tv({
    base: ["p-4 align-middle [&:has([role=checkbox])]:pr-0"],
  }),
  Caption: tv({
    base: ["mt-4 text-sm text-muted-foreground"],
  }),
};

export type TableProps = React.ComponentProps<"table">;

export function TableRoot({ ref, className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={TableStyles.Root({ className })} {...props} />
    </div>
  );
}

export function TableHeader({
  ref,
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead ref={ref} className={TableStyles.Header({ className })} {...props} />
  );
}

export function TableBody({
  ref,
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody ref={ref} className={TableStyles.Body({ className })} {...props} />
  );
}

export function TableFooter({
  ref,
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot ref={ref} className={TableStyles.Footer({ className })} {...props} />
  );
}

export function TableRow({
  ref,
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return <tr ref={ref} className={TableStyles.Row({ className })} {...props} />;
}

export function TableHead({
  ref,
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th ref={ref} className={TableStyles.Head({ className })} {...props} />
  );
}

export function TableCell({
  ref,
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td ref={ref} className={TableStyles.Cell({ className })} {...props} />
  );
}

export function TableCaption({
  ref,
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      ref={ref}
      className={TableStyles.Caption({ className })}
      {...props}
    />
  );
}

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});
