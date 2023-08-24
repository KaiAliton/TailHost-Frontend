import React from "react";

function ResponseGrid({ children, orientation="block" , className = "" }) {
  if (orientation === "list") {
    return (
      <div className={`flex-col overflow-x-hidden flex my-5 ${className}`}>
        {children}
      </div>
    );
  } else {
    return (
      <div className={`flex flex-wrap ${className}`}>
        {children}
      </div>
    );
  }
}

export default ResponseGrid;
