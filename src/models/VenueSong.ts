import pool from '../services/db';

export default class VenueSong {
  constructor(
    public song: string,
    public userEmail: string,
    public venueName: string,
    public diamonds: number,
    public submission_time: string,
    public currentlyPlaying: boolean,
    public lockedIn: boolean,
    private id?: number
  ) {}

  public static async create (song: string, userEmail: string, venueName: string): Promise<VenueSong> {
    const result = await pool.query(`
      INSERT INTO venue_songs (song, user_id, venue_id, diamonds, submission_time)
      VALUES ('${song}', '${userEmail}', '${venueName}', 0, '${String(new Date(Date.now()))}')
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async promote (song: string): Promise<VenueSong>  {
    const result = await pool.query(`
      UPDATE venue_songs
      SET diamonds = 5
      WHERE song = '${song}'
      RETURNING *;
    `);
    return result.rows[0];
  };

  public static async getAll (venueName: string): Promise<Array<VenueSong>>  {
    const result = await pool.query(`
      SELECT * FROM venue_songs WHERE venue_id = '${venueName}';
    `);
    return result.rows;
  };

  public static async sortPlaylist (playlist: Array<VenueSong>): Promise<Array<VenueSong>> {
    playlist.sort((a: VenueSong, b: VenueSong) => {
      const aDate = new Date (a.submission_time);
      const bDate = new Date (b.submission_time);
      return aDate.getTime() - bDate.getTime();
    });
    playlist.sort((a: VenueSong, b: VenueSong) => {
      return b.diamonds - a.diamonds;
    });
    playlist.sort((a: VenueSong, b: VenueSong) => {
      return (a.lockedIn === b.lockedIn) ? 0 : a.lockedIn ? -1 : 1;
    });
    playlist.sort((a: VenueSong, b: VenueSong) => {
      return (a.currentlyPlaying === b.currentlyPlaying) ? 0 : a.currentlyPlaying ? -1 : 1;
    });
    return playlist;
};
}
