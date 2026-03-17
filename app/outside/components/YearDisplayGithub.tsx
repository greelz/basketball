import { Key } from 'react';
import { FamilyTable } from '../[family]/page';

interface IYearDisplay {
  data: FamilyTable[];
}

interface ICalendarData {
  hours: number;
  date: Date;
}

export default function YearDisplay(props: IYearDisplay) {
  // Show a box for every day of the year, go vertical for 7 days as week
  //

  const firstDayOfThisYear = new Date();
  const today = new Date();
  const thisYear = firstDayOfThisYear.getFullYear();
  firstDayOfThisYear.setMonth(0);
  firstDayOfThisYear.setDate(1);

  const nullDaysToDisplay = firstDayOfThisYear.getDay();

  const hoursPerDay: ICalendarData[] = [];
  let maxVal = -1;

  while (firstDayOfThisYear.getFullYear() === thisYear) {
    const hours = props.data
      .filter((d) => d.date.toDateString() === firstDayOfThisYear.toDateString())
      .reduce((t, d) => Math.max(t, Number(d.hours_outside)), 0);

    hoursPerDay.push({ hours: hours, date: new Date(firstDayOfThisYear) });
    if (hours > maxVal) maxVal = hours;
    firstDayOfThisYear.setDate(firstDayOfThisYear.getDate() + 1);
  }

  console.log(hoursPerDay);

  const blankSquare = (key: Key | null | undefined, val?: string) => (
    <div
      key={key}
      className="flex justify-center items-center border border-gray-200 w-9 h-9 bg-white"
    >
      <div className="shadow-md">{val}</div>
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="size-fit grid gap-1 grid-cols-7">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((x, i) => blankSquare(i, x))}
        {Array.from({ length: nullDaysToDisplay }, (_x, i) => blankSquare(i))}
        {hoursPerDay.map((x, i) => (
          <div
            key={i}
            className="flex flex-col border border-gray-200 w-9 h-9 shadow-sm text-white"
            style={{ backgroundColor: `rgba(30, 58, 138, ${(x.hours / maxVal).toFixed(2)})` }}
          >
            <div
              className={`${x.hours === 0 ? 'text-black' : 'text-white'} text-[10px]/3 text-right mx-1`}
            >
              {x.date.getDate()}
            </div>
            {x.hours > 0 && (
              <div className="flex-1 text-center text-shadow-sm">{x.hours.toFixed(0)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
