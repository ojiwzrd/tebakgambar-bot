export async function khususGroup(ctx, next) {
  if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
    return next()
  } else {
    return ctx.reply(ctx.lang.__('only_group'))
  }
}