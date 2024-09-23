import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1201 })
    const isWidescreen = useMediaQuery({ minWidth: 1202 })

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWidescreen
  };
};

export default useResponsive;
