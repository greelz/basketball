import React from "react";
import HomeLayout from "../layouts/home/HomeLayout";
import TestPage from "./TestPage";
import AdminFooter from "../components/admin/AdminFooter";

export default function Home() {
    return (
        <>
            <TestPage />
            <AdminFooter />
        </>
    )
};