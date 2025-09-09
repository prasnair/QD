import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      variant: {
        default: "border-transparent bg-primary-500 text-primary-foreground hover:bg-primary-500/80",
        secondary: "border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-100/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success-100 text-success-800 hover:bg-success-100/80",
        warning: "border-transparent bg-warning-100 text-warning-800 hover:bg-warning-100/80",
        error: "border-transparent bg-error-100 text-error-800 hover:bg-error-100/80",
        // Algolia-style status variants
        algolia: "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100",
        status: "border-transparent bg-blue-50 text-blue-700 hover:bg-blue-100",
        priority: "border-transparent bg-orange-50 text-orange-700 hover:bg-orange-100",
        type: "border-transparent bg-purple-50 text-purple-700 hover:bg-purple-100",
        // Status-specific variants
        effective: "border-transparent bg-green-50 text-green-700 hover:bg-green-100",
        pending: "border-transparent bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
        draft: "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100",
        open: "border-transparent bg-blue-50 text-blue-700 hover:bg-blue-100",
        closed: "border-transparent bg-green-50 text-green-700 hover:bg-green-100",
        implementation: "border-transparent bg-orange-50 text-orange-700 hover:bg-orange-100",
        // Priority-specific variants
        critical: "border-transparent bg-red-50 text-red-700 hover:bg-red-100",
        high: "border-transparent bg-orange-50 text-orange-700 hover:bg-orange-100",
        medium: "border-transparent bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
        low: "border-transparent bg-green-50 text-green-700 hover:bg-green-100",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
