import React from 'react'
import {useState} from 'react'
import './App.css';
import Speaker from './speaker.svg'


const App = () => {
  
    const [theWord, setTheWord] = useState({
      word: "",
      meaning: "",
      partOfSpeech: "",
      phonetic: "",
      phoneticSound: "",
    });
    
    const [searchWord, setSearchWord] = useState("")
    const getWord = () => {
        fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchWord}?key=7a1349a8-feee-4728-8d1d-70ca3f8dfb3b`)
        .then(response => response.json())
        .then(data => {
          
            console.log(data)

              setTheWord({
                word: searchWord.toLowerCase(),
                meaning: data[0].shortdef[0],
                partOfSpeech: data[0].fl,
                phoneticSound: `https://media.merriam-webster.com/audio/prons/en/us/mp3/${searchWord.charAt(0).toLowerCase()}/${data[0].hwi.prs[0].sound.audio}.mp3`,
              })
            } 
            
            
        )
        .catch(error => (alert('no definition')))
    }

const audio = new Audio(`${theWord.phoneticSound}`)

const playSound = () => {
  audio.play();
}



console.log(theWord.word)
const speaker = document.querySelector('.speaker');
  return (
    <div className="container">
      <div className="searchDiv">
        <input type="text" placeholder="Search a word here..." onChange={(e) => {setSearchWord(e.target.value)}} 
        onKeyPress={(e) => {
          if(e.key === "Enter"){
            getWord()
            speaker.classList.remove('speaker-off');
          } else {
              return
          }
          }}
          />
        <button onClick={() => {
          getWord()
          speaker.classList.remove('speaker-off');
          }}>Search</button>
      </div>
      <div className="wordBox">
        <div className="wordAndSpeech">
          <h1>{theWord.word}</h1>
          <div onClick={() => playSound()}>
          <img src={Speaker} alt="" className='speaker speaker-off' />
          </div>
        </div>
        <div className="partAndPho">
          <span>{theWord.partOfSpeech}</span>
        </div>
        <p className="meaning">
          {theWord.meaning}
        </p>
      </div>
    </div>
  )
}

export default App