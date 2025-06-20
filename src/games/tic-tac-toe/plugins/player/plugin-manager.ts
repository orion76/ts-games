import { InjectionToken } from '@angular/core';
import { IPluginManager } from '@orion76/plugin';
import { IPlayer } from './types';

export const TTT_PLAYER_PLUGIN_TYPE = 'TTT_PLAYER_PLUGIN_TYPE'
export const TTT_PLAYER_PLUGIN_MANAGER = new InjectionToken<IPluginManager<IPlayer>>('TTT_PLAYER_PLUGIN_MANAGER');