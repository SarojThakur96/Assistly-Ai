import Avatar from "@/components/Avatar";
import React from "react";

function Loading() {
  return (
    <div className="mx-auto animate-ping p-10">
      <Avatar seed="Promptly Loading" />
    </div>
  );
}

export default Loading;
