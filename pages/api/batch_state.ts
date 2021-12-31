import {apiError, apiHandler} from 'common/api/handler';
import {getObjStats} from '../../common/api/impl/stat';


export default apiHandler({
  handler: {
    GET: async ({helper, req}) => {
      const postIds: string[] = req.body['postIds'];
      if (!postIds || !Array.isArray(postIds)) {
        throw apiError(400, `required query parameter "postIds" not exist`);
      }
      return getObjStats({
        objIds: postIds.map(e => `blog/${e}`),
        userId: helper.getUserId(),
      });
    },
  },
});