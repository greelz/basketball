"use server";

import {ReactNode} from "react";

interface IFormProps {
  title: string;
  elements: string[];
  action?: string | ((formData: FormData) => void | Promise<void>);
  actionButtonText: string;
  children?: ReactNode;
}

export default async function PrettyForm(props: IFormProps) {
  return (
    <div className="flex flex-col gap-4 items-center p-3">
      <div className="text-center">{props.title}</div>
      <form
        action={props.action}
        className="flex flex-col p-6 px-14 gap-6 border-1 border-slate-600 rounded-md shadow-md shadow-slate-800"
      >
        {props.elements.map((elem, idx) => {
          return (
            <div key={elem} className="flex flex-col gap-1">
              <label key={elem} htmlFor={elem}>
                {elem}
              </label>
              <input
                required
                autoFocus={idx === 0}
                key={elem + "input"}
                id={elem}
                name={elem}
                className="appearance-none px-2 py-1 border-slate-400 border-1 focus:outline-2 outline-offset-2 outline-slate-400 rounded-md"
                type="text"
              />
            </div>
          );
        })}
        {props.children}
        <button className="btn-blue mt-10" type="submit">
          {props.actionButtonText}
        </button>
      </form>
    </div>
  );
}
