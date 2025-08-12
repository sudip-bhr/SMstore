import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";

type ToastOptions = {
  title: string;
  description?: string;
};

export function useToast() {
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState<ToastOptions | null>(null);

  function toastFn({ title, description }: ToastOptions) {
    setToast({ title, description });
    setOpen(true);
  }

  const ToastElement = toast ? (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      className="z-50"
      duration={4000}
    >
      <ToastPrimitive.Title className="text-sm font-semibold text-gray-900">
        {toast.title}
      </ToastPrimitive.Title>
      {toast.description && (
        <ToastPrimitive.Description className="text-sm text-gray-700 opacity-90">
          {toast.description}
        </ToastPrimitive.Description>
      )}
      <ToastPrimitive.Close
        className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md p-1 text-gray-900"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  ) : null;

  return {
    toast: toastFn,
    ToastElement,
  };
}
