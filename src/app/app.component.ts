import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlineUsersComponent } from './online-users/online-users.component';
/*
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OnlineUsersComponent],
  template: `
    <app-online-users
      [currentUser]="testUser"
      (userSelected)="onUserSelect($event)">
    </app-online-users>
  `
})
export class AppComponent {
  testUser = {
    id: 'dummy-id',
    name: 'Test',
    age: 22,
    country: 'India',
    gender: 'Male',
    online: true
  };

  onUserSelect(user: any) {
    console.log('Selected user:', user);
  }
}
*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}

 /*
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlineUsersComponent } from './online-users/online-users.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Import RouterModule here
  template: `<router-outlet></router-outlet>`,
})

export class AppComponent {
  protected title = 'chat-app';
}
*/
