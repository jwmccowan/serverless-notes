import * as dynamoDbLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    return success(result.Items);
  } catch (err) {
    return failure({ status: false });
  }
};
