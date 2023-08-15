import { DynamoDB, type ScanCommandOutput, type GetItemCommandOutput, type ListTablesCommandOutput, type PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import dotenv from 'dotenv'
import dayjs from 'dayjs'

dotenv.config()

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const AWS_DYNAMODB_ENDPOINT = process.env.AWS_DYNAMODB_ENDPOINT!
const AWS_REGION = process.env.AWS_REGION!
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!
const TABLE_NAME = process.env.TABLE_NAME!
/* eslint-enable @typescript-eslint/no-non-null-assertion */

const config = {
  endpoint: AWS_DYNAMODB_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
}
const dynamodb = new DynamoDB(config)

dynamodb.listTables({}, (err, data: ListTablesCommandOutput | undefined) => {
  if (err == null) {
    if (data?.TableNames != null) {
      console.log('Tables:')
      data.TableNames.forEach((table) => {
        console.log(`- ${table}`)
      })
    } else {
      console.log('No tables...')
    }
  } else {
    console.error(err)
  }
})

// データを追加
{
  const params = {
    TableName: TABLE_NAME,
    Item: marshall({
      id: dayjs().format('YYYY_MM_DD_HH_mm_ss_SSS'),
      name: `name_${dayjs().format('YYYY_MM_DD_HH_mm_ss_SSS')}`
    })
  }

  dynamodb.putItem(params, (err: any, data: PutItemCommandOutput | undefined) => {
    console.log('Putting data...')
    if (err == null) {
      console.log('Success:', JSON.stringify(data, null, undefined))
    } else {
      console.error('Error:', err)
    }
  })
}

// データを取得
{
  const params = {
    TableName: TABLE_NAME,
    Key: marshall({
      id: '1'
    })
  }

  dynamodb.getItem(params, (err: any, data: GetItemCommandOutput | undefined) => {
    console.log('Getting data...')
    if (err == null) {
      console.log('Success:', JSON.stringify(data, null, undefined))
    } else {
      console.error('Error:', err)
    }
  })
}

// データをスキャン
{
  const params = {
    TableName: TABLE_NAME
  }

  dynamodb.scan(params, (err: any, data: ScanCommandOutput | undefined) => {
    console.log('Scanning data...')
    if (err == null) {
      // Itemsをループしてデータを取得
      if (data?.Items != null) {
        data.Items.forEach((item) => {
          console.log(`- ${JSON.stringify(item, null, undefined)}`)
        })
      } else {
        console.log('No data...')
      }
    } else {
      console.error('Error:', err)
    }
  })
}
