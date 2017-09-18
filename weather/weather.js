const request = require('request');

var getWeather = (lat, lng, callback) => {
    
    request({
        url: `https://api.darksky.net/forecast/b6a00c0364a936539f93ae8214c44624/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
    
        if (!error && response.statusCode == 200) {
            callback(undefined, {
                temperature: body.currently.temperature
            });
        } else {
            callback("Unable to fetch weather", undefined);
        }
    
    });

}

module.exports.getWeather = getWeather;