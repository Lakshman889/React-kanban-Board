import { useEffect, useState } from "react";

function Timer(){
    const [time,setTime]=useState("00:00:00");
    useEffect(()=>{
        setInterval(()=>{
            const curDate=new Date();
            let hours=curDate.getHours();
            let min=curDate.getMinutes();
            let sec=curDate.getSeconds();
            const time=updateTime(hours,min,sec);
            setTime(time);
        },1000);
        console.log("timer set");
    },[]);
    function updateTime(hours,min,sec){
        hours=hours>12?hours-12:hours;
        hours=hours<10?"0"+hours:hours;
        min=min<10?"0"+min:min;
        sec=sec<10?"0"+sec:sec;
        return hours+":"+min+":"+sec;
    }
    return(<div draggable>
        <h1>{time}</h1>
    </div>)
}

export default Timer;