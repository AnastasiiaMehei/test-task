'use client';

import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Audio() {
    const [isConversationActive, setIsConversationActive] = useState(false);

    const handleConversationToggle = () => {
        setIsConversationActive(!isConversationActive);
    };

    return (
        <div className="bg-custom-dark h-[313px] w-[552px] mb-[50px] p-4 rounded-[24px]  flex flex-col items-center justify-center">
            <h1 className="font-semibold text-xs text-white center flex justify-center">
                {isConversationActive ? 'Finish a conversation with assistants'  : 'Start a conversation with assistants'}
            </h1>
            {isConversationActive ? (
  <button  
  className="mt-4 p-2 rounded-full relative" 
  onClick={handleConversationToggle}
>
  <img src='/images/red.svg' alt="Voice" style={{position:"absolute"}}/>
  <DotLottieReact
    src='/animation/red.json'
    loop
    autoplay
    style={{ width: '186px', height: '110px'}}
  />
</button>
) : (
  <button  
    className="mt-4 p-2 rounded-full relative" 
    onClick={handleConversationToggle}
  >
    <img src='/images/blue.svg' alt="Voice" style={{position:"absolute"}}/>
    <DotLottieReact
      src='/animation/blue.json'
      loop
      autoplay
      style={{ width: '185px', height: '176px'}}
    />
  </button>
)}

        </div>
    );
}
