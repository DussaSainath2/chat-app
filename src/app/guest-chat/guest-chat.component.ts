import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { GuestUser } from '../models/guest-user';
import { OnlineUsersComponent } from '../online-users/online-users.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-guest-chat',
  standalone: true,
  templateUrl: './guest-chat.component.html',
  styleUrls: ['./guest-chat.component.scss'],
  imports: [CommonModule, FormsModule, OnlineUsersComponent]
})
export class GuestChatComponent implements OnInit {
  currentUser?: GuestUser;
  selectedUser?: GuestUser;
  messages: any[] = [];
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) {}

  async ngOnInit(): Promise<void> {
    const localUser = localStorage.getItem('guestUser');
    const currentUserId = this.route.snapshot.queryParamMap.get('from');
    const selectedUserId = this.route.snapshot.queryParamMap.get('to');

    if (localUser) {
      this.currentUser = JSON.parse(localUser);
      console.log('✅ currentUser from localStorage:', this.currentUser);
    }

    if (!this.currentUser && currentUserId) {
      try {
        this.currentUser = await firstValueFrom(this.chatService.getUserById(currentUserId));
        localStorage.setItem('guestUser', JSON.stringify(this.currentUser));
        console.log('✅ currentUser from API:', this.currentUser);
      } catch (err) {
        console.error('❌ Error fetching current user:', err);
      }
    }

    if (this.currentUser && selectedUserId) {
      this.fetchAndSetSelectedUser(selectedUserId);
    }
  }

  fetchAndSetSelectedUser(userId: string): void {
    this.chatService.getUserById(userId).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.loadMessages();
      },
      error: (err) => console.error('❌ Error fetching selected user:', err)
    });
  }

  selectUser(user: GuestUser): void {
    this.selectedUser = user;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { from: this.currentUser?.id, to: user.id },
      queryParamsHandling: 'merge'
    });
    this.loadMessages();
  }

  loadMessages(): void {
    if (!this.currentUser?.id || !this.selectedUser?.id) return;

    this.chatService.getMessages(this.currentUser.id, this.selectedUser.id).subscribe({
      next: (messages) => (this.messages = messages),
      error: (err) => console.error('❌ Error loading messages:', err)
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.currentUser?.id || !this.selectedUser?.id) return;

    const message = {
      from: this.currentUser.name,
      text: this.newMessage.trim()
    };

    this.chatService.sendMessage(this.currentUser.id, this.selectedUser.id, message).subscribe({
      next: () => {
        this.messages.push(message);
        this.newMessage = '';
      },
      error: (err) => console.error('❌ Error sending message:', err)
    });
  }
}
