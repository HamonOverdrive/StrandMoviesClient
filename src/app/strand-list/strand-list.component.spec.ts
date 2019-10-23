import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrandListComponent } from './strand-list.component';

describe('StrandListComponent', () => {
  let component: StrandListComponent;
  let fixture: ComponentFixture<StrandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
