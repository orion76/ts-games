import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export interface IConfigFormItem {
  title: string;
  subtitle?: string;
  component: Type<any>,
  inputs: Record<string, unknown>
}


@Component({
  selector: 'play-config-form',
  imports: [
    NgComponentOutlet,
    MatCardModule,
    MatButtonModule
  ],
  template: `
  @for( config of configs; track $index){
<mat-card appearance="outlined">

<mat-card-header>
    <mat-card-title>{{config.title}}</mat-card-title>
    @if(config.subtitle){
      <mat-card-subtitle>{{config.subtitle}}</mat-card-subtitle>
    }
  </mat-card-header>

  <mat-card-content>
    <ng-container *ngComponentOutlet="config.component; inputs:config.inputs;" />
  </mat-card-content>

  <mat-card-actions>
    <button type="button" mat-button>Save</button>
    <button type="button" mat-button color="secondary">Cancel</button>
  </mat-card-actions>

</mat-card>
  }
  `,
  styleUrl: './play-config-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PlayConfigFormComponent {
  configs: IConfigFormItem[] = [];
}
