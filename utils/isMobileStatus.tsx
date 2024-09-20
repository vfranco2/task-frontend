import { useEffect, useState } from "react";

export const useMobileStatus = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= window.innerHeight) {
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
};
