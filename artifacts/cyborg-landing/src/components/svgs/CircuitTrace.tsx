import { SVGProps } from "react";

export function CircuitTrace({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0 50H30L40 60H60L70 40H100"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
      />
      <circle cx="30" cy="50" r="2" fill="currentColor" />
      <circle cx="70" cy="40" r="2" fill="currentColor" />
    </svg>
  );
}
