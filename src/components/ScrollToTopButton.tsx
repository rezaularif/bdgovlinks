"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollElement = document.documentElement;
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageHeight = scrollElement.scrollHeight;
      const nearBottomThreshold = 120; // px from bottom

      // Show only when user is near the bottom of the page
      setShow(viewportBottom >= pageHeight - nearBottomThreshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={cn(
        "fixed right-4 bottom-24 sm:bottom-10 md:bottom-6 z-50 rounded-full bg-primary text-primary-foreground",
        "shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "p-3 sm:p-3.5",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}


