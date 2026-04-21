import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixRainComponent } from './matrix-rain';

describe('MatrixRain', () => {
  let component: MatrixRainComponent;
  let fixture: ComponentFixture<MatrixRainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixRainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrixRainComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
