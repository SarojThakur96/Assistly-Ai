import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";
import React from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
};

export default AdminLayout;
