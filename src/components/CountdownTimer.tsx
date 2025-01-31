import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
interface CountdownTimerProps {
  initialMinutes: number;
  onComplete: () => void;
}
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes,
  onComplete
}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = timeLeft / (initialMinutes * 60) * 100;
  return <div className="flex items-center space-x-2">
      <motion.div className="h-1 bg-gray-200 rounded-full w-full overflow-hidden" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }}>
        <motion.div className="h-full bg-red-600" initial={{
        width: "100%"
      }} animate={{
        width: `${percentage}%`
      }} transition={{
        duration: 0.5
      }} />
      </motion.div>
      <span className="text-sm font-medium whitespace-nowrap">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>;
};