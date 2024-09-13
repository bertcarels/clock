import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { timer } from 'rxjs';
import { currentTime, rotateClockHands } from './custom-operators/clock.operator';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent {
  readonly oneSecond = 1000;

  clockHandsTransform$ = timer(0, this.oneSecond).pipe(
    currentTime(),
    rotateClockHands()
  );

  // Array to store transformations for each dial line
  dialLinesTransform: string[] = [];

  constructor() {
    this.initializeDialLines();
  }

  initializeDialLines(): void {
    for (let i = -1; i <= 58; i++) {
      this.dialLinesTransform.push(`rotate(${6 * i}deg)`);
    }
  }
}