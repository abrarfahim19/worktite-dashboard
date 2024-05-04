import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="mx-4 rounded bg-white p-2">
      <p className="font-semibold">Notification</p>
      <Notifications />
    </div>
  );
};

export default Page;

const allNotificationsData = [
  {
    category: "Today",
    notifications: [
      {
        id: 1,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: false,
      },
      {
        id: 2,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: true,
      },
    ],
  },
  {
    category: "This Week",
    notifications: [
      {
        id: 3,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: false,
      },
      {
        id: 4,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: true,
      },
    ],
  },
];

const unreadNotificationsData = [
  {
    category: "Today",
    notifications: [
      {
        id: 1,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: false,
      },
      {
        id: 2,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: true,
      },
    ],
  },
  {
    category: "This Week",
    notifications: [
      {
        id: 3,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: false,
      },
      {
        id: 4,
        title: "New project uploaded",
        date: "2 hours ago",
        message: "A new project has been uploaded by a client",
        read: true,
      },
    ],
  },
];

const Notifications = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="">
        <TabsList className="mt-4 bg-transparent">
          <TabsTrigger
            value="account"
            className="text-md w-24 bg-white font-semibold text-brand data-[state=active]:rounded-md data-[state=active]:border-b-brand data-[state=active]:bg-brand data-[state=active]:text-white data-[state=active]:shadow-none "
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="text-md w-24 bg-white font-semibold text-brand data-[state=active]:rounded-md data-[state=active]:border-b-brand data-[state=active]:bg-brand data-[state=active]:text-white data-[state=active]:shadow-none "
          >
            Unread
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>
            {allNotificationsData.map((allNotifications, index) => {
              return (
                <div key={index}>
                  <p className="my-2 font-semibold">
                    {allNotifications.category}
                  </p>
                  {allNotifications.notifications.map((notification) => {
                    return (
                      <div key={notification.id}>
                        <p>{notification.title}</p>
                        <p>{notification.message}</p>
                        <p>{notification.date}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div>
            {unreadNotificationsData.map((unreadNotifications, index) => {
              return (
                <div key={index}>
                  <p className="my-2 font-semibold">
                    {unreadNotifications.category}
                  </p>
                  {unreadNotifications.notifications.map((notification) => {
                    return (
                      <div key={notification.id}>
                        <p>{notification.title}</p>
                        <p>{notification.message}</p>
                        <p>{notification.date}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
