import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";

interface Notification {
  _id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`/notifications/${id}/read`);
      fetchNotifications(); // Refresh list
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };

  // Optional: delete notification
  // const deleteNotification = async (id: string) => {
  //   try {
  //     await axios.delete(`/notifications/${id}`);
  //     fetchNotifications();
  //   } catch (err) {
  //     console.error("Failed to delete notification", err);
  //   }
  // };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <div
            key={notif._id}
            className={`p-4 border rounded mb-2 ${notif.read ? "bg-muted" : "bg-white"}`}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">{notif.message}</p>
              <div className="flex gap-2">
                {!notif.read && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markAsRead(notif._id)}
                  >
                    Mark as Read
                  </Button>
                )}
                {/* <Button size="sm" variant="destructive" onClick={() => deleteNotification(notif._id)}>
                  Delete
                </Button> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No notifications found.</p>
      )}
    </div>
  );
}


