import type { Notification } from "./types"

class NotificationStore {
  private notifications: Notification[] = []

  addNotification(notification: Notification): void {
    this.notifications.push(notification)
  }

  updateNotification(updatedNotification: Notification): void {
    const index = this.notifications.findIndex((n) => n.id === updatedNotification.id)
    if (index !== -1) {
      this.notifications[index] = {
        ...this.notifications[index],
        ...updatedNotification,
        updatedAt: new Date().toISOString(),
      }
    }
  }

  getNotificationsByUserId(userId: string): Notification[] {
    return this.notifications
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  // For development/testing purposes
  seedTestData(): void {
    const testData: Notification[] = [
      {
        id: "1",
        userId: "user1",
        type: "email",
        subject: "Welcome to our platform",
        content: "Thank you for signing up! We're excited to have you on board.",
        status: "delivered",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        retryCount: 0,
      },
      {
        id: "2",
        userId: "user1",
        type: "sms",
        subject: "Security alert",
        content: "We detected a new login to your account from a new device.",
        status: "delivered",
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        updatedAt: new Date(Date.now() - 43200000).toISOString(),
        retryCount: 0,
      },
      {
        id: "3",
        userId: "user1",
        type: "in-app",
        subject: "New feature available",
        content: "Check out our new dashboard features that help you track your progress.",
        status: "pending",
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        retryCount: 0,
      },
      {
        id: "4",
        userId: "user1",
        type: "email",
        subject: "Your weekly summary",
        content: "Here's a summary of your activity from the past week.",
        status: "failed",
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        retryCount: 3,
      },
    ]

    this.notifications.push(...testData)
  }
}

export const notificationStore = new NotificationStore()

// Seed some test data
notificationStore.seedTestData()
