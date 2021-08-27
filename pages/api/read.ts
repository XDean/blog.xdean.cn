import {apiHandler} from "common/api/handler";
import {database} from "common/api/database";
import {OkPacket} from "mysql";


export default apiHandler({
  handler: {
    GET: async ({helper}) => {
      const postId = helper.museQuery('postId')
      const userId = helper.getUserId()

      const insertSql = `INSERT IGNORE INTO xdean.blog_post_read(post_id, user_id)
                         VALUES (?, ?)`
      await database.query<OkPacket>(insertSql, [postId, userId])

      const selectSql = `SELECT COUNT(*) AS total
      FROM xdean.blog_post_read 
      WHERE post_id = ?`;
      const result = await database.query<{ read: number }[]>(selectSql, [postId])
      return result[0]
    },
  }
})