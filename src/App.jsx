import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="App">
      <div>
        <input
          placeholder="Type here..."
          style={{ width: 500, height: "auto" }}
          type={"text"}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
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
    setConvertedText("AI is loading.")
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
        setConvertedText("Translation error.")
        console.log("Translation error.");
      });
  }, [text, language]);

  return <div>{convertedText}</div>;
};

export default App;
