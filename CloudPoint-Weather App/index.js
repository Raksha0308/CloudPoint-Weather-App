let cityName=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
// let w_icon=document.querySelector(".weather_icon");

let w_image=document.querySelector(".weather_icon");
let w_temperature=document.querySelector(".weather_temperature");
let w_minmax=document.querySelector(".weather_minmax");
let w_min=document.querySelector(".weather_min");
let w_max=document.querySelector(".weather_max");

let w_feelsLike=document.querySelector(".weather_feelsLike");
let w_humidity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure=document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// Search city
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let cityName = document.querySelector(".city_name");
    // console.log(cityName.value);
    city = cityName.value;
  
    getWeatherData();
  
    cityName.value = "";
  });

// Country Name
const getCountryName=(code) =>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// Date and Time
const getDateTime=(dt)=>{

    const curDate=new Date(dt*1000);
    // console.log(curDate);

    const options={
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter=new Intl.DateTimeFormat('en-US',options);
    return formatter.format(curDate);

}

let city="pune";

// City Search


const getWeatherData= async ()=>{
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9677bf3fe746efc63d748af110ffd72d`
    try{
        const res= await fetch(weatherUrl);
        const data= await res.json();
        // console.log(data);

        const {main,name,weather,wind,sys,dt}=data;

        cityName.innerText=`${name}, ${getCountryName(sys.country)}`;   
        dateTime.innerText=getDateTime(dt);

        w_forecast.innerHTML=`${weather[0].description}`;
        // w_image.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        switch (data.weather[0].main){
            case 'Clear':
                w_image.src = 'images/clear.png';
                break;

            case 'Rain':
                w_image.src = 'images/rain.png';
                break;
                
            case 'Snow':
                w_image.src = 'images/snow.png';
                break;
    
            case 'Clouds':
                w_image.src = 'images/cloud.png';
                break;   
                
            case 'Mist':
                w_image.src = 'images/mist.png';
                break;
        
            case 'Haze':
                w_image.src = 'images/mist.png';
                break;

            default:
                w_image.src = 'images/cloud.png';
        }


        w_temperature.innerHTML=`${parseInt(main.temp)}<span>°C</span>`;
        w_min.innerHTML=`Min: ${main.temp_min.toFixed()} &#176`;
        w_max.innerHTML=`Max: ${main.temp_max.toFixed()} &#176`;
        w_humidity.innerHTML=`${main.humidity}%`
        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)} &#176`;
        w_wind.innerHTML=`${wind.speed} m/s`;
        w_pressure.innerHTML=`${main.pressure} hPa`;

    }
    catch(error){
        // console.log(error);
    }
};


document.body.addEventListener('load',getWeatherData());