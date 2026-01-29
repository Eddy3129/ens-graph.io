import { NextResponse } from 'next/server'

const DEFAULT_CACHE_SECONDS = 60 * 60 * 24 // 1 day

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const urlParam = searchParams.get('url')

  if (!name && !urlParam) {
    return new NextResponse(null, { status: 400 })
  }

  const targetUrl = urlParam
    ? decodeURIComponent(urlParam)
    : `https://euc.li/${encodeURIComponent(name as string)}`

  try {
    const response = await fetch(targetUrl)

    if (!response.ok || !response.body) {
      return new NextResponse(null, { status: 204 })
    }

    const contentType = response.headers.get('content-type') || 'image/png'

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': `public, max-age=${DEFAULT_CACHE_SECONDS}`,
      },
    })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
