import Link from "next/link";

export default function Button({
  children,
  className,
  link,
  href,
  onClick,
  variant = "secondary"
}) {
  const baseClasses = "font-inter-regular text-sm rounded-md border py-2 px-4 cursor-pointer";
  
  const variantClasses = variant === "primary" 
    ? "border-[#9BFFB1] text-white bg-gradient-to-b from-[#1F7148] to-[#0A3E24]" 
    : "border-[#9BFFB1] text-[#9BFFB1]";
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${className || ''}`;
  
  if (link) {
    return (
      <Link 
        href={href || "#"} 
        className={combinedClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={combinedClasses}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
