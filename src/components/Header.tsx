import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className=" bg-white flex justify-between p-5 shadow-sm text-gray-800">
      <Link href="/" className="flex items-center text-4xl font-thin gap-2">
        <Avatar seed="Distronix Chat Agent" />
        <div className="space-y-1">
          <h1>Promptly AI</h1>
          <h2 className="text-sm">Build & Share Your Custom AI Assistants</h2>
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
