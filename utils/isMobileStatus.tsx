import { useEffect, useState } from "react";

export function useMobileStatus() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return isMobile;
}
