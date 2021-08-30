import {apiHandler} from "common/api/handler";
import {stringToBoolean} from "../../common/util/base";
import {getLike, setLike} from "../../common/api/impl/like";


export default apiHandler({
  handler: {
    GET: async ({helper}) => {
      const postId = helper.museQuery('postId')
      const userId = helper.getUserId()
      return await getLike({
        objId: `blog/${postId}`,
        userId
      })
    },
    POST: async ({helper}) => {
      const postId = helper.museQuery('postId')
      const userId = helper.getUserId()
      const like = stringToBoolean(helper.museQuery('value', 'true'))
      await setLike({
        objId: `blog/${postId}`,
        userId,
        like,
      })
    }
  }
})