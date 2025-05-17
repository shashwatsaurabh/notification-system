import type { Notification } from "./types"
import nodemailer from "nodemailer"

// Create a transporter for sending real emails
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
})

// Real email service
export async function sendEmail(notification: Notification): Promise<void> {
  console.log(`Sending email to user ${notification.userId}: ${notification.subject}`)

  // Check if we have the necessary environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log("Email credentials not configured. Using simulation mode.")
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll consider it successful
    return
  }

  try {
    // Get the user's email from the userId
    // In a real application, you would look up the user's email in your database
    const userEmail = notification.userId.includes("@") ? notification.userId : `${notification.userId}@example.com`

    // Send the actual email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_FROM || "notifications@example.com",
      to: userEmail,
      subject: notification.subject,
      text: notification.content,
      html: `<div>${notification.content}</div>`,
    })
  } catch (error) {
    console.error("Failed to send email:", error)
    throw new Error("Email service failed to send message")
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
