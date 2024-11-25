import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {
    }

    async deleteChat(chatId: string, userId: number) {
        const chat = await this.prisma.chat.findUnique({
            where: {id: chatId},
        });

        if (!chat || chat.userId !== userId) {
            throw new Error('Chat not found or access denied');
        }

        await this.prisma.message.deleteMany({
            where: {chatId},
        });

        // Удаляем чат
        return this.prisma.chat.delete({
            where: {id: chatId},
        });
    }

    async getChats(userId: number) {
        return this.prisma.chat.findMany({
            where: {userId},
            include: {
                messages: {
                    take: 1,
                    orderBy: {timestamp: 'desc'},
                },
            },
        });
    }

    async getChatById(id: string) {
        return this.prisma.chat.findUnique({
            where: {id},
            include: {messages: true},
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
