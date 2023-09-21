import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTableComponent } from './food-table.component';

describe('FoodTableComponent', () => {
  let component: FoodTableComponent;
  let fixture: ComponentFixture<FoodTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodTableComponent]
    });
    fixture = TestBed.createComponent(FoodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
