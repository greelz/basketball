'use client'

import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";

interface TitleTextAndGoComponentProps {
  title: string;
  onClick: (gameCode: string) => void;
}
export default function TitleTextAndGoComponent(
  props: TitleTextAndGoComponentProps
) {
  const [text, setText] = useState("");
  return (
    <div className="titleTextGoDiv">
      <div className="title">{props.title}</div>
      <input
        type="text"
        className="_text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ButtonComponent caption="Go" onClick={() => props.onClick!(text)} />
    </div>
  );
}
