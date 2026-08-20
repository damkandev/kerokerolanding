import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";

const buttonVariants = {
  primary: "kk-button-primary",
  secondary: "kk-button-secondary",
};

function RollingButtonText({ text }: { text: string }) {
  return (
    <span aria-label={text} className="kk-button-roll">
      {Array.from(text).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="kk-button-roll-letter"
          style={{ "--letter-index": index } as CSSProperties}
        >
          <span className="kk-button-roll-current">
            {letter === " " ? "\u00a0" : letter}
          </span>
          <span className="kk-button-roll-next">
            {letter === " " ? "\u00a0" : letter}
          </span>
        </span>
      ))}
    </span>
  );
}

function addRollingText(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return <RollingButtonText text={child} />;
    }

    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return cloneElement(child, undefined, addRollingText(child.props.children));
    }

    return child;
  });
}

export function PressableButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`kk-button ${buttonVariants[variant]} ${className}`}
    >
      {variant === "primary" ? addRollingText(children) : children}
    </button>
  );
}

export function PressableLink({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  target,
  rel,
}: {
  children: ReactNode;
  href: string;
  variant?: keyof typeof buttonVariants;
  className?: string;
  onClick?: () => void;
  target?: "_blank";
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={`kk-button ${buttonVariants[variant]} ${className}`}
      onClick={onClick}
      target={target}
      rel={rel}
    >
      {variant === "primary" ? addRollingText(children) : children}
    </a>
  );
}
