import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'glassPrimary' | 'glassSuccess' | 'glassWarning' | 'glassError' | 'elevated' | 'algolia'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: "bg-white border border-gray-200 shadow-sm",
    glass: "glass border-white/20 shadow-glass",
    glassPrimary: "glass-primary border-primary-200/30 shadow-colored",
    glassSuccess: "glass-success border-success-200/30 shadow-colored-success",
    glassWarning: "glass-warning border-warning-200/30 shadow-colored-warning",
    glassError: "glass-error border-error-200/30 shadow-colored-error",
    elevated: "bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300",
    algolia: "bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg transition-all duration-200",
        variant === 'algolia' ? "p-4" : "rounded-xl p-6 transition-all duration-300 hover-lift",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ className, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: "text-sm font-semibold leading-tight",
    md: "text-lg font-semibold leading-tight tracking-tight",
    lg: "text-xl font-semibold leading-tight tracking-tight",
    xl: "text-2xl font-bold leading-tight tracking-tight",
  }

  return (
    <h3
      ref={ref}
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: "text-xs text-gray-500 leading-relaxed",
    md: "text-sm text-gray-600 leading-relaxed",
    lg: "text-base text-gray-600 leading-relaxed",
  }

  return (
    <p
      ref={ref}
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
