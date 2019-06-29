
export const createBearerHeaderOptions = (token: string) => {
  console.log(token);
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};








