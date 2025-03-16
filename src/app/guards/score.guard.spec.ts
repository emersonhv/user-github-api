import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ScoreGuard } from '@app/guards/score.guard';

describe('ScoreGuard', () => {
  let guard: ScoreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScoreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
