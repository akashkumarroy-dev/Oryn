import type { ButtonHTMLAttributes } from "react";
import GoogleIcon from "@/components/svg/GoogleIcon";
import GitHubIcon from "@/components/svg/GitHubIcon";

const icons = {
  google: GoogleIcon,
  github: GitHubIcon,
} as const;

const base =
  "group relative isolate flex w-full cursor-pointer items-center justify-center gap-3 px-4 py-2.5 " +
  "text-[14px] leading-5 font-medium antialiased " +
  "transition-[font-size] duration-200 ease-out " +
  "hover:text-[15px] active:text-[14px] active:duration-75 " +
  "motion-reduce:transition-none motion-reduce:hover:text-[14px] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-p focus-visible:ring-offset-2 focus-visible:ring-offset-black " +
  "disabled:cursor-not-allowed disabled:opacity-50";

// Only the background and border scale; text is never transformed
const layer =
  "pointer-events-none absolute inset-0 -z-10 border " +
  "transition-[transform,scale,background-color,border-color] duration-200 ease-out " +
  "group-hover:scale-[1.03] group-active:scale-[0.97] group-active:duration-75 " +
  "motion-reduce:transition-none motion-reduce:group-hover:scale-100";

// Icon scales separately (SVG stays sharp when scaled)
const iconWrap =
  "flex shrink-0 transition-[transform,scale] duration-200 ease-out " +
  "group-hover:scale-110 group-active:scale-100 group-active:duration-75 " +
  "motion-reduce:transition-none motion-reduce:group-hover:scale-100";

const themes = {
  primary: "border-primary-foreground/95 bg-primary-foreground/95",
  secondary: "border-primary-foreground/15 bg-primary-foreground/5",
} as const;

const textColors = {
  primary: "text-primary",
  secondary: "text-primary-foreground",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  theme?: keyof typeof themes;
  icon?: keyof typeof icons;
};

const ButtonPrimary = ({
  label,
  icon,
  theme = "primary",
  className = "",
  type = "button",
  ...rest
}: Props) => {
  const Icon = icon ? icons[icon] : null;

  return (
    <button
      type={type}
      data-cursor="button"
      className={`${base} ${textColors[theme]} ${className}`.trim()}
      {...rest}
    >
      <span aria-hidden className={`${layer} ${themes[theme]}`} />
      {Icon && (
        <span aria-hidden className={iconWrap}>
          <Icon />
        </span>
      )}
      {label}
    </button>
  );
};

export default ButtonPrimary;