import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { GuestLoginComponent } from './guest-login.component';

describe('GuestLogin', () => {
  let component: GuestLoginComponent;
  let fixture: ComponentFixture<GuestLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
