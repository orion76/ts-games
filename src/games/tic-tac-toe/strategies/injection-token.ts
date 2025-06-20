import { InjectionToken } from "@angular/core";
import { IGameStrategy } from "../types/common";

export const BOT_STRATEGY = new InjectionToken<IGameStrategy>('BOT_STRATEGY')