'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const AudioVisualizer = dynamic(() => import('react-audio-visualize').then(mod => mod.AudioVisualizer), { ssr: false });

const StyledVisualizer = styled.div`
  margin-top: -428px;
`;
// margin-top: -372px;

const WEBSOCKET_URL = 'ws://localhost:8080/ws';

export default function Audio() {
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Ініціалізація WebSocket
  const initializeWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setError(null);
    };

    ws.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.type === 'audio') {
          // Обробка аудіо відповіді від сервера
          await playAudioResponse(response.audio);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        setError('Error processing server response');
      }
    };

    // ws.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    //   setError('Connection error');
    // };

    ws.onclose = () => {
      console.log('WebSocket closed');
      setWebSocket(null);
      // Спроба переконектитись через 3 секунди
      setTimeout(initializeWebSocket, 3000);
    };

    setWebSocket(ws);
  };

  // Ініціалізація аудіо контексту та аналізатора
  useEffect(() => {
    if (!audioContext && !analyser) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const analyzer = context.createAnalyser();
      
      analyzer.fftSize = 256;
      analyzer.smoothingTimeConstant = 0.3;
      
      setAudioContext(context);
      setAnalyser(analyzer);
    }
  }, []);

  // Налаштування медіа потоку
  useEffect(() => {
    if (audioContext && analyser) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          console.log('Microphone access granted');
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);

          // Налаштування MediaRecorder
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.current.push(event.data);
            }
          };

          recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
            audioChunks.current = [];

            if (webSocket?.readyState === WebSocket.OPEN) {
              const arrayBuffer = await audioBlob.arrayBuffer();
              webSocket.send(JSON.stringify({
                type: 'audio',
                data: Array.from(new Uint8Array(arrayBuffer))
              }));
            }
          };

          setMediaRecorder(recorder);
        })
        .catch((err) => {
          console.error('Error accessing microphone:', err);
          setError('Microphone access denied');
        });
    }
  }, [audioContext, analyser]);

  // Візуалізація аудіо
  useEffect(() => {
    if (analyser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!isConversationActive) return;
        
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
  }, [analyser, isConversationActive]);

  // Відтворення аудіо відповіді
  const playAudioResponse = async (audioData: ArrayBuffer) => {
    if (!audioContext) return;
    try {
      const audioBuffer = await audioContext.decodeAudioData(audioData);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    } catch (error) {
      console.error('Error playing audio:', error);
      setError('Error playing response');
    }
  };

  const handleConversationToggle = () => {
    if (!isConversationActive) {
      setIsConversationActive(true);
      initializeWebSocket();
      if (mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start();
        setIsRecording(true);
      }
    } else {
      setIsConversationActive(false);
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        setIsRecording(false);
      }
      if (webSocket) {
        webSocket.close();
      }
    }
  };

  return (
    <div className="bg-custom-dark h-[413px] w-[552px] mb-[50px] p-4 rounded-[24px] flex flex-col items-center justify-center">
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      <h1 className="font-semibold text-xs text-white center flex justify-center mt-[128px]">
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
      
      {/* Додаємо індикатор стану підключення */}
      {/* <div className="mt-4 text-white text-sm">
        {webSocket?.readyState === WebSocket.OPEN ? (
          <span className="text-green-500">Connected</span>
        ) : (
          <span className="text-red-500">Disconnected</span>
        )}
      </div> */}

      {/* Додаємо індикатор запису */}
      {/* {isRecording && (
        <div className="mt-2 text-red-500 text-sm">
          Recording...
        </div>
      )} */}

      {/* Показуємо помилки */}
      {/* {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )} */}
    </div>
  );
}


