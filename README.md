# React — Chat — Test Assignment by [Neiro.ai](http://Neiro.ai)

## Overview

This project is a Single Page Application (SPA) for a chat system where authenticated users can manage conversations and exchange messages with a bot. The application implements the requirements outlined in the assignment, including three key pages: **Authorization Page**, **Chat List Page**, and **Chat Page**. Additional features were implemented for scalability, maintainability, and user experience.

---

## ️ Technologies Used

### **Frontend**
- **React 18**: Core framework for building the SPA.
- **TypeScript**: Strongly typed language for better code quality and maintainability.
- **Redux Toolkit (RTK)**: Manages global state, API integration, and caching.
- **RTK Query**: Simplifies data fetching, caching, and server state management.
- **SCSS Modules**: Modular and maintainable styling system for components.
- **React Hook Form**: Lightweight library for managing forms and validation.
- **React Router DOM**: Handles routing between pages.

### **Backend**
- **Node.js with Express.js (Simulated)**: Simulates backend API endpoints for chat storage and authentication.
- **LLM API (AI/ML API)**: Generates bot responses dynamically.
- **PostgreSQL**: Stores users, chats, and messages.
- **Prisma ORM**: Simplifies database interaction with type safety.

### **Additional Libraries**
- **Lucide Icons**: Provides lightweight, customizable icons.
- **dotenv**: Manages environment variables securely.

---

##  Project Structure

### **Pages**

#### 1. **Authorization Page**
- Handles user login using a custom form-based flow.
- Form validation is implemented using `React Hook Form`.
- Users are authenticated via a simulated backend, with JWT token management for secure sessions.

#### 2. **Chat List Page**
- Displays a list of available chats with:
    - Chat name
    - Last message
    - Timestamp of the last activity
- Includes a **"Create New Chat"** button that opens a popup for creating new chats.
- Clicking a chat navigates to the respective **Chat Page**.
- Automatically updates in real-time using `RTK Query`.

#### 3. **Chat Page**
- Displays the conversation with a bot.
- Messages are divided into:
    - User messages (aligned right)
    - Bot messages (aligned left)
- Users can send messages, and bot replies are dynamically fetched using an LLM API.
- Includes error handling for failed message sending:
    - Temporary messages are displayed immediately with a loading state.
    - Failed messages are highlighted in red.


---

##  Features

### Core Features:
1. **Authentication**:
    - Custom login page with validation and JWT management.
    - Logout functionality clears all session data.

2. **Chat Management**:
    - Real-time updates for new chats and messages.
    - Optimistic UI updates:
        - Temporary messages displayed immediately.
        - Errors in sending are visually indicated.
    - Chat list automatically fetches the latest data after new chat creation.

3. **Bot Interaction**:
    - Bot responses are fetched using OpenAI GPT-4 API.
    - Supports only text-based messages.

4. **Responsive Design**:
    - Fully responsive UI for both desktop and mobile views.
    - SCSS Modules for component-specific styles.

5. **Error Handling**:
    - Graceful fallback UI for network or API errors.
    - Retry logic for sending failed messages.

---

##  Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/username/react-chat-assignment.git
   cd react-chat-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
    - Create a `.env` file in the root directory with the following
   

4. Start the application:
   ```bash
   cd client
   yarn
   yarn dev
   ```

5. Start the simulated backend (if applicable):
   ```bash
   cd backend
   yarn
   yarn start
   ```

6. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## Key Features Implemented

1. **Real-time updates** for chats and messages.
2. **Optimistic UI** for sending messages with error handling.
3. **Reusable components** for forms and inputs.
4. **Extensible API integration** using `RTK Query`.
5. **Responsive and adaptive design** with SCSS.

---

## Future Enhancements

1. **Voice-over feature**: Convert text messages to audio using APIs like AWS Polly or Google Text-to-Speech.
2. **Rich media support**: Allow image and file sharing.
3. **Notifications**: Add push notifications for new messages or chats.
4. **User presence status**: Show online/offline status of users.

