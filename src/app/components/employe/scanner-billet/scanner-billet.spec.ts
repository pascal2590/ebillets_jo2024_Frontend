import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerBillet } from './scanner-billet';

describe('ScannerBillet', () => {
  let component: ScannerBillet;
  let fixture: ComponentFixture<ScannerBillet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerBillet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannerBillet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
