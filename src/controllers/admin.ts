export const redirectAdmin = (req: any, res: any) => {
  try {
    res.redirect('http://localhost:3000/login');
  } catch(e) {
    res.status(500).end();
  }
};
