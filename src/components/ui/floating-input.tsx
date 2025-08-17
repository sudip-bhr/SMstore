import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, icon, className, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <Input
          ref={ref}
          className={cn(
            "peer pt-6 pb-2 w-full transition-all",
            icon ? "pl-10" : "pl-3",
            focused ? "ring-2 ring-purple-400" : "ring-0",
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(!!e.target.value)}
          {...props}
        />
        <Label
          className={cn(
            "absolute left-3 transition-all text-gray-500",
            icon ? "left-10" : "left-3",
            focused || props.value
              ? "top-1 text-xs text-purple-600"
              : "top-3 text-sm"
          )}
        >
          {label}
        </Label>
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";
