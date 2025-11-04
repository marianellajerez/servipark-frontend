import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration',
  standalone: true,
})
export class FormatDurationPipe implements PipeTransform {

  private readonly MINS_PER_WEEK = 60 * 24 * 7;
  private readonly MINS_PER_DAY = 60 * 24;
  private readonly MINS_PER_HOUR = 60;

  transform(totalMinutes: number | null): string {

    if (totalMinutes === null || totalMinutes < 0) {
      return 'N/A';
    }

    if (totalMinutes === 0) {
      return '0 min';
    }

    const weeks = Math.floor(totalMinutes / this.MINS_PER_WEEK);
    let remainingMinutes = totalMinutes % this.MINS_PER_WEEK;

    const days = Math.floor(remainingMinutes / this.MINS_PER_DAY);
    remainingMinutes = remainingMinutes % this.MINS_PER_DAY;

    const hours = Math.floor(remainingMinutes / this.MINS_PER_HOUR);

    const minutes = remainingMinutes % this.MINS_PER_HOUR;

    const parts: string[] = [];
    if (weeks > 0) {
      parts.push(`${weeks} sem`);
    }
    if (days > 0) {
      parts.push(`${days} d`);
    }
    if (hours > 0) {
      parts.push(`${hours} h`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} min`);
    }

    return parts.join(', ');
  }
}