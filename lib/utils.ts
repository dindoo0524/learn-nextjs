export function formatToTimeAgo(date: string): string {
  const now = new Date().getTime();
  const time = new Date(date).getTime();
  const diffInMs = time - now;

  const minuteInMs = 1000 * 60;
  const hourInMs = minuteInMs * 60;
  const dayInMs = hourInMs * 24;

  const formatter = new Intl.RelativeTimeFormat("ko");

  if (Math.abs(diffInMs) < hourInMs) {
    const diffInMinutes = Math.round(diffInMs / minuteInMs);
    return formatter.format(diffInMinutes, "minutes");
  } else if (Math.abs(diffInMs) < dayInMs) {
    const diffInHours = Math.round(diffInMs / hourInMs);
    return formatter.format(diffInHours, "hours");
  } else {
    const diffInDays = Math.round(diffInMs / dayInMs);
    return formatter.format(diffInDays, "days");
  }
}
