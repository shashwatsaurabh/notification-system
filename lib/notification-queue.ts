import type { Notification, QueueMessage } from "./types"
import { notificationStore } from "./notification-store"
import { sendEmail, sendSMS, sendInAppNotification } from "./notification-services"

class NotificationQueue {
  private queue: QueueMessage[] = []
  private processing = false
  private maxRetries = 3
  private retryDelay = 2000 // 2 seconds

  enqueue(notification: Notification): void {
    this.queue.push({ notification, retryCount: 0 })

    if (!this.processing) {
      this.processQueue()
    }
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) {
      this.processing = false
      return
    }

    this.processing = true
    const item = this.queue.shift()

    if (!item) {
      this.processing = false
      return
    }

    try {
      const { notification, retryCount } = item
      await this.processNotification(notification)

      // Update notification status to delivered
      notification.status = "delivered"
      notificationStore.updateNotification(notification)

      // Continue processing the queue
      this.processQueue()
    } catch (error) {
      const { notification, retryCount } = item

      if (retryCount < this.maxRetries) {
        // Increment retry count and put back in queue with delay
        notification.retryCount = retryCount + 1
        notificationStore.updateNotification(notification)

        setTimeout(
          () => {
            this.queue.push({ notification, retryCount: retryCount + 1 })
            this.processQueue()
          },
          this.retryDelay * (retryCount + 1),
        ) // Exponential backoff
      } else {
        // Mark as failed after max retries
        notification.status = "failed"
        notificationStore.updateNotification(notification)
        this.processQueue()
      }
    }
  }

  private async processNotification(notification: Notification): Promise<void> {
    switch (notification.type) {
      case "email":
        await sendEmail(notification)
        break
      case "sms":
        await sendSMS(notification)
        break
      case "in-app":
        await sendInAppNotification(notification)
        break
      default:
        throw new Error(`Unsupported notification type: ${notification.type}`)
    }
  }
}

// Singleton instance
export const notificationQueue = new NotificationQueue()
