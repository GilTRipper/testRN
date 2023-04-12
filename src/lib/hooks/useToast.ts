import React from "react";
import { ToastContext, ToastType } from "../core/ToastProvider";

export function useToast() {
  const toast = React.useContext(ToastContext);

  const add = ({ duration, status, message }: ToastType) => {
    toast?.setToast({ duration, status, message });
  };

  return { add };
}
