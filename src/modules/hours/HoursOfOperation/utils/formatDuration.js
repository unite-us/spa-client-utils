import { formatTimeOfDay } from '.';

function formatDuration(duration = {}) {
  const { opens_at, closes_at, opens, closes } = duration;
  if (duration.opens_at !== undefined) {
    return `${formatTimeOfDay(opens_at)} - ${formatTimeOfDay(closes_at)}`;
  }
  return `${formatTimeOfDay(opens)} - ${formatTimeOfDay(closes)}`;
}

export default formatDuration;
