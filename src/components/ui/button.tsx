import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-transparent border-transparent focus-visible:ring-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25 border-0",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5 shadow-lg hover:shadow-red-500/25 border-0",
        outline:
          "bg-blue-50/10 border border-blue-300/30 text-blue-200 hover:bg-blue-100/20 hover:text-blue-100 hover:-translate-y-0.5",
        secondary:
          "bg-gradient-to-r from-blue-700 to-blue-800 text-blue-100 hover:from-blue-800 hover:to-blue-900 hover:-translate-y-0.5 shadow-md border-0",
        ghost:
          "text-blue-200 hover:bg-blue-600/20 hover:text-blue-100 border-0",
        link: "text-blue-300 underline-offset-4 hover:underline hover:text-blue-200 border-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
