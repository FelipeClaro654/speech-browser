import { useState } from 'react';
import './App.css';

function App() {
  // Reconhecimento de voz
  const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition
  const speechApi = new SpeechToText()
  const [text, setText] = useState('')

  speechApi.continous = true
  speechApi.lang = 'pt-BR'

  speechApi.onaudiostart = () => console.log('GRAVANDO |o|')
  speechApi.onaudioend = () => console.log(`FIM DA GRAVAÇÃO \\o\\ \\o| \\o/ |o/ /o/`)

  speechApi.onresult = e => {
    const resultIndex = e.resultIndex
    const transcript = e.results[resultIndex][0].transcript
    setText((text) => text + ' ' + transcript)
  }

  // Leitor de texto para voz
  const synth = window.speechSynthesis || window.webkitSpeechSynthesis;
  const voices = synth.getVoices();
  const [voice, setVoice] = useState()
  return (
    <div className="App">
      <main >
        <h1>Reconhecimento de voz</h1>
        <textarea style={{ height: 300, width: 300, resize: 'none' }} defaultValue={text} readOnly />
        <br />
        <button onClick={() => speechApi.start()}>Start</button>
        <button onClick={() => speechApi.stop()}>Stop</button>
        <button onClick={() => setText('')}>Clear</button>
        <button onClick={() => {
          const utterThis = new SpeechSynthesisUtterance(text);
          if (voice) {
            utterThis.voice = voice
          }
          synth.speak(utterThis)
        }}>Read</button>
        <button onClick={() => {
          setVoice(voices[Math.floor(Math.random() * voices.length)])
        }}>Change Voice</button>
      </main>
    </div>
  );
}

export default App;
