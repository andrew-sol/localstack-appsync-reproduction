# Serverless

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Prerequisites

[Serverless framework](https://www.serverless.com/framework/docs/getting-started)  
[LocalStack](https://docs.localstack.cloud/getting-started/installation/)

## Setup

```shell
export DYNAMODB_SHARE_DB=1
```

```shell
yarn
```

## Deployment

LocalStack:
```shell
yarn dl
```

AWS:
```shell
yarn deploy-dev
```

## Register a user

```shell
cd scripts
```

```shell
./create-user.sh qwe@asd.com
```

Look at the LocalStack container's output to get the confirmation code.
An example confirmation code is provided in the following command.

```shell
./confirm-user.sh qwe@asd.com 899257
```

After this step the user should be saved into the DynamoDB table.
