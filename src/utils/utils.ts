import { DbTable } from '@src/enums/db-table';

export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

/**
 * Returns current datetime in the ISO 8601 format.
 */
export const now = () => new Date().toISOString();

/**
 * Resolves a DynamoDB table name for the current environment.
 *
 * @param dbTable
 */
export const dbTableName = (dbTable: DbTable) => {
  return `${process.env.NODE_ENV}-${dbTable}`;
};
