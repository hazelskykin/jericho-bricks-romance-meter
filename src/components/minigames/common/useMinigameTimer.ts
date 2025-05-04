
import { useState, useEffect, useRef } from 'react';

interface UseMinigameTimerProps {
  initialTime: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

export function useMinigameTimer({ initialTime, onTimeUp, autoStart = false }: UseMinigameTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => setTimeRemaining(initialTime);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            stopTimer();
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, onTimeUp]);

  return {
    timeRemaining,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
