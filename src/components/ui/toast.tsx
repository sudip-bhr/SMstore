import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { _cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>((props, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className="fixed bottom-4 right-4 flex flex-col p-4 gap-2 w-96 max-w-full z-[9999] outline-none"
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={_cn(
      "bg-white rounded-md shadow-md border p-4 grid grid-cols-[auto_1fr_auto] items-center gap-4",
      className
    )}
    {...props}
  />
));
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentProps<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={_cn("text-sm font-semibold text-gray-900", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentProps<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={_cn("text-sm text-gray-700 opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  React.ComponentProps<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={_cn(
      "opacity-70 hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md p-1 text-gray-900",
      className
    )}
    {...props}
  >
    <X className="w-4 h-4" />
  </ToastPrimitive.Close>
));
ToastClose.displayName = "ToastClose";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
