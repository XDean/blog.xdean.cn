import {apiHandler} from "common/api/handler";
import {getRead} from "../../common/api/impl/read";


export default apiHandler({
  handler: {
    GET: async ({helper}) => {
      const postId = helper.museQuery('postId')
      const userId = helper.getUserId()
      return getRead({
        objId: `blog/${postId}`,
        userId
      })
    },
  }
})