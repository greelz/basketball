import localFont from "next/font/local";
import LEDTracker from "./stats/LEDTracker";
import LEDDisplayColor from "./stats/LEDDisplayColor";
import UserIcon from "./Icons/UserIcon";
import LeaderboardRow from "./LeaderboardRow";

const statfont = localFont({ src: "../../../../public/fonts/dsdigi.ttf" });



export default function WebSectionList() {
    return (
        <>
            <div className="grid grid-flow-col bgbluegrad grid-cols-10">
                <div className="text-center  col-span-1 border-white border-2 lg:col-span-2">Place</div>
                <div className="text-center  col-span-6 border-white border-2 lg:col-span-4">Teams</div>
                <div className="text-center  col-span-2 border-white border-2 lg:col-span-3">Record</div>
                <div className="text-center  col-span-1 border-white border-2 lg:col-span-1">MVP</div>


            </div>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><LeaderboardRow place={1} name={"Pack Mentality"} wins={5} loss={0} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"> <LeaderboardRow place={2} name={"AC130s"} wins={4} loss={1} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"> <LeaderboardRow place={3} name={"Banana Boat Boys"} wins={3} loss={2} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><LeaderboardRow place={4} name={"Ironfists"} wins={2} loss={3} /></a>
            <a href="/" className="hover:shadow-lg hover:shadow-white hover:text-lg"><LeaderboardRow place={5} name={"The Tundra"} wins={0} loss={5} /></a>
        </>

    )
}