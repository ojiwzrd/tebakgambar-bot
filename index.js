/*
Bahasa Indonesia:
Disclaimer: Dilarang keras menjual belikan source ini, dan jika ingin mengedit, mengubah atau mendistribusikan kode ini jangan pernah hapus kode sumber utama.
Source: https://github.com/ojiwzrd
Kontak: 083170801193
Email: ojiwzrd@gmail.com
Komunitas: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
Copyright © 2025 OJIWZRD. All Rights Reserved

English:
Disclaimer: It is strictly forbidden to sell this source code. If you want to edit, modify or distribute this code, never remove the original source code.
Source: https://github.com/ojiwzrd
Contact: 083170801193
Email: ojiwzrd@gmail.com
Community: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
Copyright © 2025 OJIWZRD. All Rights Reserved

Español:
Aviso: Está estrictamente prohibido vender este código fuente. Si deseas editar, modificar o distribuir este código, nunca elimines el código fuente original.
Fuente: https://github.com/ojiwzrd
Contacto: 083170801193
Correo: ojiwzrd@gmail.com
Comunidad: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
Derechos de autor © 2025 OJIWZRD. Todos los derechos reservados

Français:
Avis de non-responsabilité : Il est strictement interdit de vendre ce code source. Si vous souhaitez modifier, éditer ou distribuer ce code, ne supprimez jamais le code source original.
Source : https://github.com/ojiwzrd
Contact : 083170801193
Email : ojiwzrd@gmail.com
Communauté : https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
Droits d’auteur © 2025 OJIWZRD. Tous droits réservés

Deutsch:
Haftungsausschluss: Der Verkauf dieses Quellcodes ist strengstens untersagt. Wenn Sie diesen Code bearbeiten, ändern oder verbreiten möchten, entfernen Sie niemals den Original-Quellcode.
Quelle: https://github.com/ojiwzrd
Kontakt: 083170801193
E-Mail: ojiwzrd@gmail.com
Community: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
Copyright © 2025 OJIWZRD. Alle Rechte vorbehalten

日本語:
免責事項：このソースコードの販売は厳禁です。編集、変更、配布を行う場合は、元のソースコードを削除しないでください。
ソース：https://github.com/ojiwzrd
連絡先：083170801193
メール：ojiwzrd@gmail.com
コミュニティ：https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
著作権 © 2025 OJIWZRD。無断転載を禁じます。

中文:
免责声明：严禁出售此源代码。如需编辑、修改或分发此代码，请勿删除原始源代码。
来源：https://github.com/ojiwzrd
联系方式：083170801193
邮箱：ojiwzrd@gmail.com
社区：https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
版权所有 © 2025 OJIWZRD。保留所有权利。

Русский:
Отказ от ответственности: Строго запрещается продавать этот исходный код. Если вы хотите редактировать, изменять или распространять этот код, никогда не удаляйте оригинальный исходный код.
Источник: https://github.com/ojiwzrd
Контакт: 083170801193
Эл. почта: ojiwzrd@gmail.com
Сообщество: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
Авторские права © 2025 OJIWZRD. Все права защищены.

한국어:
면책 조항: 이 소스 코드를 판매하는 것은 엄격히 금지되어 있습니다. 이 코드를 편집, 수정 또는 배포하려면 원본 소스 코드를 삭제하지 마십시오.
출처: https://github.com/ojiwzrd
연락처: 083170801193
이메일: ojiwzrd@gmail.com
커뮤니티: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
저작권 © 2025 OJIWZRD. 모든 권리 보유.

العربية:
تنويه: يُمنع منعًا باتًا بيع هذا الكود المصدري. إذا كنت ترغب في تعديل أو توزيع هذا الكود، فلا تحذف الشيفرة المصدرية الأصلية أبدًا.
المصدر: https://github.com/ojiwzrd
الاتصال: 083170801193
البريد الإلكتروني: ojiwzrd@gmail.com
المجتمع: https://chat.whatsapp.com/Cr5mLtlRAdl0aRDYthz1Zj?mode=ac_t
حقوق النشر © 2025 OJIWZRD. جميع الحقوق محفوظة.
*/
import './config/settings.js'
import { Telegraf, session } from 'telegraf'
import fs from 'fs'
import path from 'path'
import db from './src/utils/lowdb.js'
import { Tebakgambar } from './src/handler/tebakgambar.js'
import Logger from './src/utils/logger.js'
import { setUserLang } from './src/utils/lang.js'

const bot = new Telegraf(global.bottoken)

bot.use(session()) // Use Session
bot.use(async (ctx, next) => {
  if (ctx.from) {
    await db.read()
    db.data.users ||= []
    if (!Array.isArray(db.data.users)) db.data.users = []
    const userId = ctx.from.id
    let user = db.data.users.find(u => u.id === userId)
    // save user data the first time they communicate
    if (!user) {
      let photo_url = ''
      try {
        const photos = await ctx.telegram.getUserProfilePhotos(userId, 0, 1)
        if (photos.total_count > 0) {
          const fileId = photos.photos[0][0].file_id
          const file = await ctx.telegram.getFile(fileId)
          photo_url = `https://api.telegram.org/file/bot${global.bottoken}/${file.file_path}`
        }
      } catch {}
      user = {
        id: userId,
        username: ctx.from.username || '',
        first_name: ctx.from.first_name || '',
        last_name: ctx.from.last_name || '',
        photo_url,
        lang: 'id',
        game_data: {}
      }
      db.data.users.push(user) 
      await db.write()
    } else if (!user.lang) {
      user.lang = 'id'
      await db.write()
    }
  }
  await setUserLang(ctx)
  if (ctx.message && ctx.from) {
    const username = ctx.from.username || ctx.from.first_name || 'Unknown'
    const text = ctx.message.text || '[non-text message]'
    Logger.info(`[Message] From: ${username} (${ctx.from.id}), Text: ${text}`)
  }
  await next()
})

// read the entire js command folder
async function loadCommands(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await loadCommands(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      const command = await import(fullPath)
      if (command.default && typeof command.default === 'function') command.default(bot)
    }
  }
}

await loadCommands(path.join(process.cwd(), 'cmd'))

bot.on('text', async (ctx) => {
  if (!ctx.message || !ctx.from) return
  try {
    await Tebakgambar(ctx)
  } catch (err) {
    Logger.error(`Message handler error: ${err.message}`)
  }
})

// Create default commands on Telegram bots
await bot.telegram.setMyCommands([
{ command: 'start', description: '🪵 Getting Started' },
{ command: 'language', description: '💭 Change Language' },
{ command: 'play', description: '🛎️ Start Game' },
{ command: 'profile', description: '🗒️ Profile Information' }
])

bot.launch()
Logger.info('CONNECTED!!!')