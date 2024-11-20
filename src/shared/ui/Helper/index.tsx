import React, { ReactNode, useEffect, useRef } from "react";
import { useHelperStore } from "./store";
import { HelperContainer } from "./style";

interface HelperProps {
  children: ReactNode;
}

export const Helper: React.FC<HelperProps> = ({ children }) => {
  const closeHelper = useHelperStore((state) => state.close);
  const isOpen = useHelperStore((state) => state.isOpen);

  const helperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helperRef.current &&
        !helperRef.current.contains(event.target as Node)
      ) {
        closeHelper(); // Закрываем Helper, если клик был вне области
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeHelper]);

  return (
    isOpen && (
      <HelperContainer ref={helperRef}>
        {children}
      </HelperContainer>
    )
  );
};
