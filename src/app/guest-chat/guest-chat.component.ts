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
  imports: [CommonModule, FormsModule, OnlineUsersComponent],
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
    console.log('🛠️ GuestChatComponent ngOnInit started');
    
    const localUser = localStorage.getItem('guestUser');
    const currentUserId = this.route.snapshot.queryParamMap.get('from');
    const selectedUserId = this.route.snapshot.queryParamMap.get('to');

    console.log('🛠️ Query params - from:', currentUserId, 'to:', selectedUserId);
    
    if (localUser) {
      this.currentUser = JSON.parse(localUser);
      console.log('✅ currentUser from localStorage:', this.currentUser);
    } else if (currentUserId) {
      try {
        this.currentUser = await firstValueFrom(this.chatService.getUserById(currentUserId));
        localStorage.setItem('guestUser', JSON.stringify(this.currentUser));
        console.log('✅ currentUser from API:', this.currentUser);
      } catch (err) {
        console.error('❌ Error fetching current user:', err);
        this.router.navigate(['/login']);
        return;
      }
    } else {
      console.warn('⚠️ No currentUser found, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    if (selectedUserId) {
      this.fetchAndSetSelectedUser(selectedUserId);
    }
  }

  fetchAndSetSelectedUser(userId: string): void {
    console.log('🛠️ currentUser.id:', this.currentUser?.id);

    this.chatService.getUserById(userId).subscribe({
      next: (user) => {
        this.selectedUser = user;
        console.log('✅ Selected user:', user);
        this.loadMessages();
      },
      error: (err) => console.error('❌ Error fetching selected user:', err),
    });
  }

  selectUser(user: GuestUser): void {
    this.selectedUser = user;
    console.log('🛠️ User selected:', user);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { from: this.currentUser?.id, to: user.id },
      queryParamsHandling: 'merge',
    });
    this.loadMessages();
  }

  loadMessages(): void {
    if (!this.currentUser?.id || !this.selectedUser?.id) {
      console.warn('⚠️ Cannot load messages: missing user IDs');
      return;
    }

    this.chatService.getMessages(this.currentUser.id, this.selectedUser.id).subscribe({
      next: (messages) => {
        this.messages = messages;
        console.log('✅ Messages loaded:', messages);
      },
      error: (err) => console.error('❌ Error loading messages:', err),
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.currentUser?.id || !this.selectedUser?.id) {
      console.warn('⚠️ Cannot send message: invalid input or user IDs');
      return;
    }

    const message = {
      from: this.currentUser.name,
      text: this.newMessage.trim(),
    };

    this.chatService.sendMessage(this.currentUser.id, this.selectedUser.id, message).subscribe({
      next: () => {
        this.messages.push(message);
        this.newMessage = '';
        console.log('✅ Message sent:', message);
      },
      error: (err) => console.error('❌ Error sending message:', err),
    });
  }
}