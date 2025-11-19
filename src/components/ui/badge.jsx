import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils" // تأكد من مسار utils

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "text-foreground",
        // سنستخدم هذا النوع المخصص للأبيض والأسود
        monochrome: "border-zinc-700 text-zinc-300 hover:border-white hover:text-white bg-transparent", 
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />)
}

export { Badge, badgeVariants }