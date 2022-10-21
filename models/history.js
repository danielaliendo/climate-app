const fs = require('fs')

class History {

  history = []
  dbPath = "./db/database.json";

  constructor() {
    this.readDB();
  }

  get uppercaseHistory() {

    return this.history.map(place => {
      let words = place.split(' ')
      words = words.map(p => p[0].toUpperCase() + p.substring(1))
      return words.join(' ')
    })

  }

  async addHistory(place = '') {

    if (this.history.includes(place.toLocaleLowerCase())) return;

    this.history = this.history.splice(0, 5)
    // Prevent duplicate places
    this.history.unshift(place.toLocaleLowerCase())

    // add place to history DB
    this.saveHistory()
  }

  saveHistory() {

    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {

    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})

    const data = JSON.parse(info)

    this.history = data.history

  }

}

module.exports = History