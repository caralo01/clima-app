const axios = require('axios');
const { readDB, saveData } = require('../helpers/services');
class Searchers {
  history = [];
  constructor() {
    this.history= readDB();
  }

  get historyUpperCase() {
    return this.history.map( city => {

        let words = city.split(' ');
        words = words.map( word => word[0].toUpperCase() + word.substring(1) );

        return words.join(' ')

    })
}

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es'
    }
  }

  async searchCity (city = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
        params:  this.paramsMapbox
      });
      const resp = await instance.get()
      return resp.data.features.map((city) => ({
        id: city.id,
        name: city.place_name,
        lng: city.center[0],
        lat: city.center[0],
      }));
    } catch(err) {
      return [];
    }
  }
  
  async searchWeather (lat = '', lon= '') {

    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params:  {
          lat,
          lon,
          appid: process.env.OPEN_WEATHER_KEY,
          units: 'metric',
          lang: 'es'
        }
      });
      const resp = await instance.get()
      return {
        desc: resp.data.weather[0].description,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_max,
        temp: resp.data.main.temp,
      }
    } catch(err) {
      console.log(err);
      return {};
    }
  }

  addHistory( city = '' ) {

    if( this.history.includes( city.toLocaleLowerCase() ) ){
        return;
    }
    this.history = this.history.splice(0,5);

    this.history.unshift( city.toLocaleLowerCase() );

    // Grabar en DB
    saveData(this.history);
}

}

module.exports = Searchers;