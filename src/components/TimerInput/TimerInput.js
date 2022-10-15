import {useEffect, useState} from 'react'
import { setTimerHeading } from '../../constants/text'
import './index.css'

const timeFormater=(value)=>Number(value)<10?'0'+Number(value):Number(value)

const valueUpdater=(value,limit,updater)=>{

    if(Number(value)<=limit && Number(value)>=0)
        updater(()=>timeFormater(value))
    
}

const TimerInput=({updateTimerValue,timer})=>{

    const [hour,setHours]=useState(timeFormater(Math.floor(timer/3600)))
    const [minutes,setMinutes]=useState(timeFormater(Math.floor(timer/60)%60))
    const [seconds,setSeconds]=useState(timeFormater(timer%60))

    const handleChange=(e)=>{

        let value=e.target.value
    
        switch(e.target.name){
            case 'hour': valueUpdater(value,23,setHours)
            break;
            case 'minutes': valueUpdater(value,59,setMinutes)
            break;
            case 'seconds': valueUpdater(value,59,setSeconds)
            break;
            default:
                console.error('Invalid Input')
        }
        
    }

    useEffect(()=>{

        updateTimerValue(hour,minutes,seconds)

    },[minutes,seconds,hour,updateTimerValue])

    return(
        <>
        <div className='timeInputContainer'>
            <h1>{setTimerHeading}</h1>
            <div onChange={handleChange} >
                <input className='timeInput' value={hour} type={"number"} name="hour" />:
                <input className='timeInput' name="minutes" type={"number"} value={minutes}/>:
                <input  className='timeInput' name="seconds" type={"number"} value={seconds} />
            </div>
        </div>
        </>
    )
}

export default TimerInput