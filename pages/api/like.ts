import type {NextApiRequest, NextApiResponse} from 'next'
import {default as connect} from 'serverless-mysql'

const mysql = connect({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  }
})
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id
  const result = await mysql.query(`SELECT ${id}`)
  console.log(result)
  return res.status(200).json(result)
}