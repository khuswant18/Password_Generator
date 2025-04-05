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
      <div className="w-full text-center max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-40 bg-white">
          <input
            type="text"
            value={password}
            className="w-full py-3 px-4 text-black outline-none h-12 bg-white rounded-md"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-3 shrink-0" onClick={copypasswordtoClipboard}>
            copy
          </button>
        </div>

        <div className="flex item-sm gapx-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange = {(e) => {setlenth(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <input
              type="checkbox"
              defaultChecked = {numberallowed}
              id="numberInput"
              onChange = {() => {
                setnumberallowed((prev)=>!prev)
              }}
            />
            <label>Numbers</label>

        </div>

        <input
              type="checkbox"
              defaultChecked = {setcharallowed}
              id="charInput"
              onChange = {() => {
                setcharallowed((prev)=>!prev)
              }}
            />
            <label>Characters</label>

      </div>
    </>
  );
}

export default App;  
