import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2",
    "font-medium leading-none select-none",
    "transition-[transform,background-color,color,border-color] duration-200 ease-out-expo",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-accent text-bg hover:bg-text active:scale-[0.98] rounded-md",
        secondary: "bg-surface text-text border border-border hover:border-text rounded-md",
        ghost: "text-text hover:text-accent rounded-md",
        outline:
          "bg-transparent text-text border border-border hover:border-accent hover:text-accent rounded-md",
      },
      size: {
        sm: "h-10 px-4 text-small",
        md: "h-12 px-6 text-body",
        lg: "h-14 px-8 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;