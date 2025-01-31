import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";
export type ToastType = "success" | "error" | "info" | "warning";
interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}
const toastIcons = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />
};
const toastStyles = {
  success: "bg-green-50 text-green-600 border-green-200",
  error: "bg-red-50 text-red-600 border-red-200",
  warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
  info: "bg-blue-50 text-blue-600 border-blue-200"
};
export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose
}) => {
  return <AnimatePresence>
      {isVisible && <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -20
    }} className="fixed top-4 right-4 z-50">
          <div className={`flex items-center p-4 rounded-lg shadow-lg border ${toastStyles[type]}`}>
            <span className="mr-2">{toastIcons[type]}</span>
            <span className="mr-6">{message}</span>
            <button onClick={onClose} className="ml-auto hover:opacity-75 transition-opacity">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>}
    </AnimatePresence>;
};