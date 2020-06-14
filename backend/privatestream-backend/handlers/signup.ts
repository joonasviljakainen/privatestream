"use strict";
import AWS from "aws-sdk";
import { ddb } from "../clientUtils/DynamoClient";
import * as bcrypt from "bcrypt";
import { createErrorMessage } from "../utils/ErrorHandling";
import { validateCredentials } from "../utils/CredentialValidators";

module.exports.handler = async (event: AWS.HttpRequest) => {
  const body: LoginCredentials = JSON.parse(event.body);
  const username = body.username?.toString();
  const password = body.password?.toString();

  if (!password || !username) {
    return createErrorMessage(400, "missing username or password");
  }

  const err = validateCredentials(body.username, body.password);
  if (err) {
    console.log(err);
    return createErrorMessage(400, err.message);
  }

  try {
    const previousUser = await ddb
      .get({
        TableName: "privatestream-users",
        Key: { username: username },
        ReturnValues: "ALL_OLD",
      })
      .promise();

    if (
      previousUser &&
      previousUser.Item &&
      previousUser.Item.username === username
    ) {
      return createErrorMessage(400, "Username already taken");
    }
  } catch (e) {
    return createErrorMessage(500, "Unexpected error");
  }

  console.log("CREATING USER");

  const hash = await bcrypt.hash(password, 11);
  const params = {
    TableName: "privatestream-users",
    Item: {
      username,
      password: hash,
    },
  };

  try {
    const result = await ddb.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,GET",
      },
      body: JSON.stringify(
        {
          message: "user created succesfully!",
        },
        null,
        2
      ),
    };
  } catch (e) {
    console.log(e);
    return createErrorMessage(500, "Unexpected error when creating new user");
  }
};
