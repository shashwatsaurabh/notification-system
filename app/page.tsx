import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotificationForm from "@/components/notification-form"
import NotificationList from "@/components/notification-list"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Notification Service</h1>

      <Tabs defaultValue="send" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="view">View Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className="p-4 border rounded-md mt-2">
          <NotificationForm />
        </TabsContent>
        <TabsContent value="view" className="p-4 border rounded-md mt-2">
          <NotificationList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
