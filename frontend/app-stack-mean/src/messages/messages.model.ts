export class Message {
  messageId: string;
  content: string;
  userId: string;
  username: string;
  
  constructor(content: string, username: string, userId?: string, messageId?: string){
    this.messageId = messageId;
    this.content = content;
    this.userId = userId;
    this.username = username;
  }
}