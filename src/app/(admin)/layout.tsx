import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1">
      {/* header */}

      <Header />

      <div className="flex flex-col flex-1 lg:flex-row bg-gray-100">
        {/* sidebar */}

        <Sidebar />

        {/* main content */}
        <div className="flex flex-1 justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
