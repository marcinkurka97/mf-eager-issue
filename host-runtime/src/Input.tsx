import React, { useEffect } from "react";

const Input: React.FC = () => {
  useEffect(() => {
    console.log("[HOST-RUNTIME] Hello from input");
  }, []);

  return <input name="host mf input" placeholder="host mf input" />;
};

export default Input;
