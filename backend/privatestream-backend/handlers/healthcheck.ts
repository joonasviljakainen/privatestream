"use strict";

module.exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify(
      {
        message: "Connected to Lambda",
      },
      null,
      2
    ),
  };
};
