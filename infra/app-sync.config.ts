import { DbTable } from '@src/enums/db-table';

/**
 * AppSync is power by the "serverless-appsync-plugin" plugin.
 * The following config goes into the root section of the
 * `serverless.ts` file instead of the `Resources` section.
 */
export const appSyncConfig = {
  appSync: {
    name: '${self:provider.stage}-appsync-api',
    logging: {
      enabled: true,
      level: 'ALL',
    },
    authentication: {
      type: 'API_KEY',
    },
    apiKeys: ['appsync_api_key'],
    additionalAuthentications: [
      {
        type: 'AMAZON_COGNITO_USER_POOLS',
        config: { userPoolId: { Ref: 'AppUserPool' } },
      },
    ],
    schema: 'schema.graphql',
    dataSources: {
      ...(() => {
        const res = {};

        // create a data source config for each DynamoDB table
        Object.values(DbTable).forEach((tableName: string) => {
          res[`${tableName}TableDS`] = {
            type: 'AMAZON_DYNAMODB',
            description: `${tableName} table`,
            config: {
              tableName: '${self:provider.stage}-' + tableName,
            },
          };
        });

        return res;
      })(),
      lambda: {
        type: 'AWS_LAMBDA',
        config: {
          function: {
            timeout: 30,
            handler:
              'src/modules/appsync/functions/lambda-resolver/handler.main',
          },
        },
      },
    },
    resolvers: {
      // 'Query.test': {
      //   kind: 'UNIT',
      //   dataSource: `${DbTable.Users}TableDS`,
      //   code: 'src/modules/user/resolvers/lambda.ts',
      // },
      'Query.getUser': {
        functions: [
          {
            dataSource: `${DbTable.Users}TableDS`,
            code: 'src/modules/user/resolvers/get-user.ts',
          },
        ],
      },
      'Query.users': {
        functions: [
          {
            dataSource: `${DbTable.Users}TableDS`,
            code: 'src/modules/user/resolvers/users.ts',
          },
        ],
        // kind: 'UNIT',
        // dataSource: `${DbTable.Users}TableDS`,
        // code: 'src/modules/user/resolvers/users.ts',
      },
    },
    pipelineFunctions: {
      // getUser: {
      //   dataSource: `${DbTable.Users}TableDS`,
      //   code: 'src/modules/user/resolvers/get-user.ts',
      // },
      // users: {
      //   dataSource: `${DbTable.Users}TableDS`,
      //   code: 'src/modules/user/resolvers/usersa.ts',
      // },
      // test: {
      //   dataSource: 'lambda',
      //   code: 'src/modules/appsync/resolvers/lambda.ts',
      // },
    },
  },
};
