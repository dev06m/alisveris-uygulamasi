import { TestBed } from '@angular/core/testing';

import { PreventUnasavedChangesGuard } from './prevent-unasaved-changes.guard';

describe('PreventUnasavedChangesGuard', () => {
  let guard: PreventUnasavedChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventUnasavedChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
