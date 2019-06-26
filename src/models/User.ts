import pool from '../config/db';

export default class User {
  constructor(
    public email: string,
    public token: string,
    public name: string,
    public diamonds: number,
<<<<<<< HEAD
    private id?: number
=======
    private id?:number
>>>>>>> fbe84e886c3d966fae319773c14ed9c4e73a17b1
  ) {}

  public static async create (user: User): Promise<User> {
    const result = await pool.query(`
      INSERT INTO users (email, token, name, diamonds)
      VALUES ('${user.email}', '${user.token}', '${user.name}', '${user.diamonds}')
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
