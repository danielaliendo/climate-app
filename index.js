require('dotenv').config()
const {inquirerMenu, pause, readInput, listPlaces} = require('./helpers/inquirer');
const Searches = require("./models/searches");
const History = require("./models/history");

const main = async () => {

  console.clear();

  const searches = new Searches();
  const history = new History();

  let opt;

  do {

    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Show message
        const place = await readInput('City: ')

        // Search places
        const places = await searches.cities(place)

        // Select place
        const id = await listPlaces(places)

        if (id === '0') continue;

        // Get place selected
        const placeSelected = places.find(place => place.id === id)
        const {name, lat, lng} = placeSelected

        //  Get city climate
        const weather = await searches.getWeatherByLatLng(lat, lng)
        const {desc, min, max, temp} = weather

        // Save place in DB
        await history.addHistory(name)

        // Show result
        console.log('----------------------------------')
        console.log(`        City information`.green)
        console.log('----------------------------------')
        console.log('About city: '.bold)
        console.log(`  City name: ${name}`)
        console.log(`  Lat: ${lat}`)
        console.log(`  Lng: ${lng}`)
        console.log('----------------------------------')
        console.log('Weather: '.bold)
        console.log('  Temperature: ', `${temp}°C`.yellow)
        console.log('  Minimum: ', `${min}°C`.yellow)
        console.log('  Maximum: ', `${max}°C`.yellow)
        console.log('  Description: ', `${desc.charAt(0).toUpperCase() + desc.slice(1)}`.green)
        console.log('----------------------------------')

        break;
      case 2:
        console.log('----------------------------------')
        console.log('History: '.bold)

        if (history.uppercaseHistory.length >= 1) {
          history.uppercaseHistory.forEach((place, i) => {
            const idx = i + 1
            console.log(`${idx}. `.green, `${place}`)
          })
        } else {
          console.log(`You haven't had a search yet`.red)
        }

        break;
    }

    if (opt !== 0) {
      await pause();
    }

  } while (opt !== 0)

}

main();