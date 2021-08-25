import {CookieSerializeOptions, serialize} from 'cookie'
import {NextApiResponse} from 'next'

const COOKIE_HEADER = 'Set-Cookie';

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
  if (options.maxAge !== undefined) {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }
  const exist = res.getHeader(COOKIE_HEADER)
  const cookie = serialize(name, String(stringValue), options);
  if (typeof exist === 'string') {
    res.setHeader(COOKIE_HEADER, [exist, cookie])
  } else if (Array.isArray(exist)) {
    res.setHeader(COOKIE_HEADER, [...exist, cookie])
  } else {
    res.setHeader(COOKIE_HEADER, [cookie])
  }
}
