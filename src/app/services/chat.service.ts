import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private userApiUrl = 'http://localhost:8522/api/users';
  private chatApiUrl = 'http://localhost:8522/api/chat';

  constructor(private http: HttpClient) {}

  getOnlineUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userApiUrl}/online`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${userId}`);
  }

  sendMessage(fromId: string, toId: string, message: any): Observable<any> {
    return this.http.post(`${this.chatApiUrl}/send`, {
      from: fromId,
      to: toId,
      text: message.text,
    });
  }

  getMessages(fromId: string, toId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.chatApiUrl}/messages/${fromId}/${toId}`);
  }
}
