# ChatAI - Chat Application by [Neiro.ai](http://Neiro.ai)

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

- **Node.js with NestJS**: Server-side framework for building efficient and scalable applications.
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
- Authentication via backend with JWT token management.
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
   - Dynamic message generation via [aimlapi.com](https://api.aimlapi.com) API.
   - Extensible to support multiple AI models.

4. **Scalability**:
   - Modular architecture enables adding new neural networks.
   - Future-proof for multimedia features like images, files, and videos.

5. **Error Handling**:
   - Field-level error messages for forms.
   - Retry logic for failed API requests.

---

## Setup Instructions

To simplify the setup process, we've streamlined the steps into a unified startup sequence using Docker Compose.

### Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- An API key from [aimlapi.com](https://api.aimlapi.com).

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/evgenykrivov/chatai.git
   cd chatai
   ```

2. **Create and configure the `.env` file:**

   - Copy the example environment file:

     ```bash
     cp .env.example .env
     ```

   - Open the `.env` file and update the following variables:

      - **VITE_API_TOKEN**: Replace `<Your AIML API token here>` with your API key from [aimlapi.com](https://api.aimlapi.com).
      - Optionally, update other variables if necessary (e.g., database credentials, JWT secrets).

   **Example `.env` file:**

   ```env
   # PostgreSQL configuration
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password123
   POSTGRES_DB=my_database

   # JWT secrets for authentication
   AT_JWT_SECRET=supersecureaccesstokensecret
   RT_JWT_SECRET=supersecurerefreshtokensecret

   # Client URLs
   CLIENT_URL_DEFAULT=http://localhost
   CLIENT_URL_PUBLIC=

   # Backend server port
   PORT=4000

   # AI API configuration
   VITE_API_TOKEN=your_api_token_here
   VITE_API_URL=https://api.aimlapi.com/chat/completions
   ```

   **Note:** Replace `your_api_token_here` with your actual API key.

3. **Run the application with Docker Compose:**

   ```bash
   docker compose up --build
   ```

   This command will build and start all the necessary services, including the frontend, backend, and PostgreSQL database.

4. **Access the application:**

   - Open your web browser and navigate to `http://localhost`.

---

## Obtaining the AIML API Key

To interact with the AI bot, you need an API key from [aimlapi.com](https://api.aimlapi.com).

1. **Register an account:**

   - Visit [aimlapi.com](https://api.aimlapi.com) and sign up for a new account.

2. **Generate an API key:**

   - After logging in, navigate to your account dashboard or API section.
   - Generate a new API key.

3. **Add the API key to your `.env` file:**

   - Update the `VITE_API_TOKEN` variable in your `.env` file with the API key you obtained.

---

## Advanced Setup (Manual Steps)

If you prefer to run the application without Docker, follow these steps.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **PostgreSQL** installed and running.
- An API key from [aimlapi.com](https://api.aimlapi.com).

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/evgenykrivov/chatai.git
   cd chatai
   ```

2. **Set up the environment variables:**

   - Copy the `.env.example` file to `.env` in both the `server` and `client` directories if necessary.
   - Update the `.env` file with your configuration as described above.

3. **Install dependencies:**

   **Backend:**

   ```bash
   cd server
   npm install
   ```

   **Frontend:**

   ```bash
   cd ../client
   npm install
   ```

4. **Apply database migrations:**

   ```bash
   cd ../server
   npx prisma migrate deploy
   ```

5. **Start the PostgreSQL database:**

   - Ensure your PostgreSQL service is running and accessible with the credentials specified in your `.env` file.

6. **Start the backend server:**

   ```bash
   npm run start:dev
   ```

7. **Start the frontend client:**

   Open a new terminal window:

   ```bash
   cd ../client
   npm run dev
   ```

8. **Access the application:**

   - Open your web browser and navigate to the URL provided by the frontend dev server (usually `http://localhost:5173`).

---

## Prisma Setup and Migrations

1. **Prisma Schema:**

   The Prisma schema defines the database structure and models. It's located in the `server/prisma/schema.prisma` file.

2. **Running Migrations:**

   To apply database changes, run:

   ```bash
   npx prisma migrate deploy
   ```

3. **Viewing the Database:**

   To open Prisma Studio for database inspection:

   ```bash
   npx prisma studio
   ```

4. **Environment Variables:**

   Ensure the `.env` file contains the correct database connection string. Since `DATABASE_URL` is constructed automatically in the Docker setup, make sure your manual setup reflects the same configuration.

---

## Environment Variables Configuration

Below is an enhanced version of the `.env.example` file, including placeholders for integration with [aimlapi.com](https://api.aimlapi.com) and descriptions of each variable.

### `.env.example`

```env
# PostgreSQL configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_DB=my_database

# JWT secrets for authentication
AT_JWT_SECRET=supersecureaccesstokensecret
RT_JWT_SECRET=supersecurerefreshtokensecret

# Client URLs
CLIENT_URL_DEFAULT=http://localhost
CLIENT_URL_PUBLIC=

# Backend server port
PORT=4000

# AI API configuration
VITE_API_TOKEN=<Your AIML API token here>
VITE_API_URL=https://api.aimlapi.com/chat/completions
```

**Notes:**

- **VITE_API_TOKEN**: Obtain this from [aimlapi.com](https://api.aimlapi.com) as described above.
- **CLIENT_URL_PUBLIC**: If deploying the application publicly, set this to your application's public URL.
- **JWT Secrets**: Use strong, random strings for `AT_JWT_SECRET` and `RT_JWT_SECRET`.

---

## Future Enhancements

1. **Integration with Multiple Neural Networks:**

   - Add support for other AI APIs (e.g., OpenAI, Google AI).

2. **Rich Media Support:**

   - Enable image and file sharing.

3. **User Presence Status:**

   - Show online/offline indicators for users.

4. **Push Notifications:**

   - Notify users of new messages or activity.

5. **Voice Message Support:**

   - Convert text to speech using services like AWS Polly.

---

## Why Feature-Sliced Design (FSD)?

Using the **Feature-Sliced Design** ensures the project is:

- **Scalable**: Easy to add new features without breaking existing functionality.
- **Modular**: Each feature is self-contained and reusable.
- **Maintainable**: Simplifies onboarding for new developers.

With this architecture, the system can grow into a fully-featured communication platform supporting multiple bots, rich media, and advanced user management.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
