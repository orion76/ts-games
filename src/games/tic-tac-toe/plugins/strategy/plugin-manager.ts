import { InjectionToken } from '@angular/core';
import { IPluginManager } from '@orion76/plugin';
import { IGameStrategy } from '../../types/common';

export const TTT_STRATEGIES_PLUGIN_TYPE = 'TTT_STRATEGIES_PLUGIN_TYPE'
export const TTT_STRATEGIES_PLUGIN_MANAGER = new InjectionToken<IPluginManager<IGameStrategy>>('TTT_STRATEGIES_PLUGIN_MANAGER');