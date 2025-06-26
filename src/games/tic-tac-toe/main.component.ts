import { ChangeDetectionStrategy, Component, inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { TTTPlayingField } from "./components/playing-field/playing-field.component";
import { gameConfig } from './config';
import { GAME_SERVICE, GameService } from './services/game-management/game.service';
import { GAME_STORE, GameStore } from './services/store/game.store';
import { importPlugins, providePluginManager } from '@orion76/ng-plugin';
import { TTTPlayControl } from './components/play-control/play-control.component';
import { TTTPlayState } from './components/play-state/play-state.component';
import { Bot, PlayerHuman, TTT_PLAYER_PLUGIN_MANAGER, TTT_PLAYER_PLUGIN_TYPE } from './plugins/player';
import { PlayerDiscoveryDecorator } from './plugins/player/plugin-discovery-decorator';
import { STEP_CHECK_SERVICE, StepCheckService } from './services/game-management/step-check.service';
import { ConfigService, GAME_CONFIG_SERVICE } from './services/players-config.service';
import { IGameConfig, TFieldState } from './types';
import { TTT_STRATEGIES_PLUGIN_TYPE, TTT_STRATEGIES_PLUGIN_MANAGER } from './modules/player-bot/strategy/plugin-manager';
import { StrategySimpleRandom } from './modules/player-bot/strategy/plugins/strategy-simple-random.plugin';


importPlugins(Bot, PlayerHuman);
importPlugins(StrategySimpleRandom);
export const GAME_CONFIG = new InjectionToken<IGameConfig>('GAME_CONFIG');

@Component({
  selector: 'game--tick-tack-toe--main',
  template: `
    <ttt-play-control class="play-control" />
    <ttt-play-state class="play-state" />
    <ttt-playing-field class="play-field" />
    <!-- <ttt-play-log></ttt-play-log> -->
  `,
  styleUrl: 'main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TTTPlayingField, TTTPlayState, TTTPlayControl],
  providers: [
    { provide: STEP_CHECK_SERVICE, useClass: StepCheckService },
    { provide: GAME_SERVICE, useClass: GameService },
    { provide: GAME_CONFIG, useValue: gameConfig },
    { provide: GAME_CONFIG_SERVICE, useClass: ConfigService },
    { provide: GAME_STORE, useClass: GameStore },
    providePluginManager(TTT_PLAYER_PLUGIN_TYPE, TTT_PLAYER_PLUGIN_MANAGER, {
      pluginDiscoveryDecoratorCls: PlayerDiscoveryDecorator
    }),
    providePluginManager(TTT_STRATEGIES_PLUGIN_TYPE, TTT_STRATEGIES_PLUGIN_MANAGER),

  ],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'game-page game-tick-tack-toe--main' }
})
export class TickTakToeMainComponent {
  service = inject(GAME_SERVICE);
  // constructor() {

  //   const a = [1, 2, 3, 5, 8, 0];
  //   const b = [2, 3, 4, 7, 0, 9];
  //   const result1 = arraysIntersection(a, b);
  //   const result2 = arraysDifference(a, b);

  //   console.log('+ A', a)
  //   console.log('+ B', b)
  //   console.log('++ TEST1', result1)
  //   console.log('++ TEST2', result2)

  // }
}
