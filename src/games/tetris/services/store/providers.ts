import { InjectionToken, Signal, Provider } from "@angular/core";
import { TField } from "../../types";
import { GAME_STORE } from "./game.store";
import { TGameStore } from "./types";

export const TETRIS_FIELD_STATE = new InjectionToken<Signal<TField>>('TETRIS_FIELD_STATE');

export function tetrisFieldProvider(): Provider {
    return {
        provide: TETRIS_FIELD_STATE,
        useFactory: (store: TGameStore): Signal<TField | undefined> => store.field,
        deps: [GAME_STORE],
    }
}