import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrandFormComponent } from './strand-form.component';

describe('StrandFormComponent', () => {
  let component: StrandFormComponent;
  let fixture: ComponentFixture<StrandFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrandFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
