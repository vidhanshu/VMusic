export const formattedTime = (seconds: number) => {
  if (!seconds) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
};

export const percentageToSeconds = (percentage: number, duration: number) => {
  return (percentage * duration) / 100;
};
