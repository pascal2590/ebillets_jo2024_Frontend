import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement } from './paiement';

describe('Paiement', () => {
  let component: Paiement;
  let fixture: ComponentFixture<Paiement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paiement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paiement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
