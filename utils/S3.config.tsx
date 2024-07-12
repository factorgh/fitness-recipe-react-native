import {S3} from "aws-sdk";

export const s3Bucket = new S3({
    // accessKeyId:process.env.EXPO_AWS_S3_ACCESS_KEY,
    accessKeyId:'AKIA25YDSXMPIUGMRGHU',
    secretAccessKey: 'cPyR1MO61/9ZBjJLGNZ/A2pTb+TpEUq7ifrwnP0',
    region:'eu-north-1'
})