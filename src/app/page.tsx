import React from "react";
import {Button, ButtonGroup, NextUIProvider} from "@nextui-org/react";
import Audio from "@/components/Audio/Audio";

export default function Home() {
    
  return (
    <React.StrictMode>

    <NextUIProvider>

    <main className="dark flex justify-center flex-col items-center ">
        <div className="pt-[130px] pb-[130px]">
        <ButtonGroup className="inline-block p-[2px] text-xs:12px text-white bg-transparent	border-custom-pink">
      <Button     className="w-[98px] h-[35px] borderRadius: '10px 0 0 10px' bg-transparent  border border-custom-pink  text-xs font-semibold"
      >audio</Button>
      <Button className="w-[98px] h-[35px] bg-transparent border border-custom-pink text-xs font-semibold" 	 >form</Button>
      <Button className="w-[98px] h-[35px] borderRadius: '0 10px 10px 0' bg-transparent	 border border-custom-pink text-xs font-semibold">stock</Button>
    </ButtonGroup>
        </div>
<Audio/>
    </main>
    </NextUIProvider>
    </React.StrictMode>
  );
}