import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuestUser } from '../models/guest-user';
import { OnlineUsersComponent } from '../online-users/online-users.component';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, FormsModule,OnlineUsersComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  @Input() selectedUser!: GuestUser;
  @Input() currentUser!: GuestUser;

  newMessage = '';
  messages: { from: string; text: string }[] = [];

 onlineUsers: any[] = []; // Dummy list or fetch it from service

  constructor(private chatService: ChatService) {}




selectUser(user: any) {
  this.selectedUser = user;
  this.messages = []; // Optional: load chat history
  console.log("Chat with user:", user);
}






  ngOnInit() {

    if (this.currentUser && this.selectedUser) {
      this.loadMessages();
    }
  }

 loadMessages() {
  if (!this.currentUser?.id || !this.selectedUser?.id) return;

  this.chatService.getMessages(this.currentUser.id, this.selectedUser.id)
    .subscribe((res: any) => {
      this.messages = res;
    });
}


sendMessage() {
  if (!this.currentUser?.id || !this.selectedUser?.id || !this.newMessage.trim()) return;

  const message = {
    from: this.currentUser.name,
    text: this.newMessage.trim()
  };

  this.chatService.sendMessage(this.currentUser.id, this.selectedUser.id, message)
    .subscribe(() => {
      this.newMessage = '';
      this.loadMessages();  // Refresh chat
    });
}


}