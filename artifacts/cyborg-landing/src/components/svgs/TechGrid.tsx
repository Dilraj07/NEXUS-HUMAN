import { SVGProps } from "react";

export function TechGrid({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`absolute inset-0 h-full w-full pointer-events-none opacity-20 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern
          id="tech-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle cx="0" cy="0" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tech-grid)" />
    </svg>
  );
}
