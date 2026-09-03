const formatTime = (seconds: number, detailed: boolean = false) => {
  if (seconds >= 3600) {
    return displayInHours(seconds, detailed);
  }

  if (seconds >= 60) {
    return displayInMinutes(seconds, detailed);
  }

  return displayInSeconds(seconds, detailed);
};

const displayInHours = (seconds: number, detailed: boolean = false) => {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (detailed) {
    const hoursDisplay = `${hours} Hour${pluralize(hours)}`;
    const minutesDisplay = `${remainingMinutes} Minute${pluralize(remainingMinutes)}`;
    const secondsDisplay = `${remainingSeconds} Second${pluralize(remainingSeconds)}`;
    return `${hoursDisplay} : ${minutesDisplay} : ${secondsDisplay}`;
  }

  return `${padWithZero(hours)}:${padWithZero(remainingMinutes)}:${padWithZero(remainingSeconds)}`;
};

const displayInMinutes = (seconds: number, detailed: boolean = false) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (detailed) {
    const minutesDisplay = `${minutes} Minute${pluralize(minutes)}`;
    const secondsDisplay = `${remainingSeconds} Second${pluralize(remainingSeconds)}`;
    return `${minutesDisplay} : ${secondsDisplay}`;
  }

  return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
};

const displayInSeconds = (seconds: number, detailed: boolean = false) => {
  if (detailed) {
    const secondsDisplay = `${seconds} Second${pluralize(seconds)}`;
    return `${secondsDisplay}`;
  }

  return `00:${padWithZero(seconds)}`;
};

const pluralize = (count: number) => {
  return count === 1 ? "" : "s";
};

const padWithZero = (value: number) => {
  return value.toString().padStart(2, "0");
};

export default formatTime;
