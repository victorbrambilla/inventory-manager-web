import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitTableComponent } from './exit-table.component';

describe('ExitTableComponent', () => {
  let component: ExitTableComponent;
  let fixture: ComponentFixture<ExitTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitTableComponent]
    });
    fixture = TestBed.createComponent(ExitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
