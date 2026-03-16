import { put } from '@vercel/blob';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  const form = await request.formData();

  const file = form.get('file') as File;
  const person_name = form.get('person_name') as string;
  const family_name = form.get('family_name') as string;

  const { url } = await put(file.name, file, { access: 'public', allowOverwrite: true });

  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`
    INSERT INTO family_photos (image_url, person_name, family_name)
    VALUES (${url}, ${person_name}, ${family_name})`;

  return Response.json({ url });
}
