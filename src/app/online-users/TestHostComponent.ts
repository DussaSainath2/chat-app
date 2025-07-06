import { OnlineUsersComponent } from "./online-users.component";
import { Component } from "@angular/core";

@Component({
  selector: 'app-test-host',
  standalone: true,
  template: `<app-online-users [currentUser]="testUser" />`,
  imports: [OnlineUsersComponent],
})
export class TestHostComponent {
  testUser = {
    id: 'dummy-id',
    name: 'Test',
    age: 22,
    country: 'India',
    gender: 'Male',
    online: true,
  };
}
