import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import GradientText from "./GradientText";

const Header = () => {
  return (
    <header className=" bg-white flex justify-between p-5 shadow-sm text-gray-800">
      <Link href="/" className="flex items-center text-4xl font-thin gap-2">
        <Avatar seed="Distronix Chat Agent" />
        <div className="space-y-1">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="ml-0"
          >
            <h1>Promptly AI</h1>
          </GradientText>
          <h2 className="text-sm font-semibold">
            Build & Share Your Custom AI Assistants
          </h2>
        </div>
      </Link>

      <div className="flex items-center ">
        <SignedIn>
          <UserButton showName />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
