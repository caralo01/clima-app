require('dotenv').config();

const { readInput, inquirerMenu, pause, listCities } = require('./helpers/inquirer');
const Searchers = require('./models/searchers');


const main = async () => {
  
  let opt;
  const searchers = new Searchers();

  do {
    opt = await inquirerMenu();

    switch(opt) {
      case 1:
        console.log(opt)
        const input = await readInput("Ciudad:");
        const cities = await searchers.searchCity(input);
        const option = await listCities(cities);
        const city = cities.find(item => item.id === option);
        const weather = await searchers.searchWeather(city.lat, city.lng);

        searchers.addHistory( city.name );

        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad', city.name);
        console.log('Lat', city.lat);
        console.log('Lng', city.lng);
        console.log('Descripción', weather.desc);
        console.log('Temperatura', weather.temp);
        console.log('Temperatura máxima', weather.max);
        console.log('Temperatura mínima', weather.min);
        break;
      case 2:
        searchers.historyUpperCase.forEach( (city, i) =>  {
          const idx = `${ i + 1 }.`.green;
          console.log( `${ idx } ${ city } ` );
      })
        break;
    }

    await pause();
  }  while(opt !== 0);
}

main();