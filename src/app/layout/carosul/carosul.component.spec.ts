import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarosulComponent } from './carosul.component';

describe('CarosulComponent', () => {
  let component: CarosulComponent;
  let fixture: ComponentFixture<CarosulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarosulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarosulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
