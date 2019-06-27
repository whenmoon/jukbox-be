import { VenueSong } from '../models';

export function toCapitalCase (namespace: string) {
  return namespace.slice(1, 2).toUpperCase() + namespace.slice(2);
};

export function sortPlaylist (playlist: Array<VenueSong>) {
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

