import { cn } from "@/lib/utils";

export function MaskedHeading({ className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1 {...props} className={cn("text-center text-6xl tracking-tighter font-medium bg-[radial-gradient(circle_farthest-corner_at_50%_50%,_var(--white),_rgba(255,255,255,0))] bg-clip-text text-transparent", className)}>
      {children}
    </h1>
  );
}
