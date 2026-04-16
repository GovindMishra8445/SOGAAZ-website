import { useEffect, useRef, useState } from "react";
import TopNavbar from "./components/layout/TopNavbar";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (window.innerWidth < 1024) {
        setScrolledDown(currentY > lastScrollY.current && currentY > 60);
      } else {
        setScrolledDown(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LanguageProvider>
      {/* TopNavbar — hidden on mobile via hidden lg:block */}
      <TopNavbar />

      {/* Navbar — sticky, hides on scroll-down on mobile */}
      <div
        className={`sticky top-0 z-40 navbar-scroll-hide ${
          scrolledDown ? "scrolled-down" : ""
        }`}
      >
        <Navbar />
      </div>

      <AppRoutes />
    </LanguageProvider>
  );
}

export default App;