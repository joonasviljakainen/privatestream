import { DynamoDB } from "aws-sdk";
const CONFIG_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT;

let ddb;
if (process.env.IS_OFFLINE === "true") {
  console.log("OFFLINE");
  ddb = new DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: CONFIG_DYNAMODB_ENDPOINT,
  });
} else {
  ddb = new DynamoDB.DocumentClient();
}

export { ddb };
