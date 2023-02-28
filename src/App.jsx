import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import reactLogo from "./assets/LOGO.png";
import { DebounceInput } from "react-debounce-input";

import "./App.css";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "react-speech";

function App() {
  const [text, setText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser doesn't support speech recognition.");
  }

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  return (
    <div className="App">
      <div>
        <img src={reactLogo} />
      </div>
      <div>
        <h3>
          This is a Translation Demo App developed by Appentus Technologies Pvt.
          Ltd. for Parliament of India.
        </h3>
      </div>

      <div>
        <DebounceInput
          minLength={2}
          debounceTimeout={500}
          placeholder="Type here..."
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>

      <div>
        <h3>Hindi</h3>
        <Convert text={text} language={"hi"}></Convert>
      </div>
      <div>
        <h3>Assamese</h3>
        <Convert text={text} language={"as"}></Convert>
      </div>
      <div>
        <h3>Bengali</h3>
        <Convert text={text} language={"bn"}></Convert>
      </div>
      <div>
        <h3>Gujarati</h3>
        <Convert text={text} language={"gu"}></Convert>
      </div>
      <div>
        <h3>Marathi</h3>
        <Convert text={text} language={"mr"}></Convert>
      </div>
      <div>
        <h3>Tamil</h3>
        <Convert text={text} language={"ta"}></Convert>
      </div>
      <div>
        <h3>Telugu</h3>
        <Convert text={text} language={"te"}></Convert>
      </div>
      <div>
        <h3>Kannada</h3>
        <Convert text={text} language={"kn"}></Convert>
      </div>
      <div>
        <h3>Malayalam</h3>
        <Convert text={text} language={"ml"}></Convert>
      </div>
      <div>
        <h3>Oriya</h3>
        <Convert text={text} language={"or"}></Convert>
      </div>
      <div>
        <h3>Punjabi</h3>
        <Convert text={text} language={"pa"}></Convert>
      </div>
    </div>
  );
}

const Convert = ({ text, language }) => {
  const [convertedText, setConvertedText] = useState("");

  useEffect(() => {
    if (text != "") {
      setConvertedText("AI is loading.");
      const response = axios
        .post(
          "https://translation.googleapis.com/language/translate/v2",
          {},
          {
            params: {
              q: text,
              target: language,
              key: "AIzaSyASWiTxATD_-wH5M6ZsUrUHveTl6Mq4Sxo",
            },
          }
        )
        .then((response) => {
          setConvertedText(response.data.data.translations[0].translatedText);
        })
        .catch((err) => {
          setConvertedText("Translation error.");
          console.log("Translation error.");
        });
    }
  }, [text, language]);

  return (
    <div>
      {convertedText}
      <Speech
        displayText={"play"}
        text={convertedText}
        voice="Google UK English Female"
      />
    </div>
  );
};

export default App;
