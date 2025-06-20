import { PLAYER_BOT_TYPE, PLAYER_HUMAN_TYPE } from "./plugins/player";
import { CHAR_CROSS, CHAR_ZERO, IGameConfig, PLAYER_ONE_ID, PLAYER_TWO_ID } from "./types";




export const gameConfig: IGameConfig = {
    players: [
        { playerId: PLAYER_ONE_ID, name: 'Player 1', type: PLAYER_HUMAN_TYPE, char: CHAR_CROSS, charColor: '#ff9d00' },
        { playerId: PLAYER_TWO_ID, name: 'Player 2', type: PLAYER_BOT_TYPE, char: CHAR_ZERO, charColor: '#0099ff' },
    ]
}