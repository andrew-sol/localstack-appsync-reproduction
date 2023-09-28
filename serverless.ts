import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import onSignUp from 'src/modules/user/functions/on-sign-up';
import { IamAction } from './src/types/iam-action';
import { dynamodbConfig } from './infra/dynamodb.config';
import { appSyncConfig } from './infra/app-sync.config';
import { cognitoConfig } from './infra/cognito.config';

const serverlessConfiguration: AWS = {
  service: 'api',
  frameworkVersion: '^3.15',
  plugins: ['serverless-esbuild', 'serverless-localstack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: "${opt:stage,'local'}",
    region: 'eu-west-1',
    deploymentMethod: 'direct',
    environment: {
      NODE_ENV: '${self:provider.stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AWS_REGION: '${self:provider.region}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:DeleteItem',
              'dynamodb:GetItem',
              'dynamodb:UpdateItem',
            ] as IamAction[],
            Resource: 'arn:aws:dynamodb:{self:provider.region}:*:*',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { onSignUp },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    localstack: {
      stages: ['local'],
    },

    dynamodbTableName: '${self:provider.stage}-main',
    cognitoUserPoolName: '${self:service}-${self:provider.stage}-user-pool',
    cognitoIdentityPoolName:
      '${self:service}-${self:provider.stage}-identity-pool',
  },
  resources: {
    Resources: {
      ...cognitoConfig,
      ...dynamodbConfig,
      ...appSyncConfig,
    },
    Outputs: {
      // fixme: delete
      UserPoolClientId: {
        Value: { Ref: 'AppUserPoolClient' },
        Export: { Name: '${self:provider.stage}-UserPoolClientId' },
      },
    },
  },
};

module.exports = serverlessConfiguration;
