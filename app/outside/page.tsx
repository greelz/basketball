'use server';

import Image from 'next/image';
import Form from 'next/form';
import { redirect } from 'next/navigation';

export default async function Page() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const family = formData.get('family')?.toString().toLowerCase();

    redirect(`/outside/${family}`);
  }
  return (
    <div className="min-h-dvh flex gap-2 items-center justify-center min-h-screen">
      <Image
        className="z-0 absolute h-full object-cover opacity-50"
        fill
        alt="nothing"
        src="/images/outside.png"
      ></Image>
      <Form
        action={handleSubmit}
        className="bg-white opacity-80 w-full z-10 p-5 flex flex-col gap-2 justify-center items-center"
      >
        <div>
          <label htmlFor="family">Family</label>
        </div>
        <div>
          <input name="family" type="text" className="border rounded-md px-2 py-1 text-xl"></input>
        </div>
        <button type="submit">
          <Image
            className="hover:border"
            alt="go"
            src="/images/fire.png"
            height={50}
            width={50}
          ></Image>
        </button>
      </Form>
    </div>
  );
}
