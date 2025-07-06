import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GoogleAuthComponent } from './auth/google-auth/google-auth.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';
import { GuestChatComponent } from './guest-chat/guest-chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'guestlogin', pathMatch: 'full' }, // ✅ Default route
  { path: 'guestlogin', component: GuestLoginComponent },    // ✅ Target component
  { path: 'guest-chat', component: GuestChatComponent },
  { path: 'guest-chat/:id', component: GuestChatComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onlineusers', component: OnlineUsersComponent },
  { path: 'chat/:id', component: ChatComponent },
];
