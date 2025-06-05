import { useState, useCallback, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";


const App = () => {
  const [length, setLength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState("Copy");

  const handleclick = () => {
    setCopied("Copied");
    setTimeout(() => {
      setCopied("Copy ");
    }, 2000);
  };
  const toastMessage =()=> {
    toast("Copied To clipboard");
  }

  const copytoclipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "012345678";
    }
    if (character) {
      str += "!@#$%^&*()";
    }
    for (let i = 1; i <= length; i++) {
      let randompass = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randompass);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);
  useEffect(() => {
    passwordGenrator();
  }, [number, character, length, passwordGenrator]);

  const passwordref = useRef(null);

  return (
    <div className="bg-black h-[100vh] ">
      <h1 className="text-white text-6xl flex items-center justify-center pt-[150px]">
        Password Generator{" "}
      </h1>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="flex justify-center mt-[80px] flex-col my-8 max-w-md mx-auto  rounded-full px-4 items-center bg-slate-500">
        {" "}
        <div className="flex shadow rounded-lg mb-4 ">
          <input
            type="text"
            value={password}
            ref={passwordref}
            className="outline-none mt-6  w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={() => {
              copytoclipboard();
              handleclick();
              toastMessage();
            }}
            className="bg-black  text-white mt-6 py-1 px-3 hover:bg-slate-600 "
          >
            {copied}
          </button>
        </div>
        <div className="flex  text-sm mb-3 gap-x-2 ">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberinput"
              onChange={() => {
                setnumber((prev) => !prev);
              }}
            />
          </div>
          <label htmlFor="numberinput">Numbers</label>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterinput"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
          </div>
          <label htmlFor="characterinput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
