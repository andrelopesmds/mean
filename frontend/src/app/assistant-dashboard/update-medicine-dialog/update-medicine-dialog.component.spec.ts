import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicineDialogComponent } from './update-medicine-dialog.component';

describe('UpdateMedicineDialogComponent', () => {
  let component: UpdateMedicineDialogComponent;
  let fixture: ComponentFixture<UpdateMedicineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMedicineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMedicineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
