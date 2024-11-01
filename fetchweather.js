function buttonClicked() {
    var city = document.getElementById("city_input").value;
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}`)
    .then((response) => response.json())
    .then((data) => {
        
        console.log(data);
        console.log(`Location name is ${data.location.name}`);
        console.log(`The region is ${data.location.region}`);
        console.log(`The country is ${data.location.country}`);
        console.log(`The forecast max temperature is ${data.forecast.forecastday[0].day.maxtemp_c}`);
        console.log(`The forecast max temperature icon is ${data.forecast.forecastday[0].day.condition.text} <img src="https:${data.forecast.forecastday[0].day.condition.icon}" alt="Weather icon">`);
        console.log(`The wind speed is ${data.forecast.forecastday[0].day.maxwind_kph}`);
        console.log(`The average humidity is ${data.forecast.forecastday[0].day.avghumidity}`);
        console.log(`The weather condition is ${data.current.condition.text} and the weather icon is <img src="https:${data.current.condition.icon}" alt="Weather icon">`);
        console.log(`The daily change of rain is ${data.forecast.forecastday[0].day.daily_chance_of_rain}% and the daily change of snow is ${data.forecast.forecastday[0].day.daily_chance_of_snow}%`);
        console.log(`Localtime right now is ${data.location.localtime}`);
        
        // Update the DOM with weather details
        document.getElementById('demo1').innerHTML = `Location Name: ${data.location.name}`;
        document.getElementById('demo2').innerHTML = `Country: ${data.location.country}`;
        document.getElementById('demo3').innerHTML = `Region: ${data.location.region}`;
        document.getElementById('demo4').innerHTML = `Current Time: ${data.location.localtime}`;
        document.getElementById(`demo5`).innerHTML = `Time Zone ID: ${data.location.tz_id}`
        document.getElementById(`demo6`).innerHTML = `lat,lon: ${data.location.lat},${data.location.lon}`
        document.getElementById('demo7').innerHTML = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
        document.getElementById('demo8').innerHTML = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
        document.getElementById('demo9').innerHTML = `Moonrise: ${data.forecast.forecastday[0].astro.moonrise}`;


        document.getElementById('demo10').innerHTML = `The forecast weather is ${data.forecast.forecastday[0].day.condition.text}`;
        document.getElementById('demo11').innerHTML = `<img src="https:${data.forecast.forecastday[0].day.condition.icon}" alt="Forecast Weather icon">`;
        document.getElementById('demo12').innerHTML = `Today's weather forecast predicts a high of ${data.forecast.forecastday[0].day.maxtemp_c}°C and a low of ${data.forecast.forecastday[0].day.mintemp_c}°C, with maximum wind speeds reaching ${data.forecast.forecastday[0].day.maxwind_kph} km/h. There is an ${data.forecast.forecastday[0].day.daily_chance_of_rain}% chance of rain, while snow is unlikely with a ${data.forecast.forecastday[0].day.daily_chance_of_snow} chance. The average humidity level will be around ${data.forecast.forecastday[0].day.avghumidity}%.`;


        document.getElementById('demo18').innerHTML = `The weather condition is ${data.current.condition.text}`;
        document.getElementById('demo19').innerHTML = `<img src="https:${data.current.condition.icon}" alt="Weather icon">`;
        document.getElementById('demo20').innerHTML = `Current conditions indicate a humidity level of ${data.current.humidity}%, with a temperature reading of ${data.current.temp_c}°C. The wind speed is presently at ${data.current.wind_kph} km/h, and the calculated heat index stands at ${data.current.heatindex_c}C.`;


        // Get the activity suggestion based on the weather condition
        let weatherCondition = data.current.condition.text; // Fetch the current weather condition
        let activitySuggestion = suggestActivities(weatherCondition); // Call the function to get activity suggestion
        document.getElementById('activitySuggestion').innerHTML = activitySuggestion; // Display the suggestion
    });

    function suggestActivities(weatherCondition) {
        let activities = "";
    
        if (weatherCondition.includes("Sunny")) {
            activities = "It's a great day for a picnic or a hike!";
        }
        else if (weatherCondition.includes("Partly cloudy")) {
            activities = "Perfect weather for a bike ride or outdoor sports.";
        } 
        else if (weatherCondition.includes("Cloudy")) {
            activities = "You might enjoy visiting a museum or going for a coffee.";
        } 
        else if (weatherCondition.includes("Overcast")) {
            activities = "Consider indoor activities like reading or watching a movie.";
        } 
        else if (weatherCondition.includes("Mist")) {
            activities = "Stay indoors and enjoy the fog by preparing comfort food or baking.";
        }
        else if (weatherCondition.includes("Fog")) {
            activities = "Consider indoor activities like reading or watching a movie.";
        } 
        else if (weatherCondition.includes("Rain")) {
            if (weatherCondition.includes("Light rain")) {
                activities = "How about a cozy indoor activity like baking?";
            } 
            else if (weatherCondition.includes("Moderate rain")) {
                activities = "It's best to stay indoors and enjoy a movie marathon.";
            }
            else if (weatherCondition.includes("Heavy rain")) {
                activities = "It's best to stay indoors and enjoy a movie marathon.";
            }
        } 
        else if (weatherCondition.includes("Snow")) {
            if (weatherCondition.includes("Light snow")) {
                activities = "You can go for a gentle walk and enjoy the winter wonderland.";
            } 
            else if (weatherCondition.includes("Heavy snow")) {
                activities = "Stay warm indoors and perhaps have a snow day with hot cocoa!";
            }
            else if (weatherCondition.includes("Blizzard")) {
                activities = "Stay warm indoors and perhaps have a snow day with hot cocoa!";
            }
        } 
        else if (weatherCondition.includes("Thunder")) {
            activities = "It's safer to stay indoors during thunderstorms. Enjoy a good book or some games.";
        } 
        else if (weatherCondition.includes("Windy")) {
            activities = "If it's not too windy, a kite-flying adventure could be fun!";
        }
        else if (weatherCondition.includes("Clear")) {
            activities = "Fire up the grill for a barbecue with family or friends in your backyard or at a park.";
        }  
        else {
            activities = "No specific suggestions available. Just enjoy your day!";
        }
    
        return activities;
    }
}
