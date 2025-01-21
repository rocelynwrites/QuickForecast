//Declaration of the variable
const loader = document.querySelector('.loader')
const wrapper = document.querySelector('.wrapper')
const search_box = document.getElementById('search_box')
const week = document.querySelector('.week_day')
const main = document.querySelector(".main")
const menu = document.querySelector('.menu')
const middle = document.querySelector('.middle')
const week_temp = document.querySelector('.week_temp')
const start = document.querySelector(".start")
let box = document.getElementById('test');
let d = document.getElementById('t')
let bo = document.getElementById('boxs')
let bt = document.querySelector(".btn")
let start_btn = document.getElementById('s')
let for_box = document.querySelector('.for_box')
let temp_box = document.querySelector('.temp_box')
let condition_data_box = document.querySelector('.condition_data_box')
const mode = document.getElementById('mode');
const setting = document.getElementById('settings');
const home = document.getElementById('home')
const todaycon = document.getElementById('boxs')

d.classList.add('blur');
week_temp.classList.add('blur')
temp_box.classList.add('blur')
todaycon.classList.add('blur')


mode.addEventListener('click',()=>{
alert("please wait for next update...")
 
})
 


home.onclick = function() {
 /*document.documentElement.style.cssText= `
 --back-grey:#212D3D;
 --black:#fff;
 --white:#000;
 
 `;*/
 alert("please wait for next update...")

}
setting.onclick = function() {
 /*document.documentElement.style.cssText= `
 --back-grey:#212D3D;
 --black:#fff;
 --white:#000;
 
 `;*/
 alert("please wait for next update...")
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todayIndex = new Date().getDay();
const remainingDays = weekdays.slice(todayIndex + 1).concat(weekdays.slice(0, todayIndex));
const today = weekdays[todayIndex];
remainingDays.unshift(today);
//Geolocation success function
const success = (position) => {
 //console.log(position)
 let lat = position.coords.latitude;
 let long = position.coords.longitude;

 let city = lat + "," + long;
 get(city);

};
//if (search_box.value!=null || search_box.value!=null) {
function getdata() {
 let data01 = search_box.value;
 loader.style.visibility = 'visible';
 get(data01);

}
//geolocation error function
const error = (error) => {
 alert("We got an error while getting your location details. Please Manually type your city name. The error is: " + error.message)
 loader.style.visibility= 'hidden';
};
//main Geolocation api
navigator.geolocation.getCurrentPosition(success, error);

const week_box = document.querySelector(".t")

//variable declaration ends


function see_more() {

 for (var i = 0; i <= 5; i++) {


 }

 if (bt.innerText == 'see more') {
  let box = document.querySelector('.today')

  let hour = document.createElement('div');




  bo.style.height = "100%";
  bo.style.backgroundColor = "var(--white)";
  bo.style.overflow = 'scroll';
  d.style.display = "none";
  bt.innerText = "see less"
 }
 else if (bt.innerText == 'see less') {
  bo.style.height = "28.0rem";
  bo.style.backgroundColor = "var(--back-grey)"
  d.style.display = "block";
  bt.innerText = "see more";

 }
}

//Api Data 
const API_KEY = 'd38e37d49cfa48b580c143653230305';

function get(vari, data01) {
 if (vari != undefined) {
  let query = vari;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=yes
  `;
  fetch(url).then((res) => {
   return res.json();
  }).then((data) => {
   d.classList.remove('blur');
   week_temp.classList.remove('blur')
   temp_box.classList.remove('blur')
   todaycon.classList.remove('blur')
   loader.style.visibility = 'hidden';
   console.log("Data has been fetched. please wait...")

   let weather_con = { ...data.current.condition }
   let current_aqi = { ...data.current.air_quality };
   /*Manipulation of 
   temp_box which is main box 
   contains city name and
   weather icon*/
   temp_box.innerHTML = `
  <div class = "temp_box" >
  <div class="text_box">
        <span id="city">
         ${data.location.name}
        </span>
        <br>
        <div id="temp_main">${data.current.temp_c}°c <br>
        <span class=" text mini">${weather_con.text}</span></div>
       </div> <img src = ${weather_con.icon} />
   </div>`;
   //End of temp box
   let today_hour = { ...data.forecast.forecastday[0].hour }

   for_box.innerHTML = "";
   for (var i = 0; i <= 23; i++) {
    let timex= new Date();
    let houor= timex.getHours();
    let hour_box = document.createElement('div');
    let time = `${today_hour[i].time}`
    let time1 = time.slice(11);
    hour_box.innerHTML = `  
          <div class="for_data">
                 <span id="heading">${time1}</span>
                 <img src=${today_hour[i].condition.icon} width="80px" height="80px">
                 <span id="temp_min">${today_hour[i].temp_c}°c \n
                 <span  class="mini">${today_hour[i].feelslike_c}°c</span></span>
                 
                </div>`;
    for_box.appendChild(hour_box)
   }
   //today hourly forecast data section ends 
   // Now Today's condition data section starts
   let astro = { ...data.forecast.forecastday[0].astro }
   const aqi = Object.values(current_aqi)
   var aqi_text;
   if (aqi[6] === 1) {
    aqi_text = "Good";
   }
   else if (aqi[6] === 2) {
    aqi_text = "Moderate";
   }
   else if (aqi[6] === 3) {
    aqi_text = "Allergens.";
   }
   else if (aqi[6] === 4) {
    aqi_text = "Unhealthy";
   }
   else if (aqi[6] === 5) {
    aqi_text = "Very Unhealthy";
   }
   else if (aqi[6] === 6) {
    aqi_text = "Hazardous";
   }
   
