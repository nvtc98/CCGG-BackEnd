
const express = require('express');
const axios = require('axios');
const config = require('../../config.json');

const defaultPort = 5000;
const app = express();

const startServer = (port = defaultPort) => {
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	app.get('/', async (request, response) => {
		console.log(`URL: ${request.url}`);


		console.log(config);
		// let student = JSON.parse(config);
		// console.log(student);

		var accessId = 'ebb5f84a-37dd-4c5a-996b-e84a3b816cd3';
		var taskUrl = 'analyze/chords';
		var parameters = { blocking: false, format: 'json', access_id: accessId };

		// the values for these parameters were taken from the corresponding controls in the demo form
		parameters['input_file'] = 'http://www.sonicAPI.com/music/brown_eyes_by_ueberschall.mp3';

		const result = await axios.get('https://api.sonicAPI.com/' + taskUrl, {
			params: {
				...parameters
			}
		});
		console.log('result', result);


		response.send({ statusCode: '200', statusMsg: 'success' });
	});

	app.get('/chatbot', (request, response) => {
		console.log(`URL: ${request.url}`);

		if (!request.query || !request.query.query) {
			response.send({ statusCode: '200', statusMsg: 'success' });
			return;
		}

		// parseQuery(request.query).then((res)=>{
		// 	console.log('response:',res);
		// 	response.send({statusCode:'200', statusMsg:'success', ...res});
		// });
	});

	const server = app.listen(port, (error) => {
		if (error) return console.log(`Error: ${error}`);
		console.log(`Server is now ready. Open on browser: http://localhost:${server.address().port}/`);
	});
};

module.exports = startServer;