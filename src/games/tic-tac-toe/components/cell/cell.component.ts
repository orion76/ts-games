import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { CHAR_CROSS, CHAR_EMPTY, CHAR_ZERO, ICharShow } from "../../types";


@Component({
  selector: 'ttt-cell',
  standalone: true,
  template: `

    @let charData = char(); 
    @switch (charData.char) {
      @case (char_EMPTY) {
        <svg  class="char"  viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"></svg>
      }
      @case (char_CROSS) {
        <svg  class="char"  viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="10" x2="50" y2="50" stroke-linecap="round" [attr.stroke]="charData.charColor" [attr.stroke-width]="charWidth()" />
          <line x1="50" y1="10" x2="10" y2="50" stroke-linecap="round" [attr.stroke]="charData.charColor" [attr.stroke-width]="charWidth()" />
        </svg>
      }
      @case (char_ZERO) {
        <svg class="char" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="22" fill="none" [attr.stroke]="charData.charColor" [attr.stroke-width]="charWidth()"/>
        </svg>
             }
    }
    `,
  styleUrl: 'cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TTTCell {
  readonly char_EMPTY = CHAR_EMPTY;
  readonly char_CROSS = CHAR_CROSS;
  readonly char_ZERO = CHAR_ZERO;

  readonly charWidth = input<number>(5)
  readonly char = input.required<ICharShow>();
}