import type { Notification } from "./types"

// Simulated email service
export async function sendEmail(notification: Notification): Promise<void> {
  console.log(`Sending email to user ${notification.userId}: ${notification.subject}`)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate occasional failures (20% chance)
  if (Math.random() < 0.2) {
    throw new Error("Email service temporarily unavailable")
  }
}

// Simulated SMS service
export async function sendSMS(notification: Notification): Promise<void> {
  console.log(`Sending SMS to user ${notification.userId}: ${notification.subject}`)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simulate occasional failures (15% chance)
  if (Math.random() < 0.15) {
    throw new Error("SMS service temporarily unavailable")
  }
}

// Simulated in-app notification service
export async function sendInAppNotification(notification: Notification): Promise<void> {
  console.log(`Sending in-app notification to user ${notification.userId}: ${notification.subject}`)

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("In-app notification service temporarily unavailable")
  }
}
