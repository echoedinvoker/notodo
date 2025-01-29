import { useEffect, useRef, useState } from "react";

export const useRewardDisplay = () => {
  const [showRewards, setShowRewards] = useState(false);
  const giftButtonRef = useRef<HTMLDivElement>(null);
  const [giftButtonTop, setGiftButtonTop] = useState(0);

  useEffect(() => {
    if (giftButtonRef.current) {
      setGiftButtonTop(giftButtonRef.current.offsetTop);
    }
  }, []);

  return { showRewards, setShowRewards, giftButtonRef, giftButtonTop };
};
