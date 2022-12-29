import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenceComponent } from './edit-expence.component';

describe('EditExpenceComponent', () => {
  let component: EditExpenceComponent;
  let fixture: ComponentFixture<EditExpenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExpenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
