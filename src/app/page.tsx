import React from "react";
import {Button, ButtonGroup, NextUIProvider} from "@nextui-org/react";

export default function Home() {
    
  return (
    <React.StrictMode>

    <NextUIProvider>

    <main className="dark flex justify-center items-center">
        <div className="p-1 bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-lg">
        <ButtonGroup className="p-1 bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-lg">
      <Button     className="bg-black rounded-lg "
      >audio</Button>
      <Button className="bg-black rounded-lg" >form</Button>
      <Button className="bg-black rounded-lg">stock</Button>
    </ButtonGroup>
        </div>

    </main>
    </NextUIProvider>
    </React.StrictMode>
  );
}