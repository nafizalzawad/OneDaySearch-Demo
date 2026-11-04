import { TierId } from './types';

export interface DueTimeResult {
  dueTime: Date;
  dueTimeISO: string;
  formatted: string; // e.g. "Thu 3:42 PM ET"
  formattedLong: string; // e.g. "Thursday, Nov 5 · 3:42 PM ET"
  searchStartsText?: string;
  hoursAdded: number;
}

/**
 * Single source of truth for due times across customer, provider, and admin.
 * Maryland, Virginia, and DC operate strictly on Eastern Time (ET).
 */
export function computeDueTime(
  tier: TierId,
  now: Date = new Date(),
  isAfterHours: boolean = false
): DueTimeResult {
  const durationHours = tier === '6h' ? 6 : tier === '12h' ? 12 : 24;

  let baseTime = new Date(now.getTime());
  let searchStartsText: string | undefined;

  if (isAfterHours) {
    // If after-hours is active, the courthouse clock starts at 9:00 AM ET next business morning
    // For demo purposes, we advance to next 9:00 AM
    const nextMorning = new Date(baseTime);
    nextMorning.setHours(9, 0, 0, 0);
    if (baseTime.getHours() >= 9) {
      nextMorning.setDate(nextMorning.getDate() + 1);
    }
    baseTime = nextMorning;
    searchStartsText = 'Search starts 9:00 AM ET';
  }

  const dueTime = new Date(baseTime.getTime() + durationHours * 60 * 60 * 1000);

  // Format to Eastern Time with strict plain-spoken English
  const dayName = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'America/New_York',
  }).format(dueTime);

  const monthDay = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  }).format(dueTime);

  const fullDayName = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: 'America/New_York',
  }).format(dueTime);

  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  }).format(dueTime);

  const formatted = `${dayName} ${timeString} ET`;
  const formattedLong = `${fullDayName}, ${monthDay} · ${timeString} ET`;

  return {
    dueTime,
    dueTimeISO: dueTime.toISOString(),
    formatted,
    formattedLong,
    searchStartsText,
    hoursAdded: durationHours,
  };
}

/**
 * Calculates internal provider deadline, maintaining a safety margin
 * (e.g., 2 hours prior to customer guarantee for standard 24h, 1 hour for rush).
 */
export function computeInternalDueTime(
  customerDueTime: Date,
  tier: TierId
): { internalDueTime: Date; formatted: string } {
  const bufferHours = tier === '6h' ? 0.75 : tier === '12h' ? 1.5 : 2.5;
  const internalDueTime = new Date(customerDueTime.getTime() - bufferHours * 3600 * 1000);

  const dayName = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'America/New_York',
  }).format(internalDueTime);

  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  }).format(internalDueTime);

  return {
    internalDueTime,
    formatted: `${dayName} ${timeString} ET (Internal SLA)`,
  };
}

/**
 * Formats countdown string in JetBrains Mono format: "14h 22m 18s" or "02:44:12"
 */
export function formatCountdown(targetDate: Date | string, fromDate: Date = new Date()): string {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const diffMs = target.getTime() - fromDate.getTime();

  if (diffMs <= 0) {
    return '00h 00m 00s';
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}
