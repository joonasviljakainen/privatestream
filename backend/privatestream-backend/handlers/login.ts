"use strict";
import * as AWS from "aws-sdk";
import { ddb } from "../clientUtils/DynamoClient";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { createErrorMessage } from "../utils/ErrorHandling";
import { validateCredentials } from "../utils/CredentialValidators";
const SIGNING_KEY = "tosivaikeesalaisuus"; // TODO set in env
const ONE_HOUR = 60 * 60 * 1000;

const DEFAULT_CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
};

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

  // TEST

  try {
    const user = await ddb
      .get({
        TableName: "privatestream-users",
        Key: { username },
      })
      .promise();
    console.log(user);
    if (user && user.Item && user.Item.username === username) {
      const matches = await bcrypt.compare(password, user.Item.password);
      if (matches) {
        console.log("MATCHES!");
        const now = Math.floor(Date.now() / 1000);
        const tokenBody = {
          username: user.Item.username,
          accountType: user.Item.accountType || "BASIC",
          iat: now,
          exp: now + 60 * 60,
        };
        // TODO decide algorithm
        const token = jwt.sign(tokenBody, SIGNING_KEY, {});
        return {
          statusCode: 200,
          headers: DEFAULT_CORS_HEADERS,
          body: JSON.stringify({
            message: "Signed in succesfully",
            data: { token },
          }),
        };
      } else {
        console.log("Does not match!");
        return createErrorMessage(400, "Invalid username or password");
      }
    } else {
      return createErrorMessage(400, "Invalid username or password");
    }
  } catch (e) {
    console.log(e);
    return createErrorMessage(500, "Unexpected error");
  }
};
