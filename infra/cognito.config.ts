import { AWS } from '@serverless/typescript';

export const cognitoConfig: AWS['resources']['Resources'] = {
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
};
