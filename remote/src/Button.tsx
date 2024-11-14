import React, { useEffect } from "react";

type ButtonProps = {
  size: "small" | "large";
};

const Button: React.FC<ButtonProps> = ({ size }) => {
  useEffect(() => {
    console.log("[REMOTE] Hello from button");
  }, []);

  if (size === "large") {
    return <button>App2 Large Button</button>;
  }

  return <button>App 2 Small Button</button>;
};

export default Button;
