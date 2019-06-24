export const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.split(' ')[1];
  next();
};

export const provideTokenToUser = (req: any, res: any, next: any) => {
  req.token =
  //'BQCwDPfbvSlPuWHvp3bOKOVIS47rGCB42foRfWgx1qEhfCLJuKPjgLY1SoKvJUbcaWgNrYGiEXa9LetnaIVUw54cE7ArKBHcPhjydBfp0su6xrrdxo-Z4MEKtdHcuNt5Be9rj-DvmBMVBxjjUr4RqDWd6hRtb0wkGxOhf9PoKg6qAlHWcNpc'
  next();
}
