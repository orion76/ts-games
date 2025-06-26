import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { BlockPagesComponent } from './modules/block-pages/components/block-pages/block-pages.component';
import { BlockPageComponent } from './modules/block-pages/components/block-page/block-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatMenuModule,
    BlockPagesComponent,
    BlockPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ts-games';
}
