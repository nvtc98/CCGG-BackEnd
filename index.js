const axios = require('axios');
// const Analysis = require('./src/Analysis');

const a=async ()=>{
	await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
	console.log('hello');
};

a();