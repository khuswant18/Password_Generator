import "./App.css";
import { useState, useCallback ,useEffect , useRef} from "react";

function App() {
  const [length, setlenth] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);

  const [password, setpassword] = useState("");



  //useRef Hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberallowed) str += "1234567890";
    if (charallowed) str += "!@#$%^&*(){}<>?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); 
    }

    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  const copypasswordtoClipboard = useCallback(()=>{ 
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])  
   
  useEffect(()=>{
    passwordGenerator()
  },
    
  [length, numberallowed, charallowed, setpassword, passwordGenerator])


  return (
    <>
      <div className="container">
      <h1 className="heading">🔐 Password Generator</h1>

      <div className="input-wrapper">
        <input
          type="text"
          value={password}
          className="password-input"
          placeholder="Your generated password"
          readOnly
          ref={passwordRef}
        />
        <button className="copy-btn" onClick={copypasswordtoClipboard}>
          Copy 
        </button>
      </div>

      <div className="controls">
        <div className="range-group">
          <label htmlFor="lengthRange">Length: {length}</label>
          <input
            type="range"
            id="lengthRange"
            min={6}
            max={100}
            value={length}
            className="range-slider"
            onChange={(e) => setlenth(e.target.value)}
          />
        </div> 

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberallowed}
            onChange={() => setnumberallowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="charInput"
            checked={charallowed}
            onChange={() => setcharallowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Include Special Characters</label>
        </div>
      </div>
    </div>


    </>
  );
}

export default App;  
