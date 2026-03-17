import Image from 'next/image';
import FileUpload from './FileUpload';

interface INameChip {
  person_name: string;
  family_name: string;
  color: string;
  textColor: string;
  imgUrl?: string;
}

export default function NameChip({
  person_name,
  family_name,
  color,
  textColor,
  imgUrl,
}: INameChip) {
  const personNameInitial = person_name[0].toUpperCase();
  const familyNameInitial = family_name[0].toUpperCase();

  return (
    <>
      <span className="text-xs text-center">{person_name}</span>
      <FileUpload family_name={family_name} person_name={person_name}>
        {imgUrl && (
          <Image
            className="rounded-full object-none p-1"
            fill
            alt={person_name + ' ' + family_name}
            src={imgUrl}
          />
        )}
        {!imgUrl && (
          <div
            className={`${color} ${textColor} m-1 rounded-full aspect-square font-bold flex items-center justify-center`}
          >
            {personNameInitial}
            {familyNameInitial}
          </div>
        )}
      </FileUpload>
    </>
  );
}
