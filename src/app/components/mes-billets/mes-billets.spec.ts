import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBillets } from './mes-billets';

describe('MesBillets', () => {
  let component: MesBillets;
  let fixture: ComponentFixture<MesBillets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesBillets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesBillets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
