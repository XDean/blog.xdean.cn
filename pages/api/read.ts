import {apiHandler} from 'common/api/handler';
import {addRead, getReadOnly} from '../../common/api/impl/read';


export default apiHandler({
  handler: {
    GET: async ({helper}) => {
      const postId = helper.museQuery('postId');
      const add = helper.museQuery('add', 'true').toLowerCase() === 'true';
      const userId = helper.getUserId();
      const objId = `blog/${postId}`;
      if (add) {
        await addRead({objId, userId});
      }
      return getReadOnly({objId});
    },
  },
});