import { cn } from "@/lib/utils";

export function MaskedHeading({ className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        "text-center text-3xl sm:text-4xl md:text-5xl md:leading-[1.125] lg:text-6xl lg:leading-[1.125] tracking-tighter font-medium bg-[radial-gradient(circle_farthest-corner_at_50%_50%,_rgba(255,255,255,1),_rgba(255,255,255,0.25))] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
}
