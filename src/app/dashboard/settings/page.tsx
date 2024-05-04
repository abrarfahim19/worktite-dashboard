"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Page = () => {
  return (
    <div className="p-4">
      <SettingsTab />
    </div>
  );
};

export default Page;

const tabData = [
  {
    name: "General Settings",
    value: "general",
  },
  {
    name: "Notification Settings",
    value: "notification",
  },
];

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState(tabData[0].value);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Tabs defaultValue={activeTab} className="">
        <TabsList className="bg-transparent pl-0">
          {tabData.map((tab) => {
            return (
              <TabsTrigger
                className="mr-4 py-0 pl-0 text-sm data-[state=active]:rounded-none data-[state=active]:border-b-brand data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none "
                value={tab.value}
                key={tab.name}
                onClick={() => {
                  handleTabChange(tab.value);
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p
                      className={`${activeTab === tab.value ? "font-semibold" : ""} text-md `}
                    >
                      {tab.name}
                    </p>
                  </div>
                  <div
                    className={`h-[2px] w-8 ${activeTab === tab.value ? "bg-brand" : "bg-transparent"} `}
                  ></div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value={tabData[0].value}>
          <GeneralSettings />
        </TabsContent>
        <TabsContent value={tabData[1].value}>
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <div>
      <p className="font-semibold">Change user name</p>
      <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">User name</Label>
        <Input
          type="text"
          id="name"
          className="border-black"
          placeholder="Mark Kohn"
        />
      </div>
      <Button className="mt-4">Update</Button>

      <p className="mt-8 font-semibold">Change Password</p>
      <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="oldPassword">Old Password</Label>
        <Input
          type="password"
          id="oldPassword"
          className="mb-4 border-black"
          // placeholder="Mark Kohn"
        />

        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          className="mb-4 border-black"
          // placeholder="Mark Kohn"
        />

        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input type="password" id="confirmPassword" className="border-black" />
      </div>
      <Button className="mt-4">Update</Button>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="grid w-full grid-cols-2 items-center gap-6">
      {/* <Label htmlFor="email-notification">Email Notification</Label> */}
      <div className="flex flex-col gap-2">
        <Label className="font-semibold">E-mail Notification</Label>
        <p className="font-thin">
          These are notifications for comments and relies to your comments{" "}
        </p>
      </div>
      <Switch id="email-notification" />

      <div className="flex flex-col gap-2">
        <Label className="font-semibold" htmlFor="billing-alert">
          Billing Allert
        </Label>
        <p className="font-thin">
          These are notifications for comments and relies to your comments
        </p>
      </div>
      <Switch id="billing-alert" />

      <div className="flex flex-col gap-2">
        <Label className="font-semibold" htmlFor="appointment">
          Appointment
        </Label>
        <p className="font-thin">
          These are notifications for comments and relies to your comments
        </p>
      </div>
      <Switch id="appointment" />

      <div className="flex flex-col gap-2">
        <Label className="font-semibold" htmlFor="calender">
          Calender
        </Label>
        <p className="font-thin">
          These are notifications for comments and relies to your comments
        </p>
      </div>
      <Switch id="calender" />

      <div className="flex flex-col gap-2">
        <Label className="font-semibold" htmlFor="message">
          Messsage
        </Label>
        <p className="font-thin">
          These are notifications for comments and relies to your comments
        </p>
      </div>
      <Switch id="message" />
    </div>
  );
};
