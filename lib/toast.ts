// lib/toast.ts
"use client";

import { toast } from "sonner";

type ToastOptions = {
  action?: {
    label: string;
    onClick: () => void;
  };
  description?: string;
  duration?: number;
};

export const useToast = () => {
  const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    options?: ToastOptions
  ) => {
    const baseOptions = {
      duration: 5000,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, {
          ...baseOptions,
          style: { background: "#f0fdf4", color: "#166534" }, // green
        });
        break;
      case "error":
        toast.error(message, {
          ...baseOptions,
          style: { background: "#fef2f2", color: "#b91c1c" }, // red
        });
        break;
      case "warning":
        toast.warning(message, {
          ...baseOptions,
          style: { background: "#fffbeb", color: "#b45309" }, // amber
        });
        break;
      case "info":
        toast.info(message, {
          ...baseOptions,
          style: { background: "#eff6ff", color: "#1d4ed8" }, // blue
        });
        break;
    }
  };

  return { showToast };
};
