import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef } from "react";

const content = [
  {
    content: (
      <video
        className="h-full w-full block object-cover"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        src="https://kstatic.googleusercontent.com/files/85186aa2414bd8633aa0a12a318c7dbd374e288b8c44b89386a51bd65032d1b421938517d3876dc0ebec71d83df9c0ddfc3bdbf6776aeffe06539fb671c77a9a"
      />
    ),
    title: "Tell us your vision",
    description: "We prioritize understanding your vision and needs to create tailor-made transformative solutions",
  },
  {
    content: (
      <video
        className="h-full w-full block object-cover"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        src="https://kstatic.googleusercontent.com/files/0e414032fe38f9da4aede249fe7a90d2be4f58e8e014fc376679925001ab0c9d96218edbb0a20026babba9c1b80115ce97231e6fcdf77da9b4ceabca1c143777"
      />
    ),
    title: "Receive the magic",
    description: "With our commitment to creativity, precision, and dedication to your success, we ensure the delivering exceptional products hoping to exceed expectations",
  },
  {
    content: (
      <video
        className="h-full w-full block object-cover"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        src="https://kstatic.googleusercontent.com/files/fdda5415953b685b5fc46f2324ff7926dd03194debde15cf9bd92bad7d33bd9ac8697e0c169d684809bc2843a4dfc4b44ba6c2524975f4647db1ab43fcc12913"
      />
    ),
    title: "Access continuous support",
    description: "To ensure sustained performance and longevity of our solutions, we provide maintenance and support services with regular updates.",
  },
];

export function StickyScroll({ className }: { className?: string }) {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div className="grid grid-cols-2 gap-12 relative w-full" ref={ref}>
      <div className="col-span-1">
        {content.map((item, index) => (
          <motion.div key={item.title + index} initial={{ opacity: 0.3 }} animate={{ opacity: activeCard === index ? 1 : 0 }} className="h-screen flex flex-col items-start justify-center">
            <motion.h2 className="text-4xl font-semibold text-foreground">{item.title}</motion.h2>
            <motion.p className="text-base text-foreground/75 mt-4">{item.description}</motion.p>
            <motion.p className="text-base text-foreground/75 mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id consequatur incidunt molestias amet sunt qui excepturi quisquam et ipsa nesciunt, reiciendis, ex unde nihil laboriosam, omnis accusantium vitae optio perferendis
              inventore at earum. Repellat, sit! Doloribus exercitationem harum, eius repellat debitis non odit modi error mollitia illum dolore corporis tempore, recusandae iste excepturi eligendi rem consectetur, et molestiae nam
              reiciendis corrupti maiores asperiores rerum! Maxime nisi illum ipsum omnis magnam doloribus ea, exercitationem odit veritatis, animi maiores eius! Excepturi minus voluptatem aut! Maiores nam aperiam qui, mollitia laborum
              incidunt blanditiis aut officiis nisi. Eum, dignissimos totam. Repellat, perferendis quod! Cum, in! Distinctio, aliquam accusamus amet harum quaerat fugiat esse illo culpa consectetur ad officia ut voluptatem, sint iure unde
              nemo placeat ipsa sit provident quisquam dicta! Sint deleniti doloremque tenetur labore voluptates rem odio adipisci.
            </motion.p>
          </motion.div>
        ))}
      </div>
      <div className={cn("col-span-1 sticky top-0 h-screen", className)}>
        {content.map((item, index) => (
          <div className={cn("absolute inset-y-6 inset-x-0 rounded-xl transition-opacity overflow-hidden", activeCard === index ? "opacity-100 z-10" : "opacity-0 z-0")}>{item.content}</div>
        ))}
      </div>
    </motion.div>
  );
}
