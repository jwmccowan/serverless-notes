import uuid from "uuid";
import * as dynamoDbLib from '../libs/dynamo-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (err) {
    return failure({ status: false });
  }
};
