/* --------Variables----------- */
var firstDay={
    city:document.getElementById("city"),
    degree:document.getElementById("celesius"),
    state: document.getElementById("state"),
    img:document.getElementById("state-icon"),
    humidity:document.getElementById("humidity"),
    windSpeed:document.getElementById("windSpeed"),
    windDirectipn:document.getElementById("windDirection"),
    dayDate:document.getElementById("day1Date"),
    monthDate:document.getElementById("day1Month"),

}
var secondDay={
    maxDeg:document.getElementById("day2_maxDeg"),
    minDeg:document.getElementById("day2_minDeg"),
    state: document.getElementById("day2_state"),
    img:document.getElementById("day2-icon"),
    dayDate:document.getElementById("day2Date"),

  

}
var thirdDay={
    maxDeg:document.getElementById("day3_maxDeg"),
    minDeg:document.getElementById("day3_minDeg"),
    state: document.getElementById("day3_state"),
    img:document.getElementById("day3-icon"),
    dayDate:document.getElementById("day3Date"),
    
    
    
}
var searchInput=document.getElementById("location");
var findBtn=document.getElementById("findBtn");
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/*-----------Functions----------- */
getLocation();
//d8d6a3bbda5f4acf8a0180957241312 
async function getCity(city) {
    var response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d8d6a3bbda5f4acf8a0180957241312 &q=${city}&days=3`);
    var finalForecast=await response.json();
   
    // console.log(finalForecast)
    // console.log(finalForecast.location.name)
    var data=[
        {
            day:finalForecast.forecast.forecastday[0].day,
            date:finalForecast.forecast.forecastday[0].date,
            current:finalForecast.current,
            location:finalForecast.location.name,
        },
        {
            day:finalForecast.forecast.forecastday[1].day,
            date:finalForecast.forecast.forecastday[1].date,
        },
        {
            day:finalForecast.forecast.forecastday[2].day,
            date:finalForecast.forecast.forecastday[2].date,
        }
        
    ]

    display(data);
}

function display(data){
    /*-----------getMonth----------- */
    var d = new Date(data[0].date);
    /*-----------getDays----------- */
    var d1 = new Date(data[0].date);
    var dayName1 = days[d1.getDay()];
    var d2 = new Date(data[1].date);
    var dayName2 = days[d2.getDay()];
    var d3 = new Date(data[2].date);
    var dayName3 = days[d3.getDay()];
    console.log(dayName1);
        // console.log(dayName2);
        // console.log(dayName3);
        // console.log(firstTemp)
        //First day:
    firstDay.city.innerHTML=data[0].location;
    firstDay.degree.innerHTML=data[0].current.temp_c,1;    
    firstDay.state.innerHTML=data[0].day.condition.text;
    firstDay.humidity.innerHTML=data[0].current.humidity;
    firstDay.windSpeed.innerHTML=data[0].current.wind_kph;
    firstDay.windDirectipn.innerHTML=data[0].current.wind_dir;
    firstDay.img.src=data[0].current.condition.icon;
    firstDay.dayDate.innerHTML=dayName1;
    firstDay.monthDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]}`;


    // Second day:
    secondDay.maxDeg.innerHTML=data[1].day.maxtemp_c;
    secondDay.minDeg.innerHTML=data[1].day.mintemp_c;
    secondDay.state.innerHTML=data[1].day.condition.text;
    secondDay.img.src=data[1].day.condition.icon;
    secondDay.dayDate.innerHTML=dayName2;



    // Third day:
    thirdDay.maxDeg.innerHTML=data[2].day.maxtemp_c;
    thirdDay.minDeg.innerHTML=data[2].day.mintemp_c;
    thirdDay.state.innerHTML=data[2].day.condition.text;
    document.querySelector(".third img").src=data[2].day.condition.icon;
    thirdDay.dayDate.innerHTML=dayName3;


}







// 80a138e2d86120e05245d45830001b0f---->Api key location
async function getLocation(){
    var loc= await fetch("https://api.ipapi.com/api/check?access_key=80a138e2d86120e05245d45830001b0f");
    var response=await loc.json();
    getCity(response.city);
    
}



/*-----------Search----------- */
searchInput.addEventListener("keyup",function(){
    city=searchInput.value;
    // console.log(city)
    getCity(city);
})



