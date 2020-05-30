"use strict";
import { S3, AWSError, DynamoDB } from "aws-sdk";
const s3 = new S3();
const dynamodb = new DynamoDB.DocumentClient();
console.log("Hello");

module.exports.hello = async (event) => {
  console.log("MÖSSSSSSS");

  s3.putObject(
    {
      Bucket: "privatestream-test",
      Key: "hallo",
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

  dynamodb
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
