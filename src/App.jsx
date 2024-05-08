import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [text, setText] = useState('');
  const { listening, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({ onResult: handleListen });
    }
  }, [listening]);

  const handleClickStart = () => {
    startListening();
  }

  const handleClickStop = () => {
    stopListening();
  }

  const handleListen = (result) => {
    setText(result);
    console.log("Transcript:", result);
  }

  return (
    <div className="container flex flex-col justify-center items-center gap-2 h-[100vh]">
      <h1 className="text-5xl font-bold mb-10 tracking-wider">
        Speech to Text Converter
      </h1>
      <p>
        A React hook that converts speech from the microphone to text and makes
        it available to your React components.
      </p>
      <div className="flex justify-center items-center gap-2">
        <h1>{text}</h1>
      </div>

      <div className="flex items-center justify-center relative h-[50vh] border w-[50%]">
        <div className="flex gap-4 p-10 absolute bottom-3">
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Copy to clipboard
          </button>
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={handleClickStart}
            disabled={listening}
          >
            Start Listening
          </button>
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={handleClickStop}
            disabled={!listening}
          >
            Stop Listening
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
