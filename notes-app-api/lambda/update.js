import * as dynamoDbLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (err) {
    return failure({ status: false });
  }
};
