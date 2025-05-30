import { useEffect, useRef, useState } from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      requestAnimationFrame(updateHeaderHeight);
    };

    // Initial setup
    updateHeaderHeight();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full top-0 left-0 bg-white/95 backdrop-blur-sm z-[999] transition-all duration-300 ${
          scrolled ? "py-2 shadow-sm" : "py-4"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between gap-2">
            <HeaderLeft />
            <HeaderCenter />
            <HeaderRight />
          </div>
        </div>
      </header>
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}
