import {apiHandler} from "common/api/util";
import {randomInt} from "crypto";
import {database} from "common/api/database";


export default apiHandler({
  handler: {
    GET: async ({helper, req}) => {
      const postId = helper.museQuery('postId')
      const userId = req.cookies['userId']
      if (!userId) {
        const uuid = randomInt(2 << 30 - 1)
        helper.setCookie('userId', uuid)
      }
      const sql = `SELECT COUNT(*) AS total, SUM(user_id = ${userId}) AS you FROM blog_post_like WHERE post_id = ${postId}`;
      const result = await database.query<{ total: number, you: number }[]>(sql)
      if (result.length === 0) {
        return {
          total: 0,
          you: false,
        }
      }
      return result[0]
    }
  }
})