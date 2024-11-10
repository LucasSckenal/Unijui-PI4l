import { useState, useEffect } from "react";

const useWindowResize = (breakpoint = 720) => {
  const [isHidden, setIsHidden] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsHidden(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isHidden;
};

export default useWindowResize;
