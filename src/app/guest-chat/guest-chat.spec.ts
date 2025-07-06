import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { OnlineUsersComponent } from '../online-users/online-users.component';
import { CommonModule } from '@angular/common';
import { GuestUser } from '../models/guest-user';

@Component({
  selector: 'app-guest-chat',
  standalone: true,
  templateUrl: './guest-chat.component.html',
  styleUrls: ['./guest-chat.component.scss'],
  imports: [CommonModule, FormsModule, OnlineUsersComponent],
})
export class GuestChatComponent implements OnInit {
  currentUser!: GuestUser;
  selectedUser?: GuestUser;
  messages: any[] = [];
  newMessage: string = '';

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.route.snapshot.queryParamMap.get('from');
    if (currentUserId) {
      this.chatService.getUserById(currentUserId).subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (err) => console.error('❌ Error fetching current user:', err),
      });
    } else {
      console.error('❌ currentUserId not provided in URL');
    }
  }

  selectUser(user: GuestUser): void {
    this.selectedUser = user;
    this.messages = [];
    this.loadMessages();
  }

  loadMessages(): void {
    if (!this.currentUser?.id || !this.selectedUser?.id) return;

    this.chatService.getMessages(this.currentUser.id, this.selectedUser.id).subscribe({
      next: (messages) => {
        this.messages = messages;
        setTimeout(() => this.scrollToBottom(), 50);
      },
      error: (err) => console.error('❌ Error loading messages:', err),
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.currentUser?.id || !this.selectedUser?.id) return;

    const messagePayload = {
      from: this.currentUser.name,
      text: this.newMessage.trim(),
    };

    this.chatService.sendMessage(this.currentUser.id, this.selectedUser.id, messagePayload).subscribe({
      next: () => {
        this.messages.push(messagePayload);
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 50);
      },
      error: (err) => console.error('❌ Error sending message:', err),
    });
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
