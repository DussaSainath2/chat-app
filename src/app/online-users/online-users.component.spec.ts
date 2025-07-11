import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineUsersComponent } from './online-users.component';

describe('OnlineUsers', () => {
  let component: OnlineUsersComponent;
  let fixture: ComponentFixture<OnlineUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
