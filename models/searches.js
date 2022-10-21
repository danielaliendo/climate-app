const axios = require("axios");

class Searches {

  async cities(place = '') {

    const instance = axios.create({
      baseURL: `https://api.maptiler.com/geocoding/${place}.json`,
      params: {
        'key': process.env.MAPTILER_KEY,
        'limit': 5,
        'language': 'es',
      }
    })

    const {data} = await instance.get();

    return data.features.map(place => ({
      id: place.id,
      name: place.place_name,
      lng: place.center[0],
      lat: place.center[1],
    }))

  }

  async getWeatherByLatLng(lat, lng) {

    const instance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: {
        'appid': process.env.OPENWEATHER_KEY,
        'lat': lat,
        'lon': lng,
        'units': 'metric',
        'lang': 'es'
      }
    })

    try {
      const {data} = await instance.get();
      const {weather, main} = data
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
    } catch (e) {
      console.log(e)
    }

  }

}

module.exports = Searches