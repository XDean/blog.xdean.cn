import {NextApiHandler, NextApiRequest, NextApiResponse} from "next/dist/shared/lib/utils";
import {createHelper, Helper} from "./helper";

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

type Handler<T = any> = (params: { req: NextApiRequest, res: NextApiResponse<T>, helper: Helper }) => T | Promise<T>

type Options<T> = {
  handler: {
    [key in Method]?: Handler<T>
  }
}

export function apiHandler<T>(options: Options<T>): NextApiHandler {
  const {handler} = options
  return async (req, res) => {
    const helper = createHelper(req, res);
    const callHandler = async (h: Handler) => {
      return await Promise.resolve(h({req, res, helper}))
    }
    try {
      for (const m of Methods) {
        if (m === req.method && m in handler) {
          const ret = await callHandler(handler[m]!)
          return res.status(200).json(ret)
        }
      }
      if ('DEFAULT' in handler) {
        const ret = await callHandler(handler['DEFAULT']!)
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
      } else {
        throw e
      }
    }
  }
}