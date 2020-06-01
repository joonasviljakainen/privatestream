import { DynamoDB } from "aws-sdk";

const ddb = new DynamoDB.DocumentClient();

export { ddb };
