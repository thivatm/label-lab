import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLabelComponent } from './modal-label.component';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('ModalLabelComponent', () => {
  let component: ModalLabelComponent;
  let fixture: ComponentFixture<ModalLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          ModalLabelComponent
        ],
        imports: [ 
            FormsModule,
            MatDialogModule
        ],
        providers: [
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('Should create Modal Dialog component', () => {
    expect(component).toBeTruthy();
  });
});
