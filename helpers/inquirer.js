const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search city`
      },
      {
        value: 2,
        name: `${'2.'.green} Show history`
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear();

  console.log('----------------------------------')
  console.log('      Welcome to Climate App      ')
  console.log('----------------------------------')

  const {option} = await inquirer.prompt(questions)
  return option
}

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'Enter'.green} to continue: `
    }
  ]
  await inquirer.prompt(question)
}

const readInput = async (message) => {
  const question = [{
    type: 'input',
    name: 'desc',
    message
  }]

  const {desc} = await inquirer.prompt(question)
  return desc

}

const listPlaces = async (places = []) => {

  const choices = places.map((place, i) => ({
    value: place.id,
    name: `${`${i + 1}. `.green} ${place.name}`
  }))

  choices.unshift({
    value: '0',
    name: `${`0. `.green} Cancel`
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a place',
      choices
    }
  ]

  const {id} = await inquirer.prompt(questions);

  return id

}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces
}