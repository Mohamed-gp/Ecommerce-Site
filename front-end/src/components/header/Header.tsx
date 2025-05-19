import { useEffect, useState, useRef } from "react";
import HeaderCenter from "./HeaderCenter";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      // Use RAF to ensure smooth height updates
      requestAnimationFrame(updateHeaderHeight);
    };

    // Initial setup
    updateHeaderHeight();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`bg-white/95 backdrop-blur-sm sticky z-[999] left-0 top-0 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
      style={{
        boxShadow: scrolled ? "rgba(0, 0, 0, 0.08) 0px 4px 12px" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          <HeaderLeft />
          <HeaderCenter />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
}
