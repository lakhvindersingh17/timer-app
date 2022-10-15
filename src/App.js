import {useState,useEffect,useRef} from 'react';
import './App.css';
import TimerInput from './components/TimerInput/TimerInput';

const formatTime=(timer)=>{
  let date=new Date()
  date.setHours(0,0,timer)
  return date.toTimeString().split(' ')[0]

}

function App() {
  
  const [selectedTimer,setSelectedTimer]=useState(180)
  const [timer,setTimer]=useState(selectedTimer)
  const [timerStarted,toggleTimer]=useState(false)
  const interval=useRef(null)

  const startInterval=()=>{
    
    if(interval.current) clearInterval(interval.current)

    interval.current=setInterval(()=>{setTimer(timer=>timer-1)},1000)
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
        <h1>{'Timer'}</h1>
        <span className='time'>{formatTime(timer)}</span>
          </div>
        ):
        <TimerInput timer={selectedTimer} updateTimerValue={updateTimerValue}/>
      
      }
      </div>
      <div className='btnContainer'>
        <button  onClick={()=>toggleTimer(true)}>Start</button>
        <button onClick={()=>clearInterval(interval.current)}>Pause</button>
        <button onClick={startInterval}>Resume</button>
        <button onClick={()=>toggleTimer(false)}>Reset</button>

      </div>

    </div>
  );
}

export default App;
