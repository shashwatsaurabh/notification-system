import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { notificationQueue } from "@/lib/notification-queue"
import { notificationStore } from "@/lib/notification-store"
import type { Notification } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.type || !body.subject || !body.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate notification type
    if (!["email", "sms", "in-app"].includes(body.type)) {
      return NextResponse.json({ error: "Invalid notification type. Must be email, sms, or in-app" }, { status: 400 })
    }

    // Create notification object
    const notification: Notification = {
      id: uuidv4(),
      userId: body.userId,
      type: body.type,
      subject: body.subject,
      content: body.content,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      retryCount: 0,
    }

    // Store notification
    notificationStore.addNotification(notification)

    // Add to queue for processing
    notificationQueue.enqueue(notification)

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
