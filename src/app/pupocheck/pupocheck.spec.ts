import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pupocheck } from './pupocheck';

describe('Pupocheck', () => {
  let component: Pupocheck;
  let fixture: ComponentFixture<Pupocheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pupocheck],
    }).compileComponents();

    fixture = TestBed.createComponent(Pupocheck);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
