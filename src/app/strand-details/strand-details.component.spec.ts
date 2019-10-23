import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrandDetailsComponent } from './strand-details.component';

describe('StrandDetailsComponent', () => {
  let component: StrandDetailsComponent;
  let fixture: ComponentFixture<StrandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrandDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
