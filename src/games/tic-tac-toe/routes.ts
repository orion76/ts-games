import { Route } from "@angular/router";
import { PlayConfigFormComponent } from "./components/play-config-form/play-config-form.component";
import { TickTakToeMainComponent } from "./main.component";

export const gameOneRoute: Route = {
    path: 'tick-tac-toe', component: TickTakToeMainComponent,
    children: [
        { path: 'config', component: PlayConfigFormComponent },
    ]
}
