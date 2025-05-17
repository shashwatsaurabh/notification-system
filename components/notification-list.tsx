"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, MessageSquare, RefreshCw } from "lucide-react"
import { getUserNotifications } from "@/lib/api-client"
import type { Notification } from "@/lib/types"

export default function NotificationList() {
  const { toast } = useToast()
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const fetchNotifications = async () => {
    if (!userId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a user ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const data = await getUserNotifications(userId)
      setNotifications(data)
      if (data.length === 0) {
        toast({
          title: "No notifications",
          description: "This user has no notifications.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch notifications. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "in-app":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <div className="flex-1">
          <Label htmlFor="userId" className="sr-only">
            User ID
          </Label>
          <Input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
        </div>
        <Button onClick={fetchNotifications} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            "Fetch Notifications"
          )}
        </Button>
      </div>

      {notifications.length > 0 && (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    {notification.subject}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{notification.type}</Badge>
                    <div
                      className={`h-2 w-2 rounded-full ${getStatusColor(notification.status)}`}
                      title={notification.status}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                <p className="mt-2">{notification.content}</p>
                {notification.retryCount > 0 && (
                  <p className="text-xs text-gray-500 mt-2">Retry attempts: {notification.retryCount}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
