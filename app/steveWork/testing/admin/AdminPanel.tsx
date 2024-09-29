"use client"
import AdminFooter from "../../components/admin/AdminFooter";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RightSidebar from "../../components/admin/RightSidebar";
import ShotTracker from "../../components/ShotTracker";
import LEDDisplayColor from "../../components/web/stats/LEDDisplayColor";
import localFont from "next/font/local";
import AdminPanelSidebar from "./AdminPanelSidebar";
import Tabber from "../../components/web/Tabber";
import Card from "../../components/web/Card";
import DropdownSelector from "./DropdownSelector";
import BigButton from "../../components/web/BigButton";
import ToggleCollapse from "../../components/web/ToggleCollapse";
import AdminPanelForm from "./AdminPanelForm";
const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });


const leagueOptions = [
    { label: "Leagues", value: "leagueId" },
];
const playerOptions = [
    { label: "Mike H", value: "playerId" },
    { label: "Greelz", value: "playerId" },
    { label: "Josh K", value: "playerId" },
    { label: "Another Kid", value: "playerId" },
    { label: "Some other Guy", value: "playerId" },
];

const handleSelect = (value: string) => {
    console.log("Selected:", value);
    // Add your logic for each option
};

const tabPanel = [
    {
        title: 'Games',
        content:
            (
                <AdminPanelForm onSelect={handleSelect} />
            )
    },
    {
        title: 'Players',
        content:
            (<div className="grid pb-10 gap-4 m-5 grid-flow-row  rounded-lg">
                <div className="flex flex-1 flex-col justify-center items-center">
                </div>
            </div>)
    },

];


export default function AdminPanel() {
    return (
        <>
            <>
                <div className="flex flex-col min-h-screen max-h-full">
                    <div className="flex-1 flex flex-col h-full">
                        <div className="flex h-full overflow-hidden homeRadial ">
                            {/* Left Column */}
                            <div className="row-span-5">
                                <AdminPanelSidebar />
                            </div>
                            {/* Center Column */}
                            <div className="flex-1 p-6 bg-transparent bg-transparent">
                                <h1 className="text-center w-full">Admin Panel</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Leagues</h3>
                                        <p className="mt-2 text-3xl">1</p>
                                    </div>
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Seasons</h3>
                                        <p className="mt-2 text-3xl">3</p>
                                    </div>
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Teams</h3>
                                        <p className="mt-2 text-3xl">22</p>
                                    </div>
                                    <div className="bggrayd-nohov p-6 rounded-lg text-white">
                                        <h3 className="text-lg font-semibold">Total Players</h3>
                                        <p className="mt-2 text-3xl">45</p>
                                    </div>
                                </div>
                                <div className="mt-10 p-4 bggrayd-nohov rounded">
                                    <div className="mx-4 pt-4">
                                        <DropdownSelector label="Select League" options={leagueOptions} onSelect={handleSelect} />
                                        <div className="my-4">
                                            Choose a team
                                        </div>
                                        <div className="grid grid-flow-col grid-cols-4 gap-4">
                                            <BigButton url={""} content={"AC130s"} />
                                            <BigButton url={""} content={"Banana Boat Boys"} />
                                            <BigButton url={""} content={"The Tundra"} />
                                            <BigButton url={""} content={"Team"} />
                                        </div>


                                        <div className="w-full my-8">
                                            <Tabber tabPanel={tabPanel} />
                                        </div>


                                    </div>
                                </div>

                            </div>
                            {/* Right Column */}
                            <div className="row-span-5">
                                <RightSidebar />
                            </div>
                        </div>
                    </div>
                </div >
            </>
            <AdminFooter />
        </>
    )
}