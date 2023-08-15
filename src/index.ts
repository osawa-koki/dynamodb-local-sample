import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const AWS_DYNAMODB_ENDPOINT = process.env.AWS_DYNAMODB_ENDPOINT!
const AWS_REGION = process.env.AWS_REGION!
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!
/* eslint-enable @typescript-eslint/no-non-null-assertion */

const config = {
  endpoint: AWS_DYNAMODB_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
}
AWS.config.update(config)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dynamodb = new AWS.DynamoDB()
