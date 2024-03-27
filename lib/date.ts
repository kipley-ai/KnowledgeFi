export const getNextDayAtMidnight = (): string => {
  const now = new Date();
  const nextDay = new Date(now.getTime());
  nextDay.setDate(now.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  return nextDay.toString();
};

export const getRemainingTimeString = (
  futureTime: string,
  taskFrequency: string,
): string => {
  const now = new Date();
  const future = new Date(futureTime + "z");

  const diff = future.getTime() - now.getTime();

  if (diff <= 0) {
    return "Task has ended";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    if (taskFrequency === "daily") {
      return "Ends in 23 hrs 59 mins";
    }
    return `Ends in ${days} day${days > 1 ? "s" : ""} ${hours} hr${hours > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `Ends in ${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`;
  } else {
    return `Ends in ${minutes} min${minutes > 1 ? "s" : ""}`;
  }
};
