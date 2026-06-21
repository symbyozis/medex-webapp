import type { NextApiRequest, NextApiResponse } from 'next'

type ContactBody = {
  type: 'contact'
  name: string
  message: string
  phone?: string
}

type AppointmentBody = {
  type: 'appointment'
  name: string
  phone: string
  doctor: string
  appointmentDate: string
  birthDate: string
  email?: string
}

type Body = ContactBody | AppointmentBody
type Response = { ok: true } | { ok: false; error: string }

function buildText(body: Body): string {
  if (body.type === 'appointment') {
    return [
      '🏥 *Запись на приём*',
      `👤 ФИО: ${body.name}`,
      `📞 Телефон: ${body.phone}`,
      `👨‍⚕️ Врач: ${body.doctor}`,
      `📅 Дата приёма: ${body.appointmentDate}`,
      `🎂 Дата рождения: ${body.birthDate}`,
      body.email ? `✉️ Email: ${body.email}` : null,
    ].filter(Boolean).join('\n')
  }

  return [
    '📩 *Новая заявка с сайта*',
    `👤 Имя: ${body.name}`,
    body.phone ? `📞 Телефон: ${body.phone}` : null,
    `💬 Сообщение: ${body.message}`,
  ].filter(Boolean).join('\n')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = req.body as Body

  if (!body.name) {
    return res.status(400).json({ ok: false, error: 'Имя обязательно' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Telegram не настроен' })
  }

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: buildText(body), parse_mode: 'Markdown' }),
    }
  )

  if (!tgRes.ok) {
    const err = await tgRes.text()
    return res.status(500).json({ ok: false, error: err })
  }

  return res.status(200).json({ ok: true })
}
