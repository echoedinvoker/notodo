import { db } from '@/db';
import { type NextRequest } from 'next/server'

const STATIC_PATH_NAMES = ['notodo', 'create', 'threshold', 'challenge', 'reward']
 
// TODO: Fix the error output when nav to notodo edit page
export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const referer = requestHeaders.get('referer')

  if (!referer) {
    return Response.json({
      error: 'Referer not found'
    }, {
      status: 400
    });
  }

  const segments = await getSegmentInfo(referer)

  return Response.json({ segments });
}


async function getSegmentInfo(referer: string) {
  const host = referer.split('/').slice(0, 3).join('/')
  let tmpReferer = referer.replace(host, '')
  const segments: { label: string; href: string }[] = []
  while (tmpReferer) {
    const lastSegment = tmpReferer.split('/').at(-1)
    const lastTwoSegments = tmpReferer.split('/').at(-2)
    if (lastSegment && STATIC_PATH_NAMES.includes(lastSegment)) {
      segments.push({
        label: lastSegment,
        href: tmpReferer
      })
      tmpReferer = tmpReferer.replace(`/${lastSegment}`, '')
    } else if (lastSegment && lastTwoSegments && STATIC_PATH_NAMES.includes(lastTwoSegments)) {
      segments.push({
        label: await getLabelFromDB(lastTwoSegments, lastSegment),
        href: tmpReferer
      })
      tmpReferer = tmpReferer.replace(`/${lastSegment}`, '')
    } else {
      segments.push({
        label: 'Home',
        href: host
      })
      tmpReferer = ''
    }
  }
  return segments
}

async function getLabelFromDB(pathname: string, id: string) {
  if (pathname === 'notodo') {
    const notodo = await db.notodo.findFirst({
      where: { id }
    })
    return notodo ? notodo.title : ''
  }
  if (pathname === 'threshold') {
    const threshold = await db.threshold.findFirst({
      where: { id }
    })
    return threshold ? threshold.title : ''
  }
  if (pathname === 'challenge') {
    const challenge = await db.challenge.findFirst({
      where: { id }
    })
    return challenge ? challenge.id : ''
  }
  if (pathname === 'reward') {
    const reward = await db.reward.findFirst({
      where: { id }
    })
    return reward ? reward.name : ''
  }
  return ''
}
