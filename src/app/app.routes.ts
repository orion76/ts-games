import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { MainComponent } from './pages/main/main.component';
import { TickTakToeMainComponent } from '../games/tic-tac-toe/main.component';
import { TestStandPage } from './test-stands/page/test-stand.page';
import { TetrisMainComponent } from '../games/tetris/main.component';

export const routes: Routes = [
    {
        path: 'games',
        component: GamesComponent,
        children: [
            { path: 'tic-tac-toe', component: TickTakToeMainComponent },
            { path: 'tetris', component: TetrisMainComponent },
        ],
    },
    // { path: 'games/tic-tac-toe', component: TickTakToeMainComponent },
    { path: '', component: TestStandPage },
    // { path: '**', component: MainComponent },
];
