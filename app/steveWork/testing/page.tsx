import React from "react";
import HomeLayout from "../layouts/home/HomeLayout";
import TestPage from "./TestPage";
import AdminFooter from "../components/admin/AdminFooter";
import { getSeasons } from "@/app/database";



export default async function Home() {
    const data = await getData();
    console.log('Data in HomeLayout:', data);

    const seasons = getSeasons(data);


    return (
        <>
            <TestPage />
            <AdminFooter />
        </>
    )
};

function getData() {
    throw new Error("Function not implemented.");
}
