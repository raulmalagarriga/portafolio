import * as React from "react"
import { cn } from "@/lib/utils"

export interface ExploreButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ExploreButton = React.forwardRef<HTMLButtonElement, ExploreButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn("explore-button", className)} {...props}>
        <span className="explore-button-bg">
          <span className="explore-button-bg-layers">
            <span className="explore-button-bg-layer explore-button-bg-layer-1"></span>
            <span className="explore-button-bg-layer explore-button-bg-layer-2"></span>
            <span className="explore-button-bg-layer explore-button-bg-layer-3"></span>
          </span>
        </span>
        <span className="explore-button-inner">
          <span className="explore-button-inner-static">{children}</span>
          <span className="explore-button-inner-hover">{children}</span>
        </span>
      </button>
    )
  }
)

ExploreButton.displayName = "ExploreButton"

export default ExploreButton
