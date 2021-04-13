// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const APIkey = '24521d0d12865f8be8ae89b0a91730f7';
const serverUrl = 'http://localhost:8000';
// Added an Event listener with a function to button element
document.getElementById('generate').addEventListener('click', generateAction)
/* Created a Function for the event listener called by event listener */
function generateAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // implementing the getData function on click
    getData(zipCode, feelings)   
}

/* Function to GET Web API Data*/
const getData = async (zipCode, feelings) => {
    // if else alert conditional for zipcode incorrect inputs
    if(zipCode === ""){alert('Please Enter Your Zip Code')}
    else if(zipCode.length <5 || zipCode.length>5){alert('You Must Enter A Valid Zip Code Numbers')}
    else if(isNaN(zipCode)){alert('Please Enter A Valid Zip Code Number')}
    else{

    const response =
    //OPEN WEATHER MAP URL parts added togther using 
     fetch(`${baseUrl}?appid=${APIkey}&zip=${zipCode}`)
    .then(response => response.json())
    .then(data => {
        const Kelvin = data.main.temp;
        const Celcius = Kelvin - 273.15;;
        const Fahrenheit = Celcius * 9/5 +32;
        let d = new Date();
        let newDate = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`;
        /* Function to POST data */
        return postData(`${serverUrl}/addData`, {
            temperature: `Temperature: ${Kelvin} K / ${Celcius.toFixed(0)} C / ${Fahrenheit.toFixed(1)} F `,
            date: `Date: ${newDate}`,
            feelings: `Feeling: ${feelings}`,
        });
    })
    /* Function to GET Project Data */
    .then(() => fetch(`${serverUrl}/all`)) // GET returns the fetch promise
    .then(response => response.json())
    .then(allData => {
      //Updating the UI
      const data = allData;
      document.getElementById('date').innerHTML = data.date;
      document.getElementById('temp').innerHTML = data.temperature;
      document.getElementById('content').innerHTML = data.feelings;
    });
}}

/* Function to POST data */

function postData(url = '', data = {}) {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
}
