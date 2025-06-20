import { inject } from "@angular/core";
import { PluginDiscoveryDecoratorDefault } from "@orion76/ng-plugin";
import { PluginException } from "@orion76/plugin";
import { GAME_CONFIG } from "../../main.component";
import { IPlayerConfig, TPlayerIds } from "../../types";

export class PlayerDiscoveryDecorator extends PluginDiscoveryDecoratorDefault {
    config = inject(GAME_CONFIG)

    protected override getBasePluginId(id: TPlayerIds): string {
        return this.getConfig(id).type
    }

    protected override getDerivativeId(id: TPlayerIds): string {
        return id
    }

    private getConfig(pluginId: string): IPlayerConfig {
        const config = this.config.players.find((c) => c.playerId === pluginId);
        if (!config) {
            throw new PluginException(this.decorated.type, pluginId, 'The player\'s config was not found.')
        }
        return config
    }

}