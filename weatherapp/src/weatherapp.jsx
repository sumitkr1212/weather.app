import React, { useEffect, useState } from "react";
import axios from 'axios'


 export default function Weatherapp(){
    const [city,setCity] = useState("delhi");
    const [weatherdata,setWeatherdata] =useState(null)


   const currentdate = new Date();
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ]
const month = months[currentdate.getMonth()];
const date = currentdate.getDate();
const year = currentdate.getFullYear();
const completedate = `${month} ${date} ,${year}`

const Api_key ="7e644c15d23a3527186e3f40d2fb6728"
const fetchweatherdata = async () =>{
   try {

      const reposnse = await fetch(` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}`)
      const data = await reposnse.json();
      console.log(data);
      setWeatherdata(data)
   } catch (error) {
      console.log("Error")
   }
}

useEffect(()=>{
   fetchweatherdata();
},[])


const HandelInputChange=(event)=>{
   console.log(event.target.value);
   setCity(event.target.value);
}

const handelsubmit=(event)=>{
   event.preventDefault();
   fetchweatherdata();

}



  return(
     <main id='app'>
      <div className="container">
         {weatherdata &&(
            <>
                <div className="content">
                  <h3>{completedate}</h3>
                  <h2 className="degree">{weatherdata.main.temp}</h2>
                  <h4 className="description"> {weatherdata.weather[0].description}</h4>
                  </div>
                  <h1 className="cityname">{weatherdata.name}</h1>
                  <form action="form" onSubmit={handelsubmit}>
                  <input className="input" type="text" placeholder="Enter City Name" onChange={HandelInputChange} />
                  <button className="btn">Get</button>
                  </form>
            </>
         )}
   
    
      </div>
  
     </main>

  )
 }
