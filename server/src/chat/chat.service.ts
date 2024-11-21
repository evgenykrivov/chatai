import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { userId },
      include: {
        messages: {
          take: 1, // Берем последнее сообщение
          orderBy: { timestamp: 'desc' },
        },
      },
    });
  }

  async getChatById(id: string) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: { messages: true },
    });
  }

  async createChat(data: { name: string; avatar: string }, userId: number) {
    return this.prisma.chat.create({
      data: {
        name: data.name,
        avatar: data.avatar,
        userId,
        lastMessage: 'No messages yet',
        timestamp: new Date(),
      },
    });
  }

  async addMessageToChat(
    chatId: string,
    message: { content: string; sender: string },
  ) {
    return this.prisma.message.create({
      data: {
        content: message.content,
        sender: message.sender,
        chatId,
      },
    });
  }
}
