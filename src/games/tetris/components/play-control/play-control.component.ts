import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PLAY_CONTROL_SERVICE } from '../../services/play-control.service';
import { UEvents, TEventIntervals } from '../../types/common';

interface IControlButtonData {
    event: UEvents;
    icon: string;
    elementClass: string;
}

@Component({
    selector: 'tetris-play-control',
    standalone: true,
    template: `
<div class="control-buttons">
    @for(item of eventsData; track $index){
        <button 
            [class]="buttonClass(item.event)" 
            mat-fab 
            (click)="service.emitPlayEvent(item.event)">
            <mat-icon>{{item.icon}}</mat-icon>
        </button>
    }
</div>
    `,
    styleUrl: 'play-control.componen.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatIconModule],
})
export class TetrisPlayControl {
    eventsData: IControlButtonData[] = [
        { event: 'move_down', elementClass: 'move-down', icon: 'arrow_circle_down' },
        { event: 'move_left', elementClass: 'move-left', icon: 'chevron_left' },
        { event: 'move_right', elementClass: 'move-right', icon: 'chevron_right' },
        { event: 'rotate_left', elementClass: 'rotate-left', icon: 'undo' },
        { event: 'rotate_right', elementClass: 'rotate-right', icon: 'redo' },
    ];
    service = inject(PLAY_CONTROL_SERVICE);

    handleEvent(event: UEvents) {
        this.service.emitPlayEvent(event);
    }
    buttonClass(event: UEvents) {
        const data = this.eventsData.find((item) => item.event === event);
        if (!data) {
            throw new Error(`Play-event with name: ${event} not fount.`)
        }
        return `play-button ${data.elementClass}`
    }
}
