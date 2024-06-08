"use client";

import { cn, tv } from "@aqua/tailwind";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Icons } from "./icons";

export const SelectStyles = {
  Trigger: tv({
    base: [
      "group flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background transition",
      "placeholder:text-muted-foreground",
      "focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
  }),
  Content: tv({
    base: [
      [
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
      ],
    ],
    variants: {
      popper: {
        true: [
          "max-h-[var(--radix-select-content-available-height)]",
          "data-[side=bottom]:translate-y-1",
          "data-[side=left]:-translate-x-1",
          "data-[side=right]:translate-x-1",
          "data-[side=top]:-translate-y-1",
        ],
      },
    },
  }),
  Viewport: tv({
    base: ["p-1"],
    variants: {
      popper: {
        true: [
          "h-[var(--radix-popper-available-height)] w-full min-w-[var(--radix-popper-anchor-width)]",
        ],
      },
    },
  }),
  Label: tv({
    base: ["py-1.5 pl-8 pr-2 text-sm font-semibold"],
  }),
  Item: tv({
    base: [
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    ],
  }),
  Separator: tv({
    base: ["-mx-1 my-1 h-px bg-muted"],
  }),
  ScrollButton: tv({
    base: ["flex h-6 items-center justify-center"],
  }),
};

export const SelectRoot = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  placeholder: React.ReactNode;
  iconClassName?: string;
}

export function SelectTrigger({
  ref,
  className,
  placeholder,
  iconClassName,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={SelectStyles.Trigger({ className })}
      {...props}
    >
      <SelectPrimitive.Value
        placeholder={
          <span className="text-muted-foreground">{placeholder}</span>
        }
      />
      <SelectPrimitive.Icon asChild>
        <Icons.ChevronDown
          className={cn(
            "size-4 opacity-50 transition-transform duration-200 group-aria-expanded:rotate-180",
            iconClassName,
          )}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  ref,
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={SelectStyles.Content({
          className,
          popper: position === "popper",
        })}
        position={position}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className={SelectStyles.ScrollButton()}>
          <Icons.ChevronUp className="size-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport
          className={SelectStyles.Viewport({ popper: position === "popper" })}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton
          className={SelectStyles.ScrollButton()}
        >
          <Icons.ChevronDown className="size-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectLabel({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={SelectStyles.Label({ className })}
      {...props}
    />
  );
}

export function SelectItem({
  ref,
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={SelectStyles.Item({ className })}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icons.Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={SelectStyles.Separator({ className })}
      {...props}
    />
  );
}

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
});
