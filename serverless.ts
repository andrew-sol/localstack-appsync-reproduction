import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import onSignUp from 'src/functions/user/on-sign-up';

const serverlessConfiguration: AWS = {
  service: 'api',
  frameworkVersion: '^3.15',
  plugins: ['serverless-esbuild', 'serverless-localstack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: 'dev',
    region: 'eu-west-1',
    deploymentMethod: 'direct',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      USER_POOL_CLIENT_ID: {
        ImportValue: '${self:provider.stage}-UserPoolClientId',
      },
    },
  },
  // import the function via paths
  functions: { hello, onSignUp },
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

    cognitoUserPoolName: '${self:service}-${self:provider.stage}-user-pool',
    cognitoIdentityPoolName:
      '${self:service}-${self:provider.stage}-identity-pool',
  },
  resources: {
    Resources: {
      AppUserPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
          UserPoolName: '${self:custom.cognitoUserPoolName}',
          UsernameAttributes: ['email'],
          AutoVerifiedAttributes: ['email'],
          Policies: {
            PasswordPolicy: {
              MinimumLength: 8,
              RequireLowercase: true,
              RequireNumbers: true,
              RequireSymbols: false,
              RequireUppercase: true,
            },
          },
          Schema: [
            {
              Name: 'email',
              AttributeDataType: 'String',
              Mutable: true,
              Required: true,
            },
          ],
          LambdaConfig: {
            PostConfirmation: {
              'Fn::GetAtt': ['OnSignUpLambdaFunction', 'Arn'],
            },
          },
        },
      },
      // AppIdentityPool: {
      //   Type: 'AWS::Cognito::IdentityPool',
      //   Properties: {
      //     IdentityPoolName: '${self:custom.cognitoIdentityPoolName}',
      //     CognitoIdentityProviders: [
      //       {
      //         ClientId: { 'Fn::GetAtt': ['AppUserPoolClient', 'ClientID'] },
      //         ProviderName: {
      //           'Fn::Sub':
      //             'cognito-idp.${self:provider.region}.amazonaws.com/${self:custom.cognitoUserPoolName}',
      //         },
      //       },
      //     ],
      //   },
      // },
      AppUserPoolClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: '${self:service}-${self:provider.stage}-user-pool-client',
          UserPoolId: { Ref: 'AppUserPool' },
          ExplicitAuthFlows: ['ALLOW_USER_PASSWORD_AUTH'],
          GenerateSecret: false,
        },
      },
    },
    Outputs: {
      UserPoolClientId: {
        Value: { Ref: 'AppUserPoolClient' },
        Export: { Name: '${self:provider.stage}-UserPoolClientId' },
      },
    },
  },
};

module.exports = serverlessConfiguration;
