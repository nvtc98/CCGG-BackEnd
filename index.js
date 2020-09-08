const axios = require('axios');
const config = require('./config.json');
const startServer=require('./src/express');

const a=async ()=>{
	// await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',{
	// 	params: {
	// 		ID: 12345
	// 	}
	// });
	// let rawdata = fs.readFileSync('student.json');
	console.log(config);
	// let student = JSON.parse(config);
	// console.log(student);

	var accessId = 'ebb5f84a-37dd-4c5a-996b-e84a3b816cd3';
	var taskUrl = 'analyze/chords';
	var parameters = { blocking: false, format: 'json', access_id: accessId };
    
	// the values for these parameters were taken from the corresponding controls in the demo form
	parameters['input_file'] = 'http://www.sonicAPI.com/music/brown_eyes_by_ueberschall.mp3';
    
	const result = await axios.get('https://api.sonicAPI.com/'+taskUrl,{params:{
		...parameters
	}});
	console.log('result',result);
};

startServer();