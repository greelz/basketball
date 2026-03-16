import { neon } from '@neondatabase/serverless';
import Link from 'next/link';
import FamilyDisplay from '../components/FamilyDisplay';

export interface FamilyTable {
  id: number;
  family_name: string;
  person_name: string;
  date: Date;
  hours_outside: number;
}

export type PhotoData = Pick<FamilyTable, 'person_name' | 'family_name'> & { image_url: string };

export default async function Page(props: PageProps<'/outside/[family]'>) {
  let { family } = await props.params;
  family = family.charAt(0).toUpperCase() + family.substring(1);

  const allData = (await getFamilyData(family)) || [];
  const photoData = await getPhotoData(family);

  return (
    <div className="min-h-dvh flex flex-col">
      <h1 className="text-center text-xl border-b p-2">
        <strong>1000 Hours</strong> <i>Outside</i>
      </h1>
      <FamilyDisplay allData={allData} family={family} photoData={photoData} />
      <Link
        className="bg-purple-600 text-white m-3 px-4 py-2 max-w-[600px] text-center text-xl rounded-md shadow-md"
        href={`/outside/${family}/add`}
      >
        +Time Outside
      </Link>
    </div>
  );
}

async function getFamilyData(family: string): Promise<FamilyTable[]> {
  'use server';
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data: FamilyTable[] = await sql<FamilyTable>`
      SELECT * FROM family_outdoor_time WHERE family_name = ${family}`;

  return data;
}

async function getPhotoData(family: string): Promise<PhotoData[]> {
  'use server';
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data: PhotoData[] = await sql<PhotoData>`
      SELECT * FROM family_photos WHERE family_name = ${family}`;

  return data;
}
