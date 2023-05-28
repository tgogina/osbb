import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvertisementModalComponent } from './add-advertisement-modal.component';

describe('AddAdvertisementModalComponent', () => {
  let component: AddAdvertisementModalComponent;
  let fixture: ComponentFixture<AddAdvertisementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdvertisementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdvertisementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
