export const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any, res: any, next: any) => {
  // in construction ...
  req.token = 'dog';
  next();
}
