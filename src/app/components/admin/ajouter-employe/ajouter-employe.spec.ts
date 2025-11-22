import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmploye } from './ajouter-employe';

describe('AjouterEmploye', () => {
  let component: AjouterEmploye;
  let fixture: ComponentFixture<AjouterEmploye>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterEmploye]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterEmploye);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
