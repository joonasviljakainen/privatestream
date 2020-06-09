"use strict";
import { AWSError, S3 } from "aws-sdk";
import { s3 } from "../clientUtils/S3Client";
import { ddb } from "../clientUtils/DynamoClient";

module.exports.hello = async (event) => {
  console.log("MÖSSSSSSS");

  await s3.putObject(
    {
      Bucket: "privatestream-test",
      Key: "halloe" + Date.now().toString(),
      Body: "asdfasdf".toString(),
    },
    (err: AWSError, data: S3.PutObjectOutput) => {
      if (err) {
        console.log("ERROR S3:", err);
      } else {
        console.log("S3 SUCCESS", data);
      }
    }
  );

  await s3.listBuckets((err, data) => {
    if (err) console.log("BUCKET LISTING ERROR", err);
    if (data) console.log("BUCKETS", data);
  });

  const params = {
    Item: {
      id: Date.now().toString(),
      message: "MÖES BOIS",
    },
    TableName: "privatestream-test",
  };

  await ddb
    .put(params)
    .promise()
    .then((data) => {
      console.log("DDB yes: ", data);
    })
    .catch((err) => {
      console.error("DDB ERROR:, ", err);
    });

  const params2 = {
    TableName: "privatestream-users",
    Item: {
      username: "username",
      password: "hash",
    },
  };

  await ddb.put(params2).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "MÖS! ",
      },
      null,
      2
    ),
  };
};
