export const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = (req: any, res: any, next: any) => {
  // here we are gonna put admin access token so user can use it to search for songs;
  req.token =
  next();
}
