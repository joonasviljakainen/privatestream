"use strict";
import { AWSError, S3 } from "aws-sdk";
import { s3 } from "../clientUtils/S3Client";
import { ddb } from "../clientUtils/DynamoClient";

//console.log(s3);
module.exports.hello = async (event) => {
  console.log("MÖSSSSSSS");

  s3.putObject(
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

  s3.listBuckets((err, data) => {
    if (err) console.log("BUCKET LISTING ERROR", err);
    if (data) console.log("BUCKETS", data);
  });

  const params = {
    /*Item: {
      id: {
        S: "aaa" + Date.now().toString(),
      },
      timeRequestMade: {
        S: Date.now().toString(),
      },
      message: {
        S: "HELLO",
      },
    },*/
    Item: {
      //id: { N: Date.now().toString() },
      //id: { N: Date.now() },
      id: Date.now().toString(),
      message: "MÖES BOIS",
    },
    //ReturnConsumedCapacity: "TOTAL",
    TableName: "privatestream-test",
  };

  ddb
    .put(params)
    .promise()
    .then((data) => {
      console.log("DDB yes: ", data);
    })
    .catch((err) => {
      console.error("DDB ERROR:, ", err);
    });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "MÖS! ",
        //contento: error ? error : data,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};