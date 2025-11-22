import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOffreComponent } from './modifier-offre';

describe('ModifierOffreComponent', () => {
  let component: ModifierOffreComponent;
  let fixture: ComponentFixture<ModifierOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierOffreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
