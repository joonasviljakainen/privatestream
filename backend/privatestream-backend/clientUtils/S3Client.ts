import { S3, Endpoint } from "aws-sdk";

const isDev = process?.env?.NODE_ENV === "DEV";
const s3 = isDev
  ? new S3({
      s3ForcePathStyle: true,
      accessKeyId: "S3RVER", // This specific key is required when working offline
      secretAccessKey: "S3RVER",
      endpoint: new Endpoint("http://localhost:8001"),
    })
  : new S3();

export { s3 };
