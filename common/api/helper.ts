import {CookieSerializeOptions} from "cookie";
import {setCookie} from "./cookie";
import {apiError} from "./handler";
import {NextApiRequest, NextApiResponse} from "next/dist/shared/lib/utils";
import {randomInt} from "crypto";

export type Helper = {
  museQuery(name: string, defaultValue?: string): string
  setCookie(name: string, value: unknown, options?: CookieSerializeOptions): void
  deleteCookie(name: string): void
  getUserId(): number
}

export const createHelper = (req: NextApiRequest, res: NextApiResponse): Helper => ({
  museQuery(name: string, defaultValue?: string): string {
    const value = req.query[name]
    if (typeof value === 'string') {
      return value
    } else if (defaultValue !== undefined) {
      return defaultValue
    } else {
      throw apiError(400, `required query parameter "${name}" not exist`)
    }
  },
  setCookie(name: string, value: unknown, options: CookieSerializeOptions = {}) {
    setCookie(res, name, value, options)
  },
  deleteCookie(name: string) {
    setCookie(res, name, null, {maxAge: 0})
  },
  getUserId() {
    const userId = Number(req.cookies['userId'])
    if (!userId) {
      const uuid = randomInt(2 << 30 - 1)
      this.setCookie('userId', uuid)
      return uuid
    }
    return userId
  }
})