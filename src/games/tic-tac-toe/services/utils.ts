import { inject } from "@angular/core";

import { TTT_PLAYER_PLUGIN_MANAGER } from "../plugins/player";
import { IPlayer } from "../plugins/player/types";
import { CHAR_EMPTY, TCellCoord, TFieldState } from "../types";
import { GAME_CONFIG_SERVICE } from "./players-config.service";

export function getEmptyCells(state: TFieldState): TCellCoord[] {
    const emptyCells: TCellCoord[] = [];
    state.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === CHAR_EMPTY) {
                emptyCells.push([x, y]);
            }
        })
    });
    return emptyCells;
}


export function getPlayers() {
    const pluginManager = inject(TTT_PLAYER_PLUGIN_MANAGER);
    const configService = inject(GAME_CONFIG_SERVICE);
    const ids = configService.playerConfigs.map(({ playerId }) => playerId)
    return ids.map((id) => pluginManager.getInstance(id))
}

export function getHumanPlayers(): IPlayer[] {
    const pluginManager = inject(TTT_PLAYER_PLUGIN_MANAGER);
    const humanId = pluginManager.getDefinitions().find(d => d.type === 'player')?.id;
    if (!humanId) {
        throw new Error('Human player not found!');
    }
    return pluginManager.getDefinitions().filter((d) => d.type === 'player').map(({ id }) => pluginManager.getInstance(id));
}

export function getRandomNumber(from: number, to: number) {
    return from + Math.round(Math.random() * to);
}

export function getRandomIndex(arr: unknown[]): number {
    return arr.length > 0 ? getRandomNumber(0, arr.length - 1) : -1;
}

export function getRandomItem<T>(arr: T[]): T {
    const index = getRandomIndex(arr);
    return arr[index];
}
