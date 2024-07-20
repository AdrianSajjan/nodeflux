import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const items = [
  "https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65e6f16fa95b490d8d3fb73a_Client%20Image.svg",
  "https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65e6f16f339d299bf93f1370_Client%20Image%202.svg",
  "https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65e6f16f8445b00e6a194570_Client%20Image%203.svg",
  "https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65e6f16e270e08d7bfa25048_Client%20Image%204.svg",
  "https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65e6f16fa1b41cc00806b44a_Client%20Image%205.svg",
];

export function MarqueeBrands() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--scroll-direction", "forwards");
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--scroll-duration", "40s");
    }
  };

  return (
    <div ref={containerRef} className={cn("scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]")}>
      <ul ref={scrollerRef} className={cn("flex min-w-full shrink-0 gap-10 w-max flex-nowrap", "hover:[animation-play-state:paused]", start ? "animate-scroll" : "animate-none")}>
        {items.map((item, idx) => (
          <li className="w-[12.5rem] h-[4.5rem] relative flex-shrink-0 flex" key={item + idx}>
            <img src={item} alt="" className="w-full h-full object-contain" />
          </li>
        ))}
      </ul>
    </div>
  );
}
