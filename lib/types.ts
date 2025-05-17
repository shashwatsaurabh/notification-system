export interface NotificationRequest {
  userId: string
  type: string
  subject: string
  content: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  subject: string
  content: string
  status: "pending" | "delivered" | "failed"
  createdAt: string
  updatedAt: string
  retryCount: number
}

export interface QueueMessage {
  notification: Notification
  retryCount: number
}
