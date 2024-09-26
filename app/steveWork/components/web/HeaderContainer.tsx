




export default function HeaderContainer() {

    //dummydata
    const teams = [
        "Lakeside Hoopers",
        "Mountain Eagles",
        "River City Royals",
        "Downtown Dribblers",
        "Coastline Crushers",
        "Skyline Slammers",
        "Valley Hustlers",
        "Parkside Panthers",
        "Sunset Ballers",
        "Ridgeview Raptors"
    ];

    const dates = [
        "2024-01-15",
        "2024-02-22",
        "2024-03-30",
        "2024-04-10",
        "2024-05-18",
        "2024-06-25",
        "2024-07-03",
        "2024-08-12",
        "2024-09-28",
        "2024-10-05"
    ];

    const locations = [
        "Lakeside Arena",
        "Mountain High Gym",
        "Riverfront Court",
        "Downtown Stadium",
        "Seaside Sports Center",
        "Skyline Pavilion",
        "Valley View Dome",
        "Parkside Arena",
        "Sunset Coliseum",
        "Ridgeview Sportsplex"
    ];

    function genDummyData() {
        const matchups = [];
        const numberOfMatches = Math.min(teams.length, dates.length, locations.length);

        for (let i = 0; i < numberOfMatches; i++) {
            const team1 = teams[i];
            const team2 = teams[(i + 1) % teams.length];
            const date = dates[i];
            const location = locations[i];

            matchups.push({ team1, team2, date, location });
        }
        // console.log(JSON.stringify(matchups));
        return matchups;
    }

    const matchups = genDummyData();
    return (
        <div className="mt-4 mx-6 shadow-lg">
            <div className="bgorangegrad max-h-16 mx-6 flex justify-center items-center border-white border ">
                <p className="m-0 p-2">Upcoming Games</p>
            </div>
            <div className="bg-gray-200 mx-6">
                <div className="relative overflow-hidden shadow-md rounded-lg">
                    <table className="table-fixed w-full text-left">
                        <thead className="bggrayd-nohov">
                            <tr>
                                <td className="py-2 border text-center  p-4" >Date</td>
                                <td className="py-2 border text-center  p-4" >Team 1</td>
                                <td className="py-2 border text-center  p-4" >Team 2</td>
                                <td className="py-2 border text-center  p-4" >Location</td>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-900 ">
                            {matchups.map((m, idx) => (
                                <tr key={`matchup${idx}`}
                                    className={`py-0 ${idx % 2 === 0 ? 'bgwhitehover' : 'bggrayhover'}`}>
                                    <td key={`${m.date}${idx}`} className="py-0 border-t border-b   p-4" >{m.date}</td>
                                    <td key={`${m.team1}${idx}`} className="py-0 border-t border-b   p-4" >{m.team1}</td>
                                    <td key={`${m.team2}${idx}`} className="py-0 border-t border-b   p-4" >{m.team2}</td>
                                    <td key={`${m.location}${idx}`} className="py-0 border-t border-b   p-4" >{m.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

