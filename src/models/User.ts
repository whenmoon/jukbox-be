import pool from '../config/db';

export default class User {
  constructor(
    public email: string,
    public token: string,
    public name: string,
    public diamonds: number,
    private id?: number
  ) {}

  public static async create (user: User): Promise<User> {
    const result = await pool.query(`
      INSERT INTO users (email, token, name, diamonds)
      VALUES ('${user.email}', '${user.token}', '${user.name}', ${user.diamonds})
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async find (email: string): Promise<User>  {
    const result = await pool.query(`
      SELECT * FROM users WHERE email = '${email}';
    `);
    return result.rows[0];
  };

  public static async authorize (token:string): Promise<User>  {
    const result = await pool.query(`
      SELECT * FROM users WHERE token = '${token}';
    `);
    return result.rows[0];
  };

  public static async updateToken (email: string, token:string): Promise<User>  {
    const result = await pool.query(`
      UPDATE users
      SET token = '${token}'
      WHERE email = '${email}'
      RETURNING *;
    `);
    return result.rows[0];
  };
}
