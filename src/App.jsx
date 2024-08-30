import { useState } from 'react'
import './App.css'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {

  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      string += '0123456789'
    }
    if (characterAllowed) {
      string += '!@#$%^&*()_+=-{}[]~'
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char)
    }
    buttonRef.current.title = "click to copy password"
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    buttonRef.current.title = "copied"
  }, [password])


  return (
    <>
      <div className='w-full max-w-85 mx-auto shadow-md 
      rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700 '>
        <h2 className='text-4xl text-center text-white'>Password Generator</h2>
        <div className='m-4'>
          <input className='p-2 mx-2 min-w-72 rounded-lg' value={password} ref={passwordRef}>
          </input>
          <button className='m-1 p-2 bg-blue-700 rounded-lg' ref={buttonRef}
            onClick={() => copyPasswordToClipboard()} title='click to copy password'>copy</button>
        </div>
        <div className='gap-2 flex justify-center align-baseline'>
          <input type='range' min={5} max={25} onChange={(e) => setLength(e.target.value)}>
          </input>
          <label>length: {length}</label>
          <input type='checkbox' value={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} ></input>
          <label>numberAllowed</label>
          <input type='checkbox' value={characterAllowed} onChange={() => setCharacterAllowed(prev => !prev)}></input>
          <label>characterAllowed</label>

        </div>
      </div>
    </>
  )
}

export default App
