import {apiHandler} from "common/api/handler";
import {database} from "common/api/database";
import {OkPacket} from "mysql";
import {stringToBoolean} from "../../common/util/base";


export default apiHandler({
  handler: {
    GET: async ({helper}) => {
      const postId = helper.museQuery('postId')
      const userId = helper.getUserId()
      const sql = `SELECT COUNT(*) AS total, IFNULL(SUM(user_id = ?), 0) AS you 
      FROM xdean.blog_post_like 
      WHERE post_id = ?`;
      const result = await database.query<{ total: number, you: number }[]>(sql, [userId, postId])
      if (result.length === 0) {
        return {
          total: 0,
          you: 0,
        }
      }
      return result[0]
    },
    POST: async ({helper}) => {
      const postId = helper.museQuery('postId')
      const userId = helper.getUserId()
      const like = stringToBoolean(helper.museQuery('value', 'true'))
      if (like) {
        const sql = `INSERT IGNORE INTO xdean.blog_post_like(post_id, user_id)
                     VALUES (?, ?)`
        await database.query<OkPacket>(sql, [postId, userId])
        return null
      } else {
        const sql = `DELETE FROM xdean.blog_post_like WHERE post_id = ? AND user_id=?`
        await database.query<OkPacket>(sql, [postId, userId])
        return null
      }
    }
  }
})