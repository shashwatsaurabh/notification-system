"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendNotification } from "@/lib/api-client"

export default function NotificationForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    userId: "",
    type: "email",
    subject: "",
    content: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await sendNotification(formData)
      toast({
        title: "Notification sent",
        description: "Your notification has been queued for delivery.",
      })
      setFormData({
        userId: "",
        type: "email",
        subject: "",
        content: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="userId">{formData.type === "email" ? "Email Address" : "User ID"}</Label>
        <Input
          id="userId"
          name="userId"
          type={formData.type === "email" ? "email" : "text"}
          value={formData.userId}
          onChange={handleChange}
          placeholder={formData.type === "email" ? "Enter email address" : "Enter user ID"}
          required
        />
        {formData.type === "email" && (
          <p className="text-xs text-gray-500">Enter your actual email address to receive the notification.</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Notification Type</Label>
        <Select value={formData.type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select notification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="in-app">In-App</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter notification subject"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter notification content"
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Notification"}
      </Button>
    </form>
  )
}
