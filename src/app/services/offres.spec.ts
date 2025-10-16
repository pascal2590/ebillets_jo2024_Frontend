import { TestBed } from '@angular/core/testing';

import { Offres } from './offres';

describe('Offres', () => {
  let service: Offres;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Offres);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
