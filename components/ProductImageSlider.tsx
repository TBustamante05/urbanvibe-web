"use client";

import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";

// const images = [
//   "/fit1.jpeg",
//   "/fit2.jpeg",
//   "/fit1.jpeg",
//   "/fit2.jpeg",
//   "/fit1.jpeg",
//   "/fit2.jpeg",
//   "/fit1.jpeg",
//   "/fit2.jpeg",
// ];
type Props = {
  images: string[];
}

export default function ProductImageSlider({ images }: Props) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const el = thumbsRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 0);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const scrollThumbs = (dir: "up" | "down" | "left" | "right") => {
    const amount = 120;
    if (dir === "up") thumbsRef.current?.scrollBy({ top: -amount, behavior: "smooth" });
    if (dir === "down") thumbsRef.current?.scrollBy({ top: amount, behavior: "smooth" });
    if (dir === "left") thumbsRef.current?.scrollBy({ left: -amount, behavior: "smooth" });
    if (dir === "right") thumbsRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const goTo = useCallback(
    (index: number) => {
      if (index === active || animating) return;
      setDirection(index > active ? "down" : "up");
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 350);
    },
    [active, animating]
  );

  return (
    // Ocupa todo el espacio que le da el padre
    <div className="flex flex-col md:flex-row md:gap-3 w-full h-full">

      {/* Thumbnails — order-first en md para ir a la izquierda */}
      <div className="md:order-first order-last flex md:flex-col md:w-[72px] md:shrink-0 md:h-full mt-2 md:mt-0">

        {/* Flecha arriba — solo md+ */}
        <button
          onClick={() => scrollThumbs("up")}
          className={`hidden md:flex w-full justify-center py-1 text-gray-400 hover:text-black transition-all duration-200 ${
            canScrollUp ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Flecha izquierda — solo mobile */}
        <button
          onClick={() => scrollThumbs("left")}
          className={`flex md:hidden shrink-0 items-center px-1 text-gray-400 hover:text-black transition-all duration-200 ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Lista scrollable */}
        <div
          ref={thumbsRef}
          onScroll={checkScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="
            flex md:flex-col flex-row
            gap-2
            md:overflow-y-auto md:overflow-x-hidden
            overflow-x-auto overflow-y-hidden
            flex-1
            [&::-webkit-scrollbar]:hidden
          "
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative shrink-0 overflow-hidden transition-all duration-200
                w-[18vw] h-[24vw] md:w-full aspect-square md:h-auto md:aspect-[2/3]
                ${i === active ? "ring-1 ring-black" : "opacity-50 hover:opacity-80"}
              `}
            >
              <img
                src={src}
                alt={`Vista ${i + 1}`}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        {/* Flecha abajo — solo md+ */}
        <button
          onClick={() => scrollThumbs("down")}
          className={`hidden md:flex w-full justify-center py-1 text-gray-400 hover:text-black transition-all duration-200 ${
            canScrollDown ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Flecha derecha — solo mobile */}
        <button
          onClick={() => scrollThumbs("right")}
          className={`flex md:hidden shrink-0 items-center px-1 text-gray-400 hover:text-black transition-all duration-200 ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Imagen principal — ocupa el resto del alto disponible */}
      <div className="relative flex-1 overflow-hidden min-h-0">
        <img
          key={active}
          src={images[active]}
          alt="Producto"
          className={`w-full h-full object-cover object-top transition-all ease-out duration-[350ms] ${
            animating
              ? direction === "down"
                ? "opacity-0 translate-y-3"
                : "opacity-0 -translate-y-3"
              : "opacity-100 translate-y-0"
          }`}
        />
        <span className="absolute bottom-4 left-4 text-xs text-white/70 tracking-widest font-mono">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}