import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayConfigFormComponent } from './play-config-form.component';

describe('PlayConfigFormComponent', () => {
  let component: PlayConfigFormComponent;
  let fixture: ComponentFixture<PlayConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
