import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-games',
  imports: [RouterOutlet],
  template: `
    <p>
      games works!
    </p>
        <router-outlet />
  `,
  styleUrl: './games.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent {

}
