export const getURI = (userName: string, password: string, host: string, port: number, dbName: string) =>
  `mongodb://${userName}:${password}@${host}:${port}/${dbName}?authSource=admin`;
