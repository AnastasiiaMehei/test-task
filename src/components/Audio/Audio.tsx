// Audio.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

// Dynamically import the AudioVisualizer component
const AudioVisualizer = dynamic(() => import('react-audio-visualize').then(mod => mod.AudioVisualizer), { ssr: false });

const StyledVisualizer = styled.div`
  margin-top: 20px;
`;

export default function Audio() {
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!audioContext && !analyser) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const analyzer = context.createAnalyser();
      
      // Set up the analyzer
      analyzer.fftSize = 256;
      analyzer.smoothingTimeConstant = 0.3;
      
      setAudioContext(context);
      setAnalyser(analyzer);
    }
  }, []);

  useEffect(() => {
    if (audioContext && analyser) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          console.log('Microphone access granted');
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          console.log('Microphone connected to analyser');
        })
        .catch((err) => console.error('Error accessing microphone:', err));
    }
  }, [audioContext, analyser]);

  useEffect(() => {
    if (analyser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Failed to get 2D context');
        return;
      }
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i];
          ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      draw();
    }
  }, [analyser]);

  const handleConversationToggle = () => {
    setIsConversationActive(!isConversationActive);
  };


  return (
    <div className="bg-custom-dark h-[413px] w-[552px] mb-[50px] p-4 rounded-[24px] flex flex-col items-center justify-center">
      <h1 className="font-semibold text-xs text-white center flex justify-center">
        {isConversationActive ? 'Finish a conversation with assistants' : 'Start a conversation with assistants'}
      </h1>
      {isConversationActive ? (
        <>
          <button
            className="mt-4 p-2 rounded-full relative"
            onClick={handleConversationToggle}
          >
            <img src='/images/red.svg' alt="Voice" style={{ position: "absolute" }} />
            <DotLottieReact
              src='/animation/red.json'
              loop
              autoplay
              style={{ width: '185px', height: '176px' }}
            />
          </button>
          <StyledVisualizer>
            {analyser && (
              <AudioVisualizer
                audioContext={audioContext}
                analyser={analyser}
                type="bars"
                colors={['#ff0000', '#00ff00']}
                width={400}
                height={200}
              />
            )}
          </StyledVisualizer>
          <canvas ref={canvasRef} width={400} height={200} />
        </>
      ) : (
        <button
          className="mt-4 p-2 rounded-full relative"
          onClick={handleConversationToggle}
        >
          <img src='/images/blue.svg' alt="Voice" style={{ position: "absolute" }} />
          <DotLottieReact
            src='/animation/blue.json'
            loop
            autoplay
            style={{ width: '185px', height: '176px' }}
          />
        </button>
      )}
    </div>
  );
}
