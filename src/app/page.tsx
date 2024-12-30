import React from "react";
import {Button, ButtonGroup, NextUIProvider} from "@nextui-org/react";
import Stock from "@/components/Stock/Stock";
import './globals.css';
import App from "@/components/nextUiForm/App";
import Audio from "@/components/Audio/Audio";

export default function Home() {
    
  return (
    <React.StrictMode>

    <NextUIProvider>

    <main className="dark flex justify-center flex-col items-center ">
        <div className="pt-[130px] pb-[130px]">
        <ButtonGroup className="inline-block p-[2px] text-xs:12px text-white bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-[10px]">
      <Button     className="w-[98px] h-[35px] mr-[2px] borderRadius: '10px 0 0 10px' bg-custom-dark   text-xs font-semibold"
      >audio</Button>
      <Button className="w-[98px] h-[35px] mr-[2px] text-xs font-semibold  bg-custom-dark" 	 >form</Button>
      <Button className="w-[98px] h-[35px] borderRadius: '0 10px 10px 0'  bg-custom-dark	  text-xs font-semibold">stock</Button>
    </ButtonGroup>
        </div>
<Audio/>
    </main>
    </NextUIProvider>
    </React.StrictMode>
  );
}