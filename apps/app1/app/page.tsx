"use client";
import { useState } from "react";

export default function Home() {
  const [saysHello, setSaysHello] = useState(true);

  const toggleHello = () => {
    setSaysHello(!saysHello);
  };

  console.log(process.env.CONFIG_VARIABLE);
  console.log("another change");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 data-testid="heading">{saysHello ? "Hello" : "Goodbye"} world!</h1>
        <button data-testid="toggleHelloButton" onClick={toggleHello}>
          Say {saysHello ? "Goodbye" : "Hello"}
        </button>
      </main>
    </div>
  );
}
