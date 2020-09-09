const YoutubeMp3Downloader = require('youtube-mp3-downloader');

const youtubeDownload=()=>{
	//Configure YoutubeMp3Downloader with your settings
	var YD = new YoutubeMp3Downloader({
		// 'ffmpegPath': './',        // FFmpeg binary location
		'outputPath': './',    // Output file location (default: the home directory)
		'youtubeVideoQuality': 'highestaudio',  // Desired video quality (default: highestaudio)
		'queueParallelism': 2,                  // Download parallelism (default: 1)
		'progressTimeout': 2000,                // Interval in ms for the progress reports (default: 1000)
		'allowWebm': false                      // Enable download from WebM sources (default: false)
	});
    
	console.log('start download', YD);
 
	//Download video and save as MP3 file
	YD.download('Vhd6Kc4TZls', 'Cold Funk - Funkorama.mp3');
 
	YD.on('finished', function(err, data) {
		console.log('finished',JSON.stringify(data));
	});
 
	YD.on('error', function(error) {
		console.log('error',error);
	});
 
	YD.on('progress', function(progress) {
		console.log('progress',JSON.stringify(progress));
	});
};

module.exports = youtubeDownload;