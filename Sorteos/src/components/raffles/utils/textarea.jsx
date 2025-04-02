import * as React from "react";
import "../../../css/textarea.css";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const textareaClasses = ["textarea", className || ""].join(" ").trim();

  return <textarea className={textareaClasses} ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };
