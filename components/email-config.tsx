"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function EmailConfig() {
  const { toast } = useToast()
  const [isConfigured, setIsConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState({
    host: "",
    port: "587",
    secure: false,
    user: "",
    password: "",
    from: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setConfig((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setConfig((prev) => ({ ...prev, secure: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real application, you would store these securely
      // For this demo, we'll use localStorage
      localStorage.setItem("emailConfig", JSON.stringify(config))

      // Set environment variables (this is just for demonstration)
      // In a real app, these would be set on the server
      window.EMAIL_HOST = config.host
      window.EMAIL_PORT = config.port
      window.EMAIL_SECURE = config.secure.toString()
      window.EMAIL_USER = config.user
      window.EMAIL_PASSWORD = config.password
      window.EMAIL_FROM = config.from

      setIsConfigured(true)
      toast({
        title: "Email configuration saved",
        description: "Your email settings have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save email configuration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Configure your SMTP server to send real emails. For Gmail, you may need to use an app password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConfigured ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 text-green-700 rounded-md">
              Email is configured. You can now send real emails.
            </div>
            <Button onClick={() => setIsConfigured(false)}>Edit Configuration</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="host">SMTP Host</Label>
                <Input
                  id="host"
                  name="host"
                  value={config.host}
                  onChange={handleChange}
                  placeholder="smtp.gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">SMTP Port</Label>
                <Input id="port" name="port" value={config.port} onChange={handleChange} placeholder="587" required />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="secure" checked={config.secure} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="secure">Use SSL/TLS</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user">SMTP Username</Label>
              <Input
                id="user"
                name="user"
                value={config.user}
                onChange={handleChange}
                placeholder="your-email@gmail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">SMTP Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={config.password}
                onChange={handleChange}
                placeholder="Your password or app password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">From Email</Label>
              <Input
                id="from"
                name="from"
                value={config.from}
                onChange={handleChange}
                placeholder="notifications@yourdomain.com"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
