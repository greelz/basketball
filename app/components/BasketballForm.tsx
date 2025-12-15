
interface IFormProps {
  action: (data: FormData) => Promise<void>;
  children: React.ReactNode;
  title: string;
}

export default function Form(props: IFormProps) {
  return <form
    className="border-1 border-slate-700 p-4 shadow-md rounded-md"
    action={props.action}
  >
    <h2 className="text-xl text-center mb-3">{props.title}</h2>
    {props.children}</form>;
}
