import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import clear_icon from'../assets/yellow-sun-bright-png.webp'
import drizzle_icon from'../assets/cloud-drizzling-day-png.webp'
import rain_icon from'../assets/cloudy-rain-storm-png.webp'
import wind_icon from'../assets/cloudy-wind-sky-png.webp'
import cloud_icon from'../assets/cloudy-weather-day-png.webp'
import snow_icon from'../assets/snowy-cold-weather-day-png.png'
const Weather = () => {

const inputref=useRef()
const [weatherData,setWeatherData]=useState(false)


const allIcons={

  "01d":clear_icon,
  "01n":clear_icon,
  "02d":cloud_icon,
  "02n":cloud_icon,
  "03d":cloud_icon,
  "03n":cloud_icon,
  "04d":drizzle_icon,
  "04n":snow_icon,
  "09d":rain_icon,
  "09n":rain_icon,
  "010d":rain_icon,
  "010n":rain_icon,
  "013d":wind_icon,
  "013n":wind_icon,
  "050d":snow_icon,
  "050n":snow_icon,

}





  const search=async(city)=>{

if(city==''){
  alert("enter city name")
  return;
}

    try{

      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response= await fetch(url);
      const data= await response.json();
      console.log(data);

      const icon=allIcons[data.weather[0].icon] || clear_icon;
      const description=[data.weather[0].description] ;
      setWeatherData({

humidity:data.main.humidity,
windSpeed:data.wind.speed,
temperature:Math.floor(data.main.temp),
location:data.name,

sea_level:data.main.sea_level,
pressure:data.main.pressure,
icon: icon,
description: description

      })
    }catch(error){

    }
  }



  useEffect(()=>
    {
      search("Dubai");
    },[])


  return (
    <>
    
    <div className='weather'>

<div className='search-bar'><input ref={inputref} type='text' placeholder='Search'/>
<img src='https://icon-library.com/images/search-bar-icon-png/search-bar-icon-png-2.jpg'alt='' onClick={()=>search(inputref.current.value)}/>
</div>
<img src={weatherData.icon} className='weather-icon'/>
<p className='temperature'>{weatherData.temperature}°c</p>
<br />
<p className='location'>{weatherData.location}</p>
<div className='weather-data'>
  <div className='col'>
    <img width={"40px"} src='https://cdn3d.iconscout.com/3d/premium/thumb/water-droplet-7343854-5940628.png'/>
    <div>
      <p>{weatherData.humidity}%</p>
      <span>HUMIDITY</span>
    </div>
  </div>
  <div className='col'>
    <img width={"40px"} src='https://static.vecteezy.com/system/resources/previews/019/552/631/original/windy-on-transparent-background-free-png.png'/>
    <div>
      <p>{weatherData.windSpeed}km/h</p>
      <span>WIND</span>
    </div>
  </div>
</div>



    </div>

    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" style={{padding:"1rem"}}>
    <div className="col weather">
    <img width={"60px"} src='https://cdn3d.iconscout.com/3d/premium/thumb/fog-3d-icon-download-in-png-blend-fbx-gltf-file-formats--foggy-mist-cloud-nature-cloudy-weather-pack-icons-6293710.png?f=webp'/><div className="p-2"> pressure:{weatherData.pressure}</div>
      
    </div>
    <div className="col weather">
    <img width={"60px"} src='https://static.vecteezy.com/system/resources/previews/024/776/196/large_2x/3d-rendering-snow-rain-with-sun-rays-sun-hail-with-cloud-rain-and-snow-with-cloud-icon-set-3d-render-weather-concept-icon-set-png.png'/>
    <div className="p-2">{weatherData.description}</div>
    </div>
    <div className="col weather">
    <img width={"60px"} src='https://static.vecteezy.com/system/resources/previews/040/502/037/large_2x/3d-illustration-ocean-png.png'/>
    <div className="p-2">Sealevel:{weatherData.sea_level}</div>
    </div>
    </div>
    </>
  )
}

export default Weather