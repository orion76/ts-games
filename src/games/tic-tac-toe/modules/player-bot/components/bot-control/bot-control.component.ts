/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { IStrategyInfo, PLAYER_BOT_SERVICE, PlayerBotService } from "../../bot.service";
@Component({
    selector: 'ttt-bot-control',
    standalone: true,
    template: `
  <mat-select [(value)]="selectedStrategyId" (selectionChange)="selectStrategy()">
    @for (strategy of strategies; track strategy.id) {
      <mat-option [value]="strategy.id">{{strategy.label}}</mat-option>
    }
  </mat-select>
    `,
    styleUrl: 'bot-control.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatSelectModule],
    providers: [{ provide: PLAYER_BOT_SERVICE, useClass: PlayerBotService }]
})
export class TTTBotControl implements OnInit {
    service = inject(PLAYER_BOT_SERVICE)
    strategies!: IStrategyInfo[]
    selectedStrategyId!: string;

    ngOnInit(): void {
        this.strategies = this.service.getStrategiesList();
        this.selectedStrategyId = this.strategies[0].id;
    }
    selectStrategy() {
        this.service.selectStrategy(this.selectedStrategyId)
    }
}