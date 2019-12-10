import * as dynamoDbLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error:  'Item not found.' });
    }
  } catch (err) {
    return failure({ status: false });
  }
};
