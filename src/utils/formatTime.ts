// TODO: Return more detailed time formats (e.g., hours, days) if the input seconds exceed certain thresholds.
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

export default formatTime;
