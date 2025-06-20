import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { CHAR_CROSS, CHAR_EMPTY, CHAR_ZERO, ICharShow } from "../../types";


@Component({
  selector: 'ttt-cell',
  standalone: true,
  template: `

    @let charData = char(); 
    @switch (charData.char) {
      @case (char_EMPTY) {
        
      }
      @case (char_CROSS) {
        <svg  class="char"  viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="10" x2="50" y2="50" [attr.stroke]="charData.charColor" [attr.stroke-width]="charWidth()" stroke-linecap="round" />
          <line x1="50" y1="10" x2="10" y2="50" [attr.stroke]="charData.charColor" [attr.stroke-width]="charWidth()" stroke-linecap="round" />
        </svg>
      }
      @case (char_ZERO) {
        <svg class="char" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="22" [attr.stroke]="charData.charColor" [attr.stroke-width]="charWidth()" fill="none"/>
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