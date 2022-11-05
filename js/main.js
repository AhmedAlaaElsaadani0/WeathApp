
/*global variables */
let weatherstatus = {}
search();


/*main funcations */
// display weather for user 
function displayWeather() {
  let myDate = new Date(weatherstatus.location.localtime);
  document.querySelector(`#box1`).innerHTML = `                        
  <div class="weatherBox1 ">
  <div class="bg-dark text-white px-3 py-2 d-flex justify-content-between">
      <h5>${getDayName(myDate.getDay())}</h5>
      <h5>${myDate.getUTCDate() + " " + getMonthName(myDate.getMonth())}</h5>
  </div>
  <div class="boxContent px-3 py-4 ">
      <div class="location">
          <h5>${weatherstatus.location.name}</h5>
      </div>
      <div class="line d-flex justify-content-between">
          <div class="num">${weatherstatus.current.temp_c}<sup>o</sup>C</div>
          <div class="dayIcon text-end align-self-center "><img class="w-100"
                  src="https:${weatherstatus.current.condition.icon}" alt="cloud"></div>
      </div>
      <div class="weatherstatus fs-5">${weatherstatus.current.condition.text}</div>
      <div class="weatherIocns my-3">
          <span class="me-4 fs-5"><i class="fa-solid fa-droplet me-2"></i>${weatherstatus.current.humidity}%</span>
          <span class="me-4 fs-5"><i class="fa-solid fa-wind me-2 "></i>${weatherstatus.current.wind_kph}km/h</span>
          <span class="me-4 fs-5"><i class="fa-regular fa-compass me-2 "></i>${weatherstatus.current.wind_dir}</span>
      </div>
  </div>
  </div>`;
  for (let i = 1; i < 3; i++) {
    document.querySelector(`#box${i + 1}`).innerHTML = `                        
      <div class="weatherBox${i + 1}">
      <div class="boxHeader2 text-white px-3 py-2 text-center">
          <h5>${getDayName(myDate.getDay() + i)}</h5>
      </div>
      <div class="boxContent px-3 py-5 my-5 text-center">
          <div class="location"><img src="${weatherstatus.forecast.forecastday[i].day.condition.icon}" alt=""></div>
          <div class="line text-center">
              <div class="num2">${weatherstatus.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
              <div class="num3 text-secondary">${weatherstatus.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</div>
              <div class="weatherstatus fs-5 mt-3">${weatherstatus.forecast.forecastday[i].day.condition.text}</div>
          </div>
      </div>
  </div>`

  }

}
/* small funcation to help main funcation  */
// API get function

function search(city = "cairo") {
  if (checkRegx(city)) {
    let req = new XMLHttpRequest();
    req.open("GET", `https://api.weatherapi.com/v1/forecast.json?key= 80129535bdac466793b92326220511&q=${city}&days=14`)
    req.send()
    req.addEventListener("loadend", function () {
      if (req.status == 200) {
        weatherstatus = JSON.parse(req.response)

        displayWeather();
      }
    });


    $(".WaitingLayer").css("display", "block");
    $(".WaitingLayer").fadeOut(1000);
  }
}

// functions to convert index to day and  month 
function getDayName(index) {

  switch (index) {
    case 0:
      return "Sunday"

    case 1:
      return "Monday"

    case 2:
      return "Tuesday"

    case 3:
      return "Wednesday"

    case 4:
      return "Thursday"

    case 5:
      return "Friday"

    case 6:
      return "Saturday"
    default:
      index -= 7;
      return getDayName(index);
  }
}

function getMonthName(index) {
  switch (index) {
    case 0:
      return "January";

    case 1:
      return "February";

    case 2:
      return "March";

    case 3:
      return "April";

    case 4:
      return "May";

    case 5:
      return "June";

    case 6:
      return "July";

    case 7:
      return "August";

    case 8:
      return "September";

    case 9:
      return "October";

    case 10:
      return "November";

    case 11:
      return "December";
    default:
      index -= 12;
      return getMonthName(index);
  }
}

// function to check the regax of city
function checkRegx(place) {
  let twonRegx = /[a-z]{2,}/;
  return twonRegx.test(place);
}