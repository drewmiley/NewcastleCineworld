import Ractive from 'ractive';

import $ from 'jQuery';

import 'bootstrap/dist/css/bootstrap.css';

import template from './app.html';

import NameInput from './components/NameInput';

$.ajax({
	url: 'http://www.cineworld.co.uk/api/quickbook/films',
	type: 'GET',
	data: {key: 'qUnEyRXt', full: true, cinema: 33},
	dataType: 'jsonp', // Setting this data type will add the callback parameter for you
	success: (data) => console.log(data)
});

let App = new Ractive({
	el: '#app',
	template,
	components: {
		NameInput
	},
	data: {
		name: 'Drew'
	}
});

export default App;
