import * as React from "react";
import "../../../css/button.css";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      "button",
      `button-variant-${variant}`,
      `button-size-${size}`,
      disabled ? "button-disabled" : "",
      className || "",
    ]
      .join(" ")
      .trim();

    return (
      <button
        className={buttonClasses}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
