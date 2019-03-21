import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLabelComponent } from './modal-label.component';

describe('ModalLabelComponent', () => {
  let component: ModalLabelComponent;
  let fixture: ComponentFixture<ModalLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
