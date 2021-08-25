import {NextApiHandler, NextApiRequest, NextApiResponse} from "next/dist/shared/lib/utils";
import {CookieSerializeOptions} from "cookie";
import {setCookie} from "./cookie";

const Methods = ['GET', 'POST', 'DELETE', 'PATCH'] as const
type Method = typeof Methods[number] | 'DEFAULT'

type ApiError = {
  type: 'ApiError'
  code: number
  body: any
}

export function apiError(code: number, message: string, body?: any) {
  return {
    type: 'ApiError',
    code,
    body: {
      message,
      ...body
    }
  } as ApiError
}

type Helper = {
  museQuery(name: string): string
  setCookie(name: string, value: unknown, options?: CookieSerializeOptions): void
  deleteCookie(name: string): void
}

type Handler<T = any> = (params: { req: NextApiRequest, res: NextApiResponse<T>, helper: Helper }) => T | Promise<T>

type Options<T> = {
  handler: {
    [key in Method]?: Handler<T>
  }
}

export function apiHandler<T>(options: Options<T>): NextApiHandler {
  const {handler} = options
  return async (req, res) => {
    const helper: Helper = {
      museQuery(name: string): string {
        const value = req.query[name]
        if (typeof value === 'string') {
          return value
        } else {
          throw apiError(400, `required query parameter "${name}" not exist`)
        }
      },
      setCookie(name: string, value: unknown, options: CookieSerializeOptions = {}) {
        setCookie(res, name, value, options)
      },
      deleteCookie(name: string) {
        setCookie(res, name, null, {maxAge: 0})
      }
    }
    try {
      for (const m of Methods) {
        if (m === req.method && m in handler) {
          const ret = await Promise.resolve(handler[m]!({req, res, helper}))
          return res.status(200).json(ret)
        }
      }
      if ('DEFAULT' in handler) {
        const ret = await Promise.resolve(handler["DEFAULT"]!({req, res, helper}))
        return res.status(200).json(ret)
      }
      return res.status(405).json({
        code: 405,
        support: Object.keys(handler)
      })
    } catch (e) {
      if ('type' in e && e.type === 'ApiError') {
        const ae = e as ApiError
        return res.status(ae.code).json(ae.body)
      }
    }
  }
}