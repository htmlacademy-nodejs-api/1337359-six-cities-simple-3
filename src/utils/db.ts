export const getURI = (userName: string, password: string, host: string, port: number, dbName: string) => {
  console.log(userName, password);
  return `mongodb://${host}:${port}/${dbName}`;
};
