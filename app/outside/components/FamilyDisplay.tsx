'use client';

import { useState } from 'react';
import PersonSquare from './PersonSquare';
import DateFilterSelect from './DateFilterSelect';
import YearDisplay from './YearDisplayGithub';
import { PhotoData, FamilyTable } from '../[family]/page';

const DATE_PRESETS = {
  today: 'today',
  yesterday: 'yesterday',
  'one-week-ago': 'one-week-ago',
  'one-month-ago': 'one-month-ago',
  'start-of-year': 'start-of-year',
} as const;

type DatePreset = keyof typeof DATE_PRESETS;

function getPresetDate(preset: DatePreset): Date {
  const date = new Date();

  switch (preset) {
    case 'today':
      break;
    case 'yesterday':
      date.setDate(date.getDate() - 1);
      break;
    case 'one-week-ago':
      date.setDate(date.getDate() - 7);
      break;
    case 'one-month-ago':
      date.setMonth(date.getMonth() - 1);
      break;
    case 'start-of-year':
      date.setMonth(0);
      date.setDate(1);
      break;
  }

  date.setHours(0, 0, 0, 0); // normalize to midnight
  return date;
}

export default function FamilyDisplay({
  allData,
  family,
  photoData,
}: {
  allData: FamilyTable[];
  family: string;
  photoData: PhotoData[];
}) {
  const [preset, setPreset] = useState<DatePreset>('one-week-ago');
  const dateFilter = getPresetDate(preset);

  const nameMap = new Map<string, FamilyTable[]>();
  for (const row of allData) {
    const name = row.person_name;
    if (!nameMap.has(name)) nameMap.set(name, []);
    nameMap.get(name)!.push(row);
  }

  return (
    <>
      <div className="text-sm text-center">
        <span>Showing data for the {family} family for </span>
        <DateFilterSelect
          current={preset}
          DATE_PRESETS={DATE_PRESETS}
          onChange={(val) => setPreset(val)}
        />
      </div>
      <div className="flex-1 flex flex-col gap-3 p-3">
        <div className="flex gap-3 justify-center">
          {[...nameMap.entries()].map(([person, data]) => {
            const hoursTo1000 = data.reduce((t, r) => t + Number(r.hours_outside), 0);
            const hoursToDisplay = data.reduce(
              (t, r) => t + (new Date(r.date) > dateFilter ? Number(r.hours_outside) : 0),
              0
            );

            return (
              <PersonSquare
                key={person}
                imgUrl={photoData.find((pd) => pd.person_name === person)?.image_url}
                person_name={person}
                family_name={family}
                hoursTo1000={hoursTo1000}
                hoursToDisplay={hoursToDisplay}
              />
            );
          })}
        </div>
        <YearDisplay data={allData} />
      </div>
    </>
  );
}
