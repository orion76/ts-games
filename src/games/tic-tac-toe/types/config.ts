import { UChar } from "./state";

export const PLAYER_ONE_ID = 'player-1';
export const PLAYER_TWO_ID = 'player-2';

export type TPlayerIds = typeof PLAYER_ONE_ID | typeof PLAYER_TWO_ID;

export interface IGameConfig {
    players: IPlayerConfig[]
}

export interface ICharShow {
    char: UChar;
    charColor: string;
}

export interface IPlayerConfig extends ICharShow {
    playerId: TPlayerIds;
    type: string;
    name: string;
}