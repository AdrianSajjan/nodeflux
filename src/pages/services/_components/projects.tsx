import laptop from "@/assets/images/frames/laptop.png";
import mobile from "@/assets/images/frames/mobile.png";
import webdashboard from "@/assets/images/projects/web-dashboard.png";
import mobiledashboard from "@/assets/images/projects/mobile-dashboard.png";
import webddental from "@/assets/images/projects/web-dental.png";
import mobiledental from "@/assets/images/projects/mobile-dental.png";
import webecommorce from "@/assets/images/projects/web-ecommerce.png";
import mobileecommerce from "@/assets/images/projects/mobile-ecommerce.png";
import { useState } from "react";

const projects = [
  {
    mobile: mobiledental.src,
    web: webddental.src,
    title: "Dental Clinic",
    description: "Fully integrated CMS Dental Platform",
  },
  {
    mobile: mobileecommerce.src,
    web: webecommorce.src,
    title: "E-commerce",
    description: "Fully integrated CMS Ecommerce Platform",
  },
  {
    mobile: mobiledashboard.src,
    web: webdashboard.src,
    title: "Web Dashboard",
    description: "Fully integrated CMS Admin Platform",
  },
];

export function DeliveredProjects() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row mt-20 gap-40">
      <div className="flex flex-1 justify-center items-center">
        <div className="relative w-full">
          <div className="relative">
            <img src={laptop.src} className="pointer-events-none" />
            <div className="absolute top-[4.5%] left-[8%] right-[7.9%] bottom-[8.5%] overflow-y-scroll scrollbar-hidden">
              <img src={projects[index].web} className="h-auto w-full" />
            </div>
          </div>
          <div className="absolute right-0 -bottom-12 w-3/12 h-auto">
            <div className="absolute top-[1.5%] left-[4.5%] right-[4%] bottom-[1.5%] rounded-[5%] overflow-y-scroll scrollbar-hidden">
              <img src={projects[index].mobile} className="h-auto w-full" />
            </div>
            <img src={mobile.src} className="relative w-full h-auto z-10 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col gap-6">
        {projects.map((project, index) => (
          <article className="flex items-center gap-4" role="button" tabIndex={0} onClick={() => setIndex(index)} key={index}>
            <img src={project.web} className="h-28 w-36 object-cover rounded-xl border object-top" />
            <div className="flex flex-col shrink-0 gap-px max-w-48">
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="text-foreground/80 text-sm">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
