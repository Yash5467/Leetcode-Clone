import React from "react";

function Skeleten({ height, width, radius }) {
 
    return (
      <div className="animate-pulse mx-auto dark:bg-dark-fill-3 shadow-md rounded p-6" style={{ width, height }}>
      </div>
    );
 
}

export default Skeleten;
