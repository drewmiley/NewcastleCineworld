import Ractive from 'ractive';

import $ from 'jQuery';

import 'bootstrap/dist/css/bootstrap.css';

import template from './app.html';
import * as CONSTANTS from './CONSTANTS';

const today = () => {
	const now = new Date();
	return `${ now.getFullYear() }${ now.getMonth() < 9 ? '0' : '' }${ now.getMonth() + 1}${ now.getDate() < 10 ? '0' : '' }${ now.getDate() }`;
};

let App = new Ractive({
	el: '#app',
	template,
	data: {
		films: null,
		performances: null
	}
});

let films;

$.ajax({
	url: CONSTANTS.BASE_URL + CONSTANTS.FILMS_URL,
	type: 'GET',
	data: {
		key: CONSTANTS.API_KEY,
		full: true,
		cinema: CONSTANTS.CINEMA_ID
	},
	dataType: 'jsonp',
	success: data => {
		films = data.films;
		$.ajax({
			url: CONSTANTS.BASE_URL + CONSTANTS.PERFORMANCES_URL,
			type: 'GET',
			data: {
				key: CONSTANTS.API_KEY,
				cinema: CONSTANTS.CINEMA_ID,
				date: today()
			},
			dataType: 'JSONP',
			jsonpCallback: 'callback',
			success: data => {
				const performances = JSON.parse(data.substring(9, data.length - 2)).performances
					.sort((a, b) => {
						return parseInt(a.time.substring(0, 2), 10) > parseInt(b.time.substring(0, 2), 10) ? 1 :
							(parseInt(a.time.substring(0, 2), 10) < parseInt(b.time.substring(0, 2), 10) ? -1 :
							(parseInt(a.time.substring(3), 10) > parseInt(b.time.substring(3), 10) ? 1 :
							(parseInt(a.time.substring(3), 10) < parseInt(b.time.substring(3), 10) ? -1 : 0)));
					})
					.map(performance => {
						let formattedPerformance = performance;
						formattedPerformance.film = films.find(film => film.edi === performance.film);
						return formattedPerformance;
					});
				App.set('performances', performances);
			}
		});
	}
});

export default App;
