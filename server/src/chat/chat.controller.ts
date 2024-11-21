import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChats(@Req() req: any) {
    const userId = req.user.userId;
    console.log('RRRRRR', userId);
    return this.chatService.getChats(userId);
  }

  @Get(':id')
  async getChatById(@Param('id') id: string) {
    return this.chatService.getChatById(id);
  }

  @Post()
  async createChat(
    @Body() data: { name: string; avatar: string },
    @Req() req: any,
  ) {
    console.log('Received user:', req.user);
    const userId = req.user.userId;
    return this.chatService.createChat(data, userId);
  }

  @Post(':id/messages')
  async addMessageToChat(
    @Param('id') chatId: string,
    @Body() message: { content: string; sender: string },
  ) {
    return this.chatService.addMessageToChat(chatId, message);
  }
}
