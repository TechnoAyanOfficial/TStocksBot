const { CronJob } = require('cron')
const {
  db,
} = require('../database')


db.Stock.update('telegram')

module.exports = async () => {
  const job = new CronJob('0 */5 * * * *', (async () => {
    const stocks = await db.Stock.find({ updatable: true })

    for (let index = 0; index < stocks.length; index++) {
      const stock = stocks[index]

      console.log(`cron update stock ${stock.username}`)
      await db.Stock.update(stock.username)
    }
  }))

  job.start()
}
