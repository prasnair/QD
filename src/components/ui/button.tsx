import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover-lift",
  {
    variants: {
      variant: {
        default: "gradient-primary text-white shadow-colored hover:shadow-colored hover-glow",
        destructive: "gradient-error text-white shadow-colored-error hover:shadow-colored-error hover-glow-error",
        outline: "border border-primary-200 bg-transparent-20 backdrop-blur-sm text-primary-700 hover:bg-primary-50 hover:border-primary-300",
        secondary: "gradient-secondary text-white shadow-colored hover:shadow-colored",
        ghost: "hover:bg-transparent-20 hover:text-primary-900 backdrop-blur-sm",
        link: "text-primary-600 underline-offset-4 hover:underline",
        glass: "glass text-gray-700 hover:bg-transparent-30 border-white/20",
        glassPrimary: "glass-primary text-primary-700 hover:bg-primary-100/20 border-primary-200/30",
        glassSuccess: "glass-success text-success-700 hover:bg-success-100/20 border-success-200/30",
        glassWarning: "glass-warning text-warning-700 hover:bg-warning-100/20 border-warning-200/30",
        glassError: "glass-error text-error-700 hover:bg-error-100/20 border-error-200/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
