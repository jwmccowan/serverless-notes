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
    await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (err) {
    console.log(err);
    return failure({ status: false });
  }
};
