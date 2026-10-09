import { Code, ArrowUpRight } from "reicon-react";

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

  return (
    <div
      className={`flex items-center gap-2 text-primary-foreground transition-colors hover:text-accent-p ${className}`}
    >
      {text}
      {Icon && <Icon className="size-4" />}
    </div>
  );
};

export default LinkPrimary;