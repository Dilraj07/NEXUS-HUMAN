import { SVGProps } from "react";

export function Reticle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M0 10V0H10" stroke="currentColor" strokeWidth="2" />
      <path d="M30 0H40V10" stroke="currentColor" strokeWidth="2" />
      <path d="M40 30V40H30" stroke="currentColor" strokeWidth="2" />
      <path d="M10 40H0V30" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
