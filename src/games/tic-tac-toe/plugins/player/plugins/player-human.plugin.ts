import { Plugin } from "@orion76/ng-plugin";
import { PlayerBase } from "../player-base";

import { PlayerDeriver } from "../player.deriver";
import { TTT_PLAYER_PLUGIN_TYPE } from "../plugin-manager";
import { IPlayer, IPlayerHuman } from "../types";

export const PLAYER_HUMAN_TYPE = 'player-human';

@Plugin({
    id: PLAYER_HUMAN_TYPE,
    type: TTT_PLAYER_PLUGIN_TYPE,
    label: 'Player',
    deriverClass: PlayerDeriver
})
export class PlayerHuman extends PlayerBase implements IPlayerHuman {

}
