import { useEffect, useState } from 'react';
import Game from './components/Game'
import Navbar from './components/Navbar'
import Help from './components/Help';
import Error from './components/Error';
import Result from './components/Result';
import styles from "./style.module.css";
import './App.css'

function App() {
    const [result, setResult] = useState<string>("");
    const [correct, setCorrect] = useState<string>("");
    const [help, setHelp] = useState<boolean>(false);
    const [dark, setDark] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const darkMode = (darkPosition: boolean) => {
      if (darkPosition) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add("dark");
      }
      else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    };

    useEffect( () => {
      console.log('was here in the other place:', dark);
      darkMode(dark);
      setDark(dark)
    }, [dark]) 
    
    useEffect(() => {
      let mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQueryObj.matches) {
        setDark(true);
      }
    }, [])

    return (
      <div className={'app dark:bg-slate-800'}>
        {help && <Help help={setHelp} />}
        {error && <Error children={error} />}
        {result && <Result state={result} correct={correct} result={setResult}/>}
        <div className={styles.game}>
          <Navbar help={setHelp} dark={dark} darkness={setDark}/>
          <hr className="border-1 border-black"/>
          <Game error={setError} result={setResult} correct={setCorrect} winLose={correct}/>
        </div>
      </div>
    )
}

export default App
