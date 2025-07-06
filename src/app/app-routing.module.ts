import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { ChatComponent } from './chat/chat.component';
import { HomepageComponent } from './homepage/homepage.component';
import {GuestLoginComponent} from './guest-login/guest-login.component';
import {GuestChatComponent} from './guest-chat/guest-chat.component'
const routes: Routes = [
  { path: '', redirectTo: 'guestlogin', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'onlineusers', component: OnlineUsersComponent },
  { path: 'guestlogin', component: GuestLoginComponent },
  { path: 'guest-chat', component: GuestChatComponent },
  { path: 'guest-chat/:id', component: GuestChatComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}