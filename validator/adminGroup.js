export async function hanyaAdminGroup(ctx, next) {
  if (!ctx.chat || (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup')) {
    return ctx.reply(ctx.lang.__('only_group'))
  }
  try {
    const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)
    if (['administrator', 'creator'].includes(member.status)) {
      return next()
    } else {
      return ctx.reply(ctx.lang.__('only_admin_allowed'))
    }
  } catch {
    return ctx.reply(ctx.lang.__('failed_check_admin'))
  }
}