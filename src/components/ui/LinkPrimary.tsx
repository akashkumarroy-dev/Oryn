'use client';

import { Code, ArrowUpRight } from "reicon-react";
import { useGSAP } from "@/components/custom/useGSAP";

const icons = {
  code: Code,
  arrow: ArrowUpRight,
};

type Props = {
  text: string;
  className?: string;
  icon?: keyof typeof icons;
};

const LinkPrimary = ({ text, className = "", icon }: Props) => {
  const Icon = icon ? icons[icon] : null;
  const { elementRef, animate } = useGSAP<HTMLDivElement>({
    duration: 0.25,
    ease: "power2.out",
  });

  const onEnter = () => {
    animate(elementRef.current, { opacity: 1, x: 0, width: 36, scale: 1.5 });
  };

  const onLeave = () => {
    animate(elementRef.current, { opacity: 0, x: -4, width: 0, scale: 1 });
  };

  return (
    <div
      className={`flex cursor-pointer items-center text-primary-foreground transition-colors hover:text-accent-p ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {text}
      {Icon && (
        <span className="flex items-center overflow-hidden text-primary-foreground">
          <Icon
            ref={elementRef as React.Ref<SVGSVGElement>}
            className="size-4"
            style={{ opacity: 0, width: 0, transform: "translateX(-4px)", scale: 1 }}
          />
        </span>
      )}
    </div>
  );
};

export default LinkPrimary;
