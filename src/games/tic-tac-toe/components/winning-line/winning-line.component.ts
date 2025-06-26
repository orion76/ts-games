import { ChangeDetectionStrategy, Component, computed, input, OnInit, ViewEncapsulation } from "@angular/core";
import { TCellCoord } from "../../types";


interface ISvgLineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const LINES: [TCellCoord, TCellCoord][] = [
  [[0, 0], [2, 0]],
  [[0, 1], [2, 1]],
  [[0, 2], [2, 2]],
  [[0, 0], [0, 2]],
  [[1, 0], [1, 2]],
  [[2, 0], [2, 2]],
  [[0, 0], [2, 2]],
  [[2, 0], [0, 2]],
];

@Component({
  selector: 'ttt-winning-line',
  standalone: true,
  template: `
    <svg  class="svg-line"  xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox">
          <line [attr.x1]="coords.x1" [attr.y1]="coords.y1" [attr.x2]="coords.x2" [attr.y2]="coords.y2" />
    </svg>
  `,
  styles: `
  
    :host {
        position: absolute;
        height: 100%;
        width: 100%;

        .svg-line {
            stroke: black;
            stroke-width: 2;
            stroke-linecap: round;
            filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 1));
        }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TTTWinningLine implements OnInit {
  viewBox = [0, 0, 90, 90].join(' ');
  lineIndex = input.required<number>();
  coords!: ISvgLineCoords;


  private calculateCoordinate(line: TCellCoord[], x: number, y: number) {
    return (line[x][y] + .5) * 30;
  }

  ngOnInit(): void {
    const lineIndex = this.lineIndex();
    const line = LINES[lineIndex];
    this.coords = {
      x1: this.calculateCoordinate(line, 0, 0),
      y1: this.calculateCoordinate(line, 0, 1),
      x2: this.calculateCoordinate(line, 1, 0),
      y2: this.calculateCoordinate(line, 1, 1),
    }

    if (lineIndex > 6) { // Diagonals
      this.coords.x1 += 5
      this.coords.y1 -= 5
      this.coords.x2 -= 5
      this.coords.y2 += 5

    } else if (lineIndex > 5) {// Gorisontal
      this.coords.x1 -= 5
      this.coords.y1 -= 5
      this.coords.x2 += 5
      this.coords.y2 += 5

    } else if (lineIndex > 2) {// Gorisontal
      this.coords.y1 -= 10
      this.coords.y2 += 10

    } else {// Vertical

      this.coords.x1 -= 10
      this.coords.x2 += 10
    }
  }
}