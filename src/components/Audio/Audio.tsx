'use client';

import { useState, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { AudioVisualizer } from 'react-audio-visualize';

const lottieAnimationUrl = 'https://assets.lottiefiles.com/packages/lf20_5c1zrs.json';

export default function Audio() {
    const [isConversationActive, setIsConversationActive] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const visualizerRef = useRef<HTMLCanvasElement>(null);

    const toggleConversation = () => {
        setIsConversationActive(!isConversationActive);
    };

    // Example function to set audioBlob, replace with actual logic
    const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAudioBlob(event.target.files[0]);
        }
    };

    return (
        <div className="bg-custom-dark h-[313px] w-[552px] p-4 rounded-[24px] bg-red flex flex-col items-center justify-center">
            <h1 className="font-semibold text-xs text-white center flex justify-center">
                {isConversationActive ? 'Finish a conversation with assistants' : 'Start a conversation with assistants'}
            </h1>

            <button onClick={toggleConversation} className="mt-4">
                {isConversationActive ? (
                    <img src='/images/red.svg' alt="Voice" />
                ) : (
                    <img src='/images/blue.svg' alt="Voice" />
                )}
            </button>

            <input type="file" accept="audio/*" onChange={handleAudioUpload} className="mt-4" />

            {audioBlob && (
                <AudioVisualizer
                    ref={visualizerRef}
                    blob={audioBlob}
                    width={500}
                    height={75}
                    barWidth={1}
                    gap={0}
                    barColor={'#f76565'}
                />
            )}
        </div>
    );
}
