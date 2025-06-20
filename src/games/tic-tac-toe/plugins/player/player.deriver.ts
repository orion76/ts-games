import { inject } from "@angular/core";
import { IPluginDefinition, IPluginDeriver, PluginDeriverBase } from "@orion76/plugin";

import { GAME_CONFIG_SERVICE } from "../../services/players-config.service";
import { IPlayerConfig, IConfigService } from "../../types";

export class PlayerDeriver extends PluginDeriverBase<IPlayerConfig> implements IPluginDeriver {
    protected override get derivatives(): IPlayerConfig[] {
        return this.configService.playerConfigs;
    }
    protected configService: IConfigService = inject(GAME_CONFIG_SERVICE);
    override getDerivativeId(derivative: IPlayerConfig): string {
        return derivative.playerId;
    }
    override getDerivativeDefinitions(basePluginDefinition: IPluginDefinition): IPlayerConfig[] {
        return this.derivatives.filter(d => d.type === basePluginDefinition.id)
    }
    override createPluginId(basePluginDefinition: IPluginDefinition, derivativeDef: IPlayerConfig) {
        return derivativeDef.type;
    }
}