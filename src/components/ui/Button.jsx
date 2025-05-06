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
  
  let variantClasses;
  
  if (variant === "primary") {
    variantClasses = "border-[#9BFFB1] text-white bg-gradient-to-b from-[#1F7148] to-[#0A3E24]";
  } else if (variant === "gran menu") {
    variantClasses = "border-[#59412B] bg-gradient-to-t from-[#5A3F26] text-white to-[#936B47] shadow-[inset_0px_-5px_2.2px_0px_rgba(0,0,0,0.25)]";
  } else {
    variantClasses = "border-[#9BFFB1] text-[#9BFFB1]";
  }
  
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
