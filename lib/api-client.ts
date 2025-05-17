import type { Notification, NotificationRequest } from "./types"

const API_BASE_URL = "/api"

export async function sendNotification(data: NotificationRequest): Promise<Notification> {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to send notification")
  }

  return response.json()
}

export async function getUserNotifications(userId: string): Promise<Notification[]> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/notifications`)

  if (!response.ok) {
    throw new Error("Failed to fetch notifications")
  }

  return response.json()
}
