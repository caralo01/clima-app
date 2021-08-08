const inquirer = require('inquirer');
require('colors');


const inquirerMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: '¿Que desea hacer?',
      choices: [
        {
          value: 1,
          name: `${"1.".green} Buscar ciudad`,
        },
        {
          value: 2,
          name: `${'2.'.green} Historial`,
        },
        {
          value: 0,
          name: `${'0.'.green} Salir \n`,
        },   
      ]
    }
  ];
    console.clear();
    console.log('========================'.green);
    console.log(' Selecciona una opción'.white);
    console.log('========================'.green);

    const opt = await inquirer.prompt(questions);

    return opt.option;
    
}

const readInput = async (message)  => {
  const { city } =  await inquirer.prompt([
    {
      type: 'input',
      name: 'city',
      message,
      validate( value) {1
        if(value.length === 0) {
          return 'Por favor ingrese valor';
        }

        return true;
      }
    }
  ]);

  return city;
}

const listCities = async (cities = []) => {
  const choices = [{
    value: '0',
    name: '0'.green + ' Cancelar'
  }];
  const questions = [
    {
      type: 'list',
      name: 'value',
      message: 'Seleccione lugar:?',
      choices: choices.concat(cities.map((item, index) => {
        const pos = `${index + 1}.`.green;
        return {
          value: item.id,
          name: `${pos} ${item.name}`,
        }
      }))
    }
  ];

  const { value } = await inquirer.prompt(questions);

  return value;

}


const pause = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'enter',
      message: `\nPresione ${'ENTER'.green} para continuar`
    }
  ])
}

const confirmAction = async () => {
  const questions = [
    {
      type: 'confirm',
      name: 'option',
      message: 'Estás seguro?'
    }
  ];

  const { option } = await inquirer.prompt(questions);

  return option;

}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  confirmAction,
  listCities
};