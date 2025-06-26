import { patchState, signalStoreFeature, withMethods, withState } from "@ngrx/signals";
import { IBotState } from "./types";
import { STRATEGY_ID_SIMPLE_SMART } from "./strategy/plugins/strategy-simple-smart.plugin";

export function withBotState() {
    return signalStoreFeature(
        withState<IBotState>({ botStrategyId: STRATEGY_ID_SIMPLE_SMART }),
        withMethods((store) => ({
            setBotStrategy(strategyId: string): void {
                patchState(store, () => ({ botStrategyId: strategyId }))
            }
        }))
    );
}