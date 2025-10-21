import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Panier } from './panier';

describe('Panier', () => {
  let component: Panier;
  let fixture: ComponentFixture<Panier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Panier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
