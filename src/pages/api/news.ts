import type { NextApiRequest, NextApiResponse } from 'next'

export type TNewsItem = {
  id: number
  url: string
  image: string | null
  title: string
  createdAt: string
}

type Response = TNewsItem[] | { error: string }

function parseChannel(html: string, channel: string): TNewsItem[] {
  const items: TNewsItem[] = []

  // Each post is wrapped in a block with data-post="channel/ID"
  const postRegex = /data-post="([^"]+)"[\s\S]*?(?=data-post="|<\/section>|$)/g
  let match: RegExpExecArray | null

  while ((match = postRegex.exec(html)) !== null) {
    const postId = match[1] // e.g. "zdorplus/42"
    const block = match[0]

    // Skip service/admin messages (channel created, pinned, etc.)
    if (/tgme_widget_message[_\s]service/.test(block)) continue

    // Extract image from background-image style on the photo wrap
    const imageMatch = block.match(/tgme_widget_message_photo_wrap[^>]*style="[^"]*background-image:url\('([^']+)'\)/)
    const image = imageMatch ? imageMatch[1] : null

    // Extract text — take first non-empty text node inside message_text div
    const textMatch = block.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)
    let title = ''
    if (textMatch) {
      // Strip HTML tags and decode basic entities
      title = textMatch[1]
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
        .replace(/&#x([0-9a-fA-F]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .trim()
    }

    // Skip posts with no text and no image, or known service message texts
    if (!title && !image) continue
    const SERVICE_TEXTS = /^(channel created|канал создан|pinned message|закреплено сообщение)$/i
    if (SERVICE_TEXTS.test(title.trim())) continue

    // Extract datetime
    const dateMatch = block.match(/datetime="([^"]+)"/)
    const createdAt = dateMatch ? dateMatch[1] : new Date().toISOString()

    const idNum = parseInt(postId.split('/')[1], 10)

    items.push({
      id: idNum,
      url: `https://t.me/${postId}`,
      image,
      title: title || '—',
      createdAt,
    })
  }

  return items.reverse().slice(0, 10)
}

// Cache in memory between requests (resets on server restart / revalidation)
let cache: { data: TNewsItem[]; fetchedAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (req.query.refresh) cache = null

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return res.status(200).json(cache.data)
  }

  const channel = 'zdorplus'

  try {
    const response = await fetch(`https://t.me/s/${channel}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MedexBot/1.0)',
        Accept: 'text/html',
      },
    })

    if (!response.ok) {
      return res.status(502).json({ error: `Telegram вернул ${response.status}` })
    }

    const html = await response.text()
    const items = parseChannel(html, channel)

    cache = { data: items, fetchedAt: Date.now() }
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return res.status(200).json(items)
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
