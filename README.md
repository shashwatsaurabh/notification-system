# Notification Service

A system to send notifications to users with support for email, SMS, and in-app notifications.

## Features

- API Endpoints:
  - Send a Notification (POST /api/notifications)
  - Get User Notifications (GET /api/users/{id}/notifications)
- Notification Types:
  - Email
  - SMS
  - In-app notifications
- Queue System:
  - In-memory queue implementation for processing notifications
  - Retries for failed notifications with exponential backoff
- Simple UI for testing the notification service

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Setup Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/notification-service.git
   cd notification-service
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Documentation

### Send a Notification

\`\`\`
POST /api/notifications
\`\`\`

Request Body:
\`\`\`json
{
  "userId": "user123",
  "type": "email", // "email", "sms", or "in-app"
  "subject": "Welcome to our platform",
  "content": "Thank you for signing up!"
}
\`\`\`

Response:
\`\`\`json
{
  "id": "uuid",
  "userId": "user123",
  "type": "email",
  "subject": "Welcome to our platform",
  "content": "Thank you for signing up!",
  "status": "pending",
  "createdAt": "2023-05-17T17:55:25.000Z",
  "updatedAt": "2023-05-17T17:55:25.000Z",
  "retryCount": 0
}
\`\`\`

### Get User Notifications

\`\`\`
GET /api/users/{id}/notifications
\`\`\`

Response:
\`\`\`json
[
  {
    "id": "uuid1",
    "userId": "user123",
    "type": "email",
    "subject": "Welcome to our platform",
    "content": "Thank you for signing up!",
    "status": "delivered",
    "createdAt": "2023-05-17T17:55:25.000Z",
    "updatedAt": "2023-05-17T17:55:25.000Z",
    "retryCount": 0
  },
  {
    "id": "uuid2",
    "userId": "user123",
    "type": "sms",
    "subject": "Security alert",
    "content": "We detected a new login to your account.",
    "status": "failed",
    "createdAt": "2023-05-17T16:55:25.000Z",
    "updatedAt": "2023-05-17T16:55:25.000Z",
    "retryCount": 3
  }
]
\`\`\`

## Assumptions

1. This is a demo implementation with an in-memory store and queue. In a production environment, you would use:
   - A database for persistent storage (e.g., PostgreSQL, MongoDB)
   - A message broker for the queue (e.g., RabbitMQ, Kafka)
   - Proper authentication and authorization

2. The notification services (email, SMS, in-app) are simulated with random failures to demonstrate the retry mechanism.

3. For simplicity, user management is not implemented. The system assumes valid user IDs are provided.

## Future Improvements

1. Add authentication and authorization
2. Implement real email and SMS services (e.g., SendGrid, Twilio)
3. Add notification templates
4. Add notification preferences per user
5. Implement read/unread status for notifications
6. Add pagination for the notifications list
7. Add filtering and sorting options
8. Implement real-time notifications using WebSockets
