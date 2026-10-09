import type { SVGProps } from "react";

import type { PillarIcon } from "@/app/lib/site-config";

// Stroke icons from the design. All are decorative (aria-hidden); the
// surrounding link or button text carries the meaning.
type IconProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & { size?: number };

function StrokeIcon({
  size = 24,
  strokeWidth = 2,
  children,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </StrokeIcon>
  );
}

/** The long 26×12 arrow used on primary buttons. */
export function ArrowRightLongIcon(props: Omit<IconProps, "size">) {
  return (
    <svg
      width={26}
      height={12}
      viewBox="0 0 26 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 6h23" />
      <path d="M19 1l5 5-5 5" />
    </svg>
  );
}

export function ChatBubbleIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={1.8} {...props}>
      <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
    </StrokeIcon>
  );
}

const pillarIconPaths: Record<PillarIcon, React.ReactNode> = {
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17.5l9 5 9-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
};

export function PillarIconGlyph({ icon, ...props }: IconProps & { icon: PillarIcon }) {
  return (
    <StrokeIcon size={28} strokeWidth={1.7} {...props}>
      {pillarIconPaths[icon]}
    </StrokeIcon>
  );
}
