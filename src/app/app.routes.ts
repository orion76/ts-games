import { Routes } from '@angular/router';
import { TickTakToeMainComponent } from '../games/tiс-taс-toe/main.component';
import { GamesComponent } from './pages/games/games.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    {
        path: 'games', component: GamesComponent,
        children: [
            {
                path: 'tic-tac-toe', component: TickTakToeMainComponent
                // children: [
                //     { path: 'config', component: PlayConfigFormComponent },
                // ]
            }
        ]
    },
    // { path: 'games/tic-tac-toe', component: TickTakToeMainComponent },
    { path: '', component: MainComponent },
    // { path: '**', component: MainComponent },
];
