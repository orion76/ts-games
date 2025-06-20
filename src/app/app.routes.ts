import { Routes } from '@angular/router';
import { TickTakToeMainComponent } from '../games/tic-tac-toe/main.component';

export const routes: Routes = [
    { path: '', component: TickTakToeMainComponent },
    { path: 'game/tick-tac-toe', component: TickTakToeMainComponent },
    { path: '**', component: TickTakToeMainComponent },
];
