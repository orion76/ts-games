import { signal } from "@angular/core";
import { NgPluginBase } from "@orion76/ng-plugin";
import { IStepData, TCellCoord } from "../../types";
import { IPlayer, IPlayerDefinition } from "./types";



export abstract class PlayerBase<D extends IPlayerDefinition = IPlayerDefinition> extends NgPluginBase<D> implements IPlayer {
    readonly onStep = signal<IStepData | undefined>(undefined);
    readonly stepAvailable = signal<boolean>(false)
    setStepAvailable(value: boolean) {
        this.stepAvailable.set(value);
    }
    override get label(): string {
        return this.definition.name;
    }
    get char() {
        return this.definition.char;
    }
    step(cell: TCellCoord): void {
        const { playerId } = this;
        this.onStep.set({ cell, playerId, status: 'awaiting' });
    }
    get playerId() {
        return this.definition.playerId;
    }
}