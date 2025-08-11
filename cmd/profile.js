import dbUsers from '../src/utils/lowdb.js'
import { Markup } from 'telegraf'
import axios from 'axios'

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default function (bot) {
  bot.command('profile', async (ctx) => {
    const userId = ctx.from.id

    await dbUsers.read()
    dbUsers.data.users ||= []

    const user = dbUsers.data.users.find(u => u.id === userId)

    if (!user) {
      return ctx.reply(ctx.lang.__('profile_not_found'), {
        reply_markup: Markup.keyboard([[ctx.lang.__('start_game_button')]])
          .resize()
          .oneTime()
      })
    }

    const username = user.username ? `@${escapeHtml(user.username)}` : ''
    const fullName = [user.first_name, user.last_name].filter(Boolean).map(escapeHtml).join(' ')
    const score = user.game_data?.tebakgambar?.score || 0
    const photoUrl = user.photo_url || null

    let caption = `👤 <b>Profil Kamu</b>\n\n`
    caption += `Nama: ${fullName || 'Tidak tersedia'}\n`
    caption += `Username: ${username || 'Tidak tersedia'}\n`
    caption += `Poin Tebakgambar: ${score}\n`

    if (photoUrl) {
      try {
        const response = await axios.get(photoUrl, { responseType: 'arraybuffer' })
        const photoBuffer = Buffer.from(response.data, 'binary')
        return ctx.replyWithPhoto({ source: photoBuffer }, {
          caption,
          parse_mode: 'HTML',
          reply_markup: Markup.keyboard([[ctx.lang.__('start_game_button')]])
            .resize()
            .oneTime()
        })
      } catch {
        return ctx.reply(caption, {
          parse_mode: 'HTML',
          reply_markup: Markup.keyboard([[ctx.lang.__('start_game_button')]])
            .resize()
            .oneTime()
        })
      }
    } else {
      return ctx.reply(caption, {
        parse_mode: 'HTML',
        reply_markup: Markup.keyboard([[ctx.lang.__('start_game_button')]])
          .resize()
          .oneTime()
      })
    }
  })
}