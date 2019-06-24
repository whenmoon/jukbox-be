export const redirectAdmin = (req: any, res: any) => {
  try {
    // 'http://localhost:3000/authorized-admin?access_token=TOKEN'
    res.redirect('http://localhost:3000/login/admin');
  } catch(e) {
    res.status(500).end();
  }
};
