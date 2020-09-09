const axios =require('axios');
const config = require('../../config.json');

exports.sendSonicRequest=async(cb) => {
	const { sonicAccessId, heroku } = config;
	var taskUrl = 'analyze/chords';
	var parameters = { blocking: false, format: 'json', access_id: sonicAccessId };

	// the values for these parameters were taken from the corresponding controls in the demo form
	parameters['input_file'] = 'http://www.sonicAPI.com/music/brown_eyes_by_ueberschall.mp3';
	// parameters['input_file'] = heroku.url+'test.mp3';

	console.log('start connecting api', parameters);
	const result = await axios.get('https://api.sonicAPI.com/' + taskUrl, {
		params: {
			...parameters
		}
	});
	console.log('result', result);
	cb && cb(result);
};