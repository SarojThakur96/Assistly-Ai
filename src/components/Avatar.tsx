import React from "react";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import Image from "next/image";

const Avatar = ({ seed, className }: { seed: string; className?: string }) => {
  const avatar = createAvatar(bottts, {
    seed,
  });

  const svg = avatar.toString();
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <Image
      src={dataUrl}
      alt="Avatar"
      className={className}
      width={100}
      height={100}
    />
  );
};

export default Avatar;
