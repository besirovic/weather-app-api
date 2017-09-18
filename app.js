 const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

 geocode.geocodeAddress(argv.address, (errorMessage, results) => {

    if( errorMessage ) {
        console.log(errorMessage);
    } else {
        
        weather.getWeather(results.lat, results.lng, (errorMessage, result) => {

            if (errorMessage) {
                console.log(errorMessage);
                return;
            }

            console.log("Temperature for ", results.address, " is ", result);

        });

    }

});

