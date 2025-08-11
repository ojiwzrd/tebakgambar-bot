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
import db from '../src/utils/lowdb.js'
import { Markup } from 'telegraf'

// Language selection and language code  
const LANGUAGES = [
  { code: 'id', name: '🇮🇩 Indonesia' },
  { code: 'en', name: '🇺🇸 English' },
  { code: 'es', name: '🇪🇸 Español' },
  { code: 'fr', name: '🇫🇷 Français' },
  { code: 'de', name: '🇩🇪 Deutsch' },
  { code: 'ja', name: '🇯🇵 日本語' },
  { code: 'zh', name: '🇨🇳 中文' },
  { code: 'ru', name: '🇷🇺 Русский' },
  { code: 'ko', name: '🇰🇷 한국어' },
  { code: 'ar', name: '🇸🇦 العربية' }
]

// Make inline kyboard to 2 lines per item
function makeInlineKeyboardTwoPerRow(items) {
  const keyboard = []
  for (let i = 0; i < items.length; i += 2) {
    const row = []
    row.push(Markup.button.callback(items[i].name, `setlang_${items[i].code}`))
    if (items[i + 1]) row.push(Markup.button.callback(items[i + 1].name, `setlang_${items[i + 1].code}`))
    keyboard.push(row)
  }
  return keyboard
}

export default function (bot) {
  bot.command('language', async (ctx) => {
    const text = `🌍 Choose the language you prefer to interact with the bot in. This setting will change the bot's responses and commands to your selected language, making your experience smoother and more enjoyable.\n\n` +
      `You can change this language anytime by using this menu again.\n\n` +
      `Please select one of the following languages to continue:`
    const inlineKeyboard = makeInlineKeyboardTwoPerRow(LANGUAGES)
    await ctx.reply(text, Markup.inlineKeyboard(inlineKeyboard))
  })

  // Callback Inlinekyboard
  bot.action(/setlang_(.+)/, async (ctx) => {
    const langCode = ctx.match[1]
    const allowedLangs = LANGUAGES.map(l => l.code)
    if (!allowedLangs.includes(langCode)) {
      await ctx.answerCbQuery('Language not available', { show_alert: true })
      return
    }
    
// Read and update users after Succeed
    await db.read()
    db.data.users ||= []
    if (!Array.isArray(db.data.users)) db.data.users = []
    const userId = ctx.from.id
    let user = db.data.users.find(u => u.id === userId)
    if (!user) {
      user = {
        id: userId,
        username: ctx.from.username || '',
        first_name: ctx.from.first_name || '',
        last_name: ctx.from.last_name || '',
        lang: langCode,
        game_data: {}
      }
      db.data.users.push(user)
    } else {
      user.lang = langCode
    }

    await db.write()

    if (ctx.lang && typeof ctx.lang.setLocale === 'function') {
      ctx.lang.setLocale(langCode)
    }

    await ctx.answerCbQuery(`Successfully changed ${LANGUAGES.find(l => l.code === langCode).name}`, { show_alert: false })
  })
}