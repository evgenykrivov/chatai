# React — Chat — Test Assignment by [Neiro.ai](http://Neiro.ai)

## Overview

This project is a Single Page Application (SPA) for a chat system where authenticated users can manage conversations and exchange messages with a bot. The architecture is designed with scalability in mind, using the **Feature-Sliced Design (FSD)** methodology. This allows for the addition of new features and easy integration with multiple AI models or APIs.

The project currently supports interaction with a bot using a unified API hook, making it extensible to other neural networks or AI systems. Future enhancements will leverage this scalability.

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
- **LLM API (AI/ML API)**: Dynamically generates bot responses.

### **Backend**

- **Node.js with Express.js (Simulated)**: Simulates backend API endpoints for chat storage and authentication.
- **PostgreSQL**: Stores users, chats, and messages.
- **Prisma ORM**: Simplifies database interaction with type safety.

### **Additional Libraries**

- **Lucide Icons**: Lightweight and customizable icons.
- **dotenv**: Manages environment variables securely.

---

## Project Structure

### Simplified Feature-Sliced Design (FSD)

The architecture follows the FSD methodology, dividing the project into independent modules based on features, slices, and layers. This ensures scalability, maintainability, and clear separation of concerns.

---

### **Pages**

#### 1. **Authorization Page**

- Custom login flow with form validation.
- Authentication via a simulated backend with JWT token management.
- Error messages are displayed dynamically for each field.

#### 2. **Chat List Page**

- Displays available chats with:
    - Chat name
    - Last message
    - Timestamp of the last activity (e.g., "10 minutes ago").
- Real-time updates using `RTK Query`.
- "Create New Chat" button opens a popup for chat creation.

#### 3. **Chat Page**

- Displays user and bot messages in a conversational layout:
    - User messages are aligned to the right.
    - Bot messages are aligned to the left.
- Supports optimistic UI updates:
    - Temporary user messages appear instantly.
    - Errors in message delivery are highlighted.

---

## Features

### Core Features:

1. **Authentication**:
    - Form-based login with JWT session management.
    - Logout clears session data.

2. **Chat Management**:
    - Real-time updates for new chats and messages.
    - Automatic UI refresh after chat creation.

3. **Bot Interaction**:
    - Unified API hook for AI responses.
    - Dynamic message generation via OpenAI GPT-4 API.
    - Extensible to support multiple AI models.

4. **Scalability**:
    - Modular architecture enables adding new neural networks.
    - Future-proof for multimedia features like images, files, and videos.

5. **Error Handling**:
    - Field-level error messages for forms.
    - Retry logic for failed API requests.

---

## Updated Setup Instructions

To simplify the setup process, we've streamlined the steps into a unified startup sequence using Docker Compose:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/chatai.git
   cd chatai
   ```

2. Apply database migrations using Prisma:
   ```bash
   cd server
   npx prisma migrate deploy
   ```

3. Run the entire application stack with Docker:
   ```bash
   docker-compose.yml up -d
   ```

---

### Advanced Setup (Manual Steps)

If Docker is unavailable, follow these steps:

1. Install dependencies:
   ```bash
   cd /server
   npm install
   ```

2. Apply database migrations:
   ```bash
   npx prisma migrate deploy
   ```

3. Start the database:
   ```bash
   docker compose up -d
   ```

4. Start the frontend client:
   ```bash
   cd client
   npm install
   
   $ # start dev server and open browser
   $ npm run dev
   
   $ # build for production
   $ npm run build
   
   $ # locally preview production build
   $ npm run preview
   ```

5. Start the backend server:
   ```bash
   cd server
   
   # development
   $ npm run start

   # watch mode
   $ npm run start:dev

   # production mode
   $ npm run start:prod
   ```

---

## Prisma Setup and Migrations

1. **Prisma Schema**: The Prisma schema defines the database structure and models. It's located in the `backend/prisma/schema.prisma` file.

2. **Running Migrations**:
   To apply database changes, run:
   ```bash
   npx prisma migrate dev --name <migration-name>
   ```

3. **Viewing the Database**:
   To open the Prisma Studio for database inspection:
   ```bash
   npx prisma studio
   ```

4. **Environment Variables**:
   Ensure the `.env` file contains the correct database connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```
### .env Configuration for Frontend and Backend

Below is an enhanced version of `.env.example` for both the frontend and backend, including the placeholders for integration with [aimlapi.com](https://aimlapi.com) and proper descriptions of each variable.

---

#### **Frontend (`.env.example`)**
```env
# The API token for authentication with the AIML API service
VITE_API_TOKEN=<Your AIML API token here>

# The base URL of the AIML API service
VITE_API_URL=https://api.aimlapi.com/chat/completions
```

- To get your `VITE_API_TOKEN`, log in to [aimlapi.com](https://aimlapi.com), navigate to your account settings or API section, and generate an API key.
- Use `https://api.aimlapi.com` as the default API URL unless the service specifies otherwise.

---

#### **Backend (`.env.example`)**
```env
# PostgreSQL configuration
POSTGRES_USER=<Your PostgreSQL username>
POSTGRES_PASSWORD=<Your PostgreSQL password>
POSTGRES_DB=<Your PostgreSQL database name>

# Database connection string
DATABASE_URL=postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>

# JWT secrets for authentication
AT_JWT_SECRET=<Your access token JWT secret>
RT_JWT_SECRET=<Your refresh token JWT secret>

# Frontend client URL for CORS configuration
CLIENT_URL_DEFAULT=http://localhost:5173

# Backend server port
PORT=4000
```

---

### Notes:
1. **Database Configuration:**
   - Replace `<POSTGRES_USER>`, `<POSTGRES_PASSWORD>`, and `<POSTGRES_DB>` with your PostgreSQL credentials.
   - The `DATABASE_URL` is automatically constructed using the PostgreSQL credentials and default localhost settings.

2. **JWT Secrets:**
   - Use a strong random string for both `AT_JWT_SECRET` and `RT_JWT_SECRET`. These secrets ensure the security of your authentication tokens.

3. **Frontend Client URL:**
   - `CLIENT_URL_DEFAULT` is set to `http://localhost:5173` by default for local development. Update it to your frontend's production URL when deploying.

4. **Backend Port:**
   - Default `PORT` is `4000`. Change it if your environment requires a different port.

---

### Additional Suggestions:
- Store sensitive values (e.g., tokens, secrets) securely in an environment management system like **Vault**, **AWS Secrets Manager**, or similar tools in production environments.
- Avoid committing `.env` files directly to your repository. Instead, commit only the `.env.example` file with placeholders.

---

## Future Enhancements

1. **Integration with multiple neural networks**:
    - Add support for other AI APIs (e.g., Google AI, AWS Lex).

2. **Rich media support**:
    - Enable image and file sharing.

3. **User presence status**:
    - Show online/offline indicators for users.

4. **Push notifications**:
    - Notify users of new messages or activity.

5. **Voice message support**:
    - Convert text to speech using services like AWS Polly.

---

## Why FSD?

Using the **Feature-Sliced Design** ensures the project is:

- **Scalable**: Easy to add new features without breaking existing functionality.
- **Modular**: Each feature is self-contained and reusable.
- **Maintainable**: Simplifies onboarding for new developers.

With this architecture, the system can grow into a fully-featured communication platform supporting multiple bots, rich media, and advanced user management.