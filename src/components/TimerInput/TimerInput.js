import {useState} from 'react'
import './index.css'
const TimerInput=({updateTimerValue,timer})=>{

    const [hour,setHours]=useState((Math.floor(timer/3600)||'00'))
    const [minutes,setMinutes]=useState((Math.floor(timer/60)%60||'00'))
    const [seconds,setSeconds]=useState(timer%60||'00')

    console.log(minutes)
    const handleChange=(e)=>{

        let value=e.target.value
        let limit,updater
        switch(e.target.name){
            case 'hour':
                limit=23
                updater=setHours
            break;
            case 'minutes': 
                limit=59
                updater=setMinutes
                // if(value==='') setMinutes(valu
            break;
            case 'seconds': 
                limit=59
                updater=setSeconds
            break;
            default:
                console.error('Invalid Input')
        }
        if(Number(value)<=limit && Number(value)>=0){
            updater(Number(value)<10?'0'+Number(value):Number(value))
        }
        updateTimerValue(hour,minutes,seconds)
    }

    return(
        <>
        <div className='timeInputContainer'>
            <h1>Set Timer </h1>
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