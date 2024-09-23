import React, { useRef, useState } from "react";



export default function Clock() {
  const [time, setTime] = useState(960);

  const interval = useRef<NodeJS.Timeout | null>(null);
  const mins = Math.floor(time / 60);
  let secs = time % 60 || "00";
  if (secs !== "00" && (secs as number) < 10) {
    secs = "0" + secs;
  }

  return (
    <div className="text-lg  ">
      <div className="text-lg">
        {mins}:{secs}
      </div>
      <div className="flex justify-around">
        <button
          className="p-1 m-1 hover:bg-blue-200"
          onClick={() => {
            console.log(interval.current);
            if (!interval.current) {
              interval.current = setInterval(
                () => setTime((prev) => --prev),
                1000
              );
            }
          }}
        >
          ▶
        </button>
        <button
          className="p-1 m-1 hover:bg-blue-200"
          onClick={() => {
            if (interval.current) {
              clearInterval(interval.current);
              interval.current = null;
            }
          }}
        >
          🛑
        </button>
        <button className="p-1 m-1 hover:bg-blue-200" onClick={() => setTime((prev) => ++prev)}>
          ▲
        </button>
        <button className="p-1 m-1 hover:bg-blue-200" onClick={() => setTime((prev) => --prev)}>
          ▼
        </button>
        <button className="p-1 m-1 hover:bg-blue-200" onClick={() => setTime(960)}>
          <span style={{ color: 'white' }}>&#9851;</span>
        </button>
      </div>
    </div>
  );
}
