const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

axios.get(geocodeUrl).then((response) => {
    if( response.data.status === 'ZERO_RESULTS' ) {
        throw new Error('Ubable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/b6a00c0364a936539f93ae8214c44624/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);

}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log("Unable to connect to api servers");
    } else {
        console.log(error.message);
    }
});