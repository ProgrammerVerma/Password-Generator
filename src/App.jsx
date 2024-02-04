import React, { useState, useCallback } from 'react';

function App() {
  // declaring variables using useState
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  // function to generate random password
  const generatePassword = useCallback(() => {
    // the password generated will be first created in 'pass'
    let pass = '';  
    // adding all the default and optional characters
    let strng = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numAllow) strng += '1234567890';
    if (charAllow) strng += '!@#$%^&*(){}:<>?,./;[]\\|`~';

      // this loop will select a character from the dataset, store it in 'key', then will add the key to 'pass', in loop
    for (let i = 1; i <= length; i++) {
      let key = Math.floor(Math.random() * strng.length);
      pass += strng.charAt(key);
    }
    // saving the generated password in 'pass' to setPassword method, which will then save it to 'password' constant
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  // function of copying the password to clipboard
  const copyToClipboard = () => {
    // creating a blank constant
    const textArea = document.createElement('textarea');
    // saving the password in it
    textArea.value = password;
    // appending the textArea inside DOM structure, so as it can be used, otherwise it would'nt
    document.body.appendChild(textArea);
    // selecting the content from textArea
    textArea.select();
    // this command will copy all the content from textArea, also, it is context specifix, so will not copy entire content from website
    document.execCommand('copy');
    // after the work is done, it is removed from the DOM as it does not sit there empty
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
        <h1 className="text-2xl font-semibold">Password Generator</h1>
        <div className="flex items-center">
          <label className="mr-4">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            step="1"
            value={length}
            // this function will happen when the input is changed by the user
            // e will store what is the current value, after it is changed by the user
            // setLength(e.target.value) -> this will update the value of length, using useState
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={numAllow}
            onChange={() => setNumAllow(!numAllow)}
            className="mr-2"
          />
          Include Numbers
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={charAllow}
            onChange={() => setCharAllow(!charAllow)}
            className="mr-2"
          />
          Include Special Characters
        </label>
        <button
          onClick={generatePassword}
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
        >
          Generate Password
        </button>
        <p
          className="text-lg font-medium cursor-pointer text-blue-600"
          onClick={copyToClipboard}
        >
          {password}
        </p>
      </div>
    </div>
  );
}

export default App;

