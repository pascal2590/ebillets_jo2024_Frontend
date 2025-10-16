import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Offres } from './offres';

describe('Offres', () => {
  let component: Offres;
  let fixture: ComponentFixture<Offres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Offres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Offres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
