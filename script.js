const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',() =>{
	
	const APIKey = 'dbb52fbd7f80d452dcc46d0adaa2b315';
	const city = document.getElementById('search-btn').value;
	if(city==''){
		return ;
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
	
	if(json.cod == '404'){
		container.style.height = '450px';
		weatherBox.classList.remove('active');
		weatherDetails.classList.remove('active');
		error404.classList.add('active');
		return;
	}

	container.style.height = '560px';
	weatherBox.classList.add('active');
	weatherDetails.classList.add('active');
	error404.classList.remove('active');

	const image = document.querySelector('.weather-box img');
	const temperature = document.querySelector('.weather-box .temperature');
	const description = document.querySelector('.weather-box .description');
	const humidity = document.querySelector('.weather-details .humidity span');
	const wind = document.querySelector('.weather-details .wind span');

		switch(json.weather[0].main){
			case 'Clear':
				image.src = 'asset/clear.png';
				break;
			case 'Rain':
				image.src = 'asset/rain.png';
				break;
			case 'Snow':
				image.src = 'asset/snow.png';
				break;
			case 'Clouds':
				image.src = 'asset/cloud.png';
				break; 
			case 'Mist':
				image.src = 'asset/mist.png';
				break;				 
			case 'Haze':
				image.src = 'asset/mist.png';
				break;	 
			default:
				image.src = 'asset/clear.png';
		}
		temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
		description.innerHTML = `${json.weather[0].description}`;
		humidity.innerHTML = `${json.main.humidity}%`;
		wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
	});

});
