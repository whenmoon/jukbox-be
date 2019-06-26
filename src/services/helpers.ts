export const verifyToken = (req: any, res: any, next: any) => {
  console.log(req.headers)
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any, res: any, next: any) => {
  // in construction ...
  console.log(res.user.token);
  next();
}
