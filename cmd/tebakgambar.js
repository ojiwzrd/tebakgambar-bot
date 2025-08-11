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
import axios from 'axios'
import db from '../src/utils/gameDb.js'
import { khususGroup } from '../validator/group.js'
import { Markup } from 'telegraf'

function interpolate(str, params) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] || '')
}

export default function (bot) {
  bot.command('play', khususGroup, async (ctx) => {
    const chatId = ctx.chat.id
    await db.read()
    if (!db.data.tebakgambar) db.data.tebakgambar = []

    const active = db.data.tebakgambar.find(game => game.chatId === chatId)
    if (active) return ctx.reply(ctx.lang.__('active_game_notice'))

    try {
      // Json Tebakgambar
      const url =
        'https://raw.githubusercontent.com/lunairaa/database/refs/heads/main/json/game/tebakgambar.json'
      const res = await axios.get(url)
      if (!Array.isArray(res.data)) throw new Error('Invalid question data.')

      const soal = res.data[Math.floor(Math.random() * res.data.length)]

      const caption =
        `${ctx.lang.__('game_title')}\n\n` +
        `${ctx.lang.__('game_instruction')}\n` +
        `💡 *Hint:* ${soal.deskripsi}\n\n` +
        `${ctx.lang.__('game_time_limit')}\n\n` +
        ctx.lang.__('game_reply_instruction')

      const msg = await ctx.replyWithPhoto(soal.img, {
        caption,
        parse_mode: 'Markdown'
      })

      db.data.tebakgambar.push({
        chatId,
        messageId: msg.message_id,
        jawaban: soal.jawaban.toLowerCase().trim()
      })
      await db.write()

      setTimeout(async () => {
        await db.read()
        const expired = db.data.tebakgambar.find(game => game.chatId === chatId)
        if (expired) {
          db.data.tebakgambar = db.data.tebakgambar.filter(
            (game) => game.chatId !== chatId
          )
          await db.write()
          const timeUpMsg = interpolate(ctx.lang.__('time_up'), { answer: expired.jawaban.toUpperCase() })
          ctx.reply(timeUpMsg, {
            parse_mode: 'Markdown',
            reply_markup: Markup.keyboard([[ctx.lang.__('try_again_button')]])
              .resize()
              .oneTime()
          })
        }
      }, 60000)
    } catch {
      ctx.reply(ctx.lang.__('fetch_error'))
    }
  })
}