import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTrackLocationComponent } from './manager-track-location.component';

describe('ManagerTrackLocationComponent', () => {
  let component: ManagerTrackLocationComponent;
  let fixture: ComponentFixture<ManagerTrackLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTrackLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTrackLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
