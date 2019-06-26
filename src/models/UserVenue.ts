import pool from '../config/db';

export default class UserVenue {
  constructor(
    public userEmail: string,
    public venueName: string,
    public tickets: number,
    public diamonds: number,
    private id?: string
  ) {}

  public static async create (userVenue: UserVenue): Promise<UserVenue> {
    const result = await pool.query(`
      INSERT INTO user_venues (user_id, venue_id, tickets, diamonds)
      VALUES ('${userVenue.userEmail}', '${userVenue.venueName}', '${userVenue.tickets}', '${userVenue.diamonds}')
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async find (userEmail: string, venueName: string): Promise<UserVenue>  {
    const result = await pool.query(`
      SELECT * FROM user_venues WHERE user_id = '${userEmail}' AND venue_id = '${venueName}';
    `);
    return result.rows[0];
  };
}