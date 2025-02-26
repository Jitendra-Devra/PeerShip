import React from "react";
import clsx from "clsx";

const buttonVariants = {
  default: "bg-[#007BFF] text-white hover:bg-[#007BFF]/90",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "text-gray-700 hover:bg-gray-500",
  link: "text-blue-600 underline-offset-4 hover:underline",
  profile:"bg-[#007BFF] text-white hover:bg-[#007BFF]/90"
};

const buttonSizes = {
  default: "h-8 px-3 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-10 px-6 text-lg",
  icon: "h-12 w-12", // Removed rounded-full from here
};

const Button = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50 hover:shadow-md",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };