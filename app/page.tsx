import React from "react";
import HomeLayout from "./steveWork/layouts/home/HomeLayout";
import HomeContent from "./steveWork/layouts/home/HomeContent";
import AdminFooter from "./steveWork/components/admin/AdminFooter";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col">
          <HomeContent />
        </div>
        <AdminFooter />
      </div >
    </>
  )
};