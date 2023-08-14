# dynamodb-local-sample

🪪🪪🪪 DynamoDBをローカルで動かすサンプル！  

## 実行方法

```shell
# ローカルでDynamoDBを起動。
docker-compose up -d

# AWS CLIコンテナに入る。
docker-compose run -it --rm app-node

# DynamoDBにテーブルを作成する。
# AWS CLIコンテナ内で実行する。
aws dynamodb create-table --cli-input-json file://dynamodb-schema/SampleTable.json --endpoint-url http://dynamodb-local:8000 --region ap-northeast-1 --no-cli-pager

# DynamoDBテーブル一覧を表示する。
# AWS CLIコンテナ内で実行する。
aws dynamodb list-tables --endpoint-url http://dynamodb-local:8000 --region ap-northeast-1 --no-cli-pager

# DynamoDBにデータを登録する。
# AWS CLIコンテナ内で実行する。
aws dynamodb batch-write-item --request-items file://dynamodb-data/SampleTable.json --endpoint-url http://dynamodb-local:8000 --region ap-northeast-1 --no-cli-pager

# DynamoDBのデータを取得する。
# AWS CLIコンテナ内で実行する。
aws dynamodb scan --table-name SampleTable --endpoint-url http://dynamodb-local:8000 --region ap-northeast-1 --no-cli-pager

# AWS CLIコンテナから出る。
exit
```

## 参考文献

- [Download DynamoDB local for Docker](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#docker)
- [DynamoDB local (ダウンロード可能バージョン) のセットアップ](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
