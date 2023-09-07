export const fetchSong = (songId, songCallback) => {
  window.DZ.api(`/track/${songId}`, songCallback);
};
