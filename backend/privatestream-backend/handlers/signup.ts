"use strict";
import AWS, { DocDB, DynamoDB } from "aws-sdk";
import { ddb } from "../clientUtils/DynamoClient";
import * as bcrypt from "bcrypt";

const CREDENTIAL_MAX_LENGTH = 40;
const PASSWORD_MIN_LENGTH = 10;
const PASSWORD_MAX_LENGTH = 100;

type LoginCredentials = {
  username?: string;
  password?: string;
};

type User = {
  username: string;
  pwdHash: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

const createErrorMessage = (status: number, message: string) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify(
      {
        message: message,
      },
      null,
      2
    ),
  };
};

const validateUsername = (username: string) => {
  const usernameRegexp = new RegExp(/[^\u00C0-\u017F0-9a-zA-Z-_.+@]/g);
  if (username.length > CREDENTIAL_MAX_LENGTH) {
    return new Error(
      `username too long - maximum length is ${CREDENTIAL_MAX_LENGTH}`
    );
  }
  if (usernameRegexp.test(username)) {
    return new Error(
      `username contains invalid characters - allowed characters are a-Z, -. + . @`
    );
  }
  return undefined;
};

const validatePassword = (password: string) => {
  const passwordRegexp = new RegExp(/[^\u00C0-\u017F0-9a-zA-Z-_+@#()]/g);
  if (password.length < PASSWORD_MIN_LENGTH) {
    return new Error(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
    );
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return new Error(
      `Password cannot be longer than ${PASSWORD_MAX_LENGTH} characters.`
    );
  }
  if (passwordRegexp.test(password)) {
    return new Error(
      `Password contains disallowed characters. Allowed characters are a-Z, ö, å, ä. +, _, @, #, (, )`
    );
  }

  return undefined;
};

const validateCredentials = (username: string, password: string) => {
  return validateUsername(username) || validatePassword(password) || undefined;
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
    const previousUser = await ddb
      .get({
        TableName: "privatestream-users",
        Key: { username: username },
      })
      .promise();
    console.log("GOT");
    if (previousUser && previousUser.username) {
      console.log(previousUser);
      return createErrorMessage(400, "Username already taken");
    }
  } catch (e) {
    console.log("DID NOT GET");
    console.log(e.code);

    console.log(e);
    if (e.code !== "ResourceNotFoundException") {
      return createErrorMessage(500, "Unexpected error");
    }
  }

  console.log("CREATING USER");

  const hash = await bcrypt.hash(password, 11);
  const params: AWS.DynamoDB.PutItemInput = {
    TableName: "privatestream-users",
    Item: {
      username,
      password: hash,
    },
  };

  try {
    const result = await ddb.put(params).promise();

    console.log(result);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,GET",
      },
      body: JSON.stringify(
        {
          message: "user created succesfully",
          data: result,
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
