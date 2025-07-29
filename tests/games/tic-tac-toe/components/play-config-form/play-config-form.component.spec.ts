/**
 * Test author: copilot
 * Model: GitHub Copilot (GPT-4o, July 2025)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayConfigFormComponent } from '../../../../../src/games/tic-tac-toe/components/play-config-form/play-config-form.component';

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
    const result = !!component;
    expect(result).toBeTrue();
  });
});
