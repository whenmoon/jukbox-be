export default class Song {
  constructor(
    public song_id: string,
    public artist: string,
    public title: string,
    public album: string,
    public album_cover: string [],
    public duration: number
  ) {}
}

export const parseArray: any = (songList: any[]) => songList.map((song: any) => 
  song = new Song(song.id, song.artists[0].name, song.name, song.album.name, [song.album.images[1].url, song.album.images[2].url], song.duration_ms));
