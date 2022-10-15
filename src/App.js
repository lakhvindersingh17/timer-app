import {useState,useEffect,useRef} from 'react';
import './App.css';
import TimerInput from './components/TimerInput/TimerInput';
import { intialTimeinSeconds } from './constants/global';
import { pauseButton, resetButton, resumeButton, startButton, timerHeading } from './constants/text';

const formatTime=(timer)=>{
  let date=new Date()
  date.setHours(0,0,timer)
  return date.toTimeString().split(' ')[0]

}

function App() {
  
  const [selectedTimer,setSelectedTimer]=useState(intialTimeinSeconds)
  const [timer,setTimer]=useState(selectedTimer)
  const [timerStarted,toggleTimer]=useState(false)
  const interval=useRef(null)

  const startInterval=()=>{
    
    if(interval.current) clearInterval(interval.current)

    interval.current=setInterval(()=>{setTimer(timer=>
      {

        if (timer!==0) return timer-1
      
        clearInterval(interval.current)
        
        return 0  
      })},1000)
  }

  useEffect(()=>{
    if(timerStarted){ 
      setTimer(selectedTimer)
      startInterval()
    }
     else{
      clearInterval(interval.current)
      
    }

  },[timerStarted])



  const updateTimerValue=(hours,minutes,seconds)=>{
    const timeInSeconds=(Number(hours)*60*60)+(Number(minutes)*60)+(Number(seconds))
    setSelectedTimer(timeInSeconds)
  }

  return (
    <div className="App">
      
      <div>
      {
        timerStarted?(<div className='timer' >
        <h1>{timerHeading}</h1>
        <span className={`${timer===0?'red':'yellow'}`}>{formatTime(timer)}</span>
          </div>
        ):
        <TimerInput timer={selectedTimer} updateTimerValue={updateTimerValue}/>
      
      }
      </div>
      <div className='btnContainer'>
        <button  onClick={()=>toggleTimer(true)}>{startButton}</button>
        <button onClick={()=>clearInterval(interval.current)}>{pauseButton}</button>
        <button onClick={startInterval}>{resumeButton}</button>
        <button onClick={()=>toggleTimer(false)}>{resetButton}</button>

      </div>

    </div>
  );
}

export default App;
