'use client';

import { useRouter } from 'next/navigation';

export default function FileUpload({
  children,
  person_name,
  family_name,
}: {
  children: React.ReactNode;
  person_name: string;
  family_name: string;
}) {
  const router = useRouter();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('file', file);
    form.append('person_name', person_name);
    form.append('family_name', family_name);

    const res = await fetch('/api/upload', { method: 'POST', body: form });
    await res.json();
    router.refresh();
  }
  return (
    <label className="cursor-pointer block aspect-square relative">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e)}
      />
      {children}
    </label>
  );
}
