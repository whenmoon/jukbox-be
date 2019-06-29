
export const createBearerHeaderOptions = (token: string) => {
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};








