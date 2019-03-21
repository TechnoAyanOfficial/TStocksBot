const Markup = require('telegraf/markup')


module.exports = async (ctx) => {
  const stock = await ctx.db.Stock.get(ctx.message.text)

  if (stock) {
    ctx.replyWithHTML(ctx.i18n.t('stock.info', {
      title: stock.title,
      username: stock.username,
      symbol: stock.symbol,
      price: stock.price,
      chart: stock.charts.day,
    }), Markup.inlineKeyboard([
      [
        Markup.callbackButton('amount', `stock.amount:${stock.username}:1`),
      ],
      [
        Markup.callbackButton('buy', `stock.buy:${stock.username}:1`),
      ],
    ]).extra())
  }
}
