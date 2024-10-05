import React from "react";
import HomeContent from "./layouts/home/HomeContent";
import AdminFooter from "./components/admin/AdminFooter";

export default function HomePage() {
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