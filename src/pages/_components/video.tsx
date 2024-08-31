import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import animation from "@/assets/videos/hero.mp4";

export function HeroVideoAnimation() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const unsubscribe = scrollYProgress.on("change", (value) => {
        const time = +(video.duration * value).toFixed(3);
        video.currentTime = time;
      });
      return () => {
        unsubscribe();
      };
    }
  }, [videoRef.current]);

  return (
    <div className="h-[300vh]" ref={containerRef}>
      <div className="flex items-center justify-center h-screen sticky top-0 p-2 md:p-20">
        <div className="w-full relative" style={{ perspective: "1000px" }}>
          <Card rotate={rotate} translate={translate} scale={scale}>
            <div className="border md:border-2 border-card bg-card backdrop-blur-lg rounded-2xl p-2 md:p-5 h-full w-full">
              <video muted preload="preload" ref={videoRef} src={animation} className="w-full h-auto rounded-xl" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const Card = ({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; translate: MotionValue<number>; children: React.ReactNode }) => {
  return (
    <motion.div style={{ rotateX: rotate, scale }} className="max-w-screen-lg mx-auto w-full rounded-2xl shadow-2xl">
      {children}
    </motion.div>
  );
};
