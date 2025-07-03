import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  Settings,
  Bell,
  Plane,
  Camera,
  Mountain,
  Map,
  User,
  Clock,
} from "lucide-react";

const upcomingTrips = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    dates: "Mar 15 - Mar 25, 2024",
    daysLeft: 12,
    matchingTravelers: 8,
  },
  {
    id: 2,
    destination: "Barcelona, Spain",
    dates: "Apr 10 - Apr 20, 2024",
    daysLeft: 38,
    matchingTravelers: 5,
  },
];

const recentChats = [
  {
    id: 1,
    activityName: "Hiking Mt. Fuji",
    lastMessage: "See you at 6 AM tomorrow!",
    timestamp: "2 min ago",
    unreadCount: 3,
    avatar: null,
  },
  {
    id: 2,
    activityName: "Tokyo Food Tour",
    lastMessage: "The ramen place was amazing 🍜",
    timestamp: "15 min ago",
    unreadCount: 0,
    avatar: null,
  },
  {
    id: 3,
    activityName: "Shibuya Night Photography",
    lastMessage: "Here are my shots from last night",
    timestamp: "1 hour ago",
    unreadCount: 1,
    avatar: null,
  },
  {
    id: 4,
    activityName: "Co-working in Harajuku",
    lastMessage: "Great session today everyone!",
    timestamp: "3 hours ago",
    unreadCount: 0,
    avatar: null,
  },
  {
    id: 5,
    activityName: "Cherry Blossom Viewing",
    lastMessage: "Perfect weather for hanami 🌸",
    timestamp: "1 day ago",
    unreadCount: 2,
    avatar: null,
  },
];

const quickStats = [
  { label: "Active Trips", value: "2", icon: Calendar },
  { label: "Joined Activities", value: "8", icon: Users },
  { label: "New Matches", value: "13", icon: MapPin },
  { label: "Messages", value: "6", icon: MessageCircle },
];

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { firstName, lastName } = res.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-blue-50 via-white to-travel-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-white">
          <div className="absolute top-4 right-8 text-white/20 animate-float">
            <Mountain className="w-16 h-16" />
          </div>
          <div className="absolute bottom-4 right-16 text-white/20 animate-float" style={{ animationDelay: "1s" }}>
            <Plane className="w-12 h-12" />
          </div>
          <div className="absolute top-8 right-32 text-white/20 animate-float" style={{ animationDelay: "2s" }}>
            <Camera className="w-8 h-8" />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {userName || "Traveler"}! 👋
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Your next adventure awaits. Discover new travel companions and exciting activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="secondary" size="lg" className="shadow-lg">
                <Link to="/create" className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Activity
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/profile" className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Update Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Other components remain unchanged below */}
        {/* Quick Stats, Upcoming Trips, Interactive Map, Recent Chats, etc. */}
        {/* FloatingActionButtons is also included */}
        {/* You can keep the rest of your existing code here as is */}
        <FloatingActionButtons />
      </div>
    </div>
  );
}
