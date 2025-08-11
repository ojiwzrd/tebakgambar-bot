export default function (bot) {
  bot.command('halo', async (ctx) => {
    await ctx.reply(ctx.lang.__('hello_world'))
  })
}