import pool from '../services/db';

export default class UserVenue {
  constructor(
    public userEmail: string,
    public venueName: string,
    public tickets: number,
    public diamonds: number,
    private id?: string
  ) {}

  public static async create (userEmail: string, venueName: string, ticket_default_no: number): Promise<UserVenue> {
    const result = await pool.query(`
      INSERT INTO user_venues (user_id, venue_id, tickets, diamonds)
      VALUES ('${userEmail}', '${venueName}', ${ticket_default_no}, 0)
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async find (userEmail: string, venueName: string): Promise<UserVenue>  {
    const result = await pool.query(`
      SELECT * FROM user_venues
      WHERE user_id = '${userEmail}' AND venue_id = '${venueName}';
    `);
    return result.rows[0];
  };

  public static async decrementTickets (userEmail: string, venueName: string): Promise<UserVenue> {
    const result = await pool.query(`
      UPDATE user_venues
      SET tickets = tickets - 1
      WHERE user_id = '${userEmail}' AND venue_id = '${venueName}';
    `);
    return result.rows[0];
  };
}
