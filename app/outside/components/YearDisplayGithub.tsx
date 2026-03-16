import { FamilyTable } from '../[family]/page';

interface IYearDisplay {
  data: FamilyTable[];
}

export default function YearDisplay(props: IYearDisplay) {
  // Show a box for every day of the year, go vertical for 7 days as week
  //

  const firstDayOfThisYear = new Date();
  const thisYear = firstDayOfThisYear.getFullYear();
  firstDayOfThisYear.setMonth(0);
  firstDayOfThisYear.setDate(1);

  const hoursPerDay = [];
  let maxVal = -1;

  while (firstDayOfThisYear.getFullYear() === thisYear) {
    const hours = props.data
      .filter((d) => d.date.toDateString() === firstDayOfThisYear.toDateString())
      .reduce((t, d) => t + Number(d.hours_outside), 0);

    hoursPerDay.push(hours);
    if (hours > maxVal) maxVal = hours;
    firstDayOfThisYear.setDate(firstDayOfThisYear.getDate() + 1);
  }

  return (
    <div className="flex justify-center">
      <div className="size-fit grid grid-flow-col gap-1 grid-rows-17 sm:grid-rows-13 md:grid-rows-10 lg:grid-rows-7">
        {hoursPerDay.map((x, i) =>
          x == 0 ? (
            <div key={i} className="border border-gray-200 w-3 h-3 bg-white"></div>
          ) : (
            <div
              key={i}
              className={`border border-gray-200 w-3 h-3 shadow-md bg-blue-800`}
              style={{ opacity: `${((x * 100) / maxVal).toFixed(0)}%` }}
            ></div>
          )
        )}
      </div>
    </div>
  );
}
