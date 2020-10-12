const axios = require('axios');
const config = require('../../config.json');

const onFinished = async (fileId, sonicAccessId) => {
	const downloadUrl = 'https://api.sonicAPI.com/file/download?file_id=' + fileId + '&access_id=' + sonicAccessId + '&format=json';
	const result = await axios.get(downloadUrl);
	console.log('finally', result);
	console.log('chord', result.data.chords_result.chords);
};

exports.sendSonicRequest = async (cb) => {
	const { sonicAccessId, heroku } = config;
	var taskUrl = 'analyze/chords';
	var parameters = { blocking: false, format: 'json', access_id: sonicAccessId };

	// parameters['input_file'] = 'http://www.sonicAPI.com/music/brown_eyes_by_ueberschall.mp3';
	parameters['input_file'] = heroku.url + '/asset/test.mp3';

	console.log('start connecting api', parameters);
	const result = await axios.get('https://api.sonicAPI.com/' + taskUrl, {
		params: {
			...parameters
		}
	});

	cb && cb(result);

	const fileId = result.data.file.file_id;
	const polling = setInterval(async () => {
		const result = await axios.get('https://api.sonicAPI.com/file/status?file_id=' + fileId + '&access_id=' + sonicAccessId + '&format=json');
		console.log('progress', result);
		if (result.data.file.status == 'ready') {
			onFinished(fileId, sonicAccessId);
			clearInterval(polling);
		}
		else if (result.data.file.status == 'working') {
			console.log(result.data.file.progress + '% done');
		}
	}, 500);
};