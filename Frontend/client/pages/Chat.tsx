import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
} from "lucide-react";

const activityChats = [
  {
    id: "1",
    activityName: "Mount Fuji Sunrise Hike",
    activityDate: "2024-03-20",
    activityTime: "04:00",
    location: "Mount Fuji, Japan",
    host: "Kenji Tanaka",
    participants: [
      { id: 1, name: "Kenji Tanaka", avatar: null, isHost: true },
      { id: 2, name: "Sarah Chen", avatar: null, isHost: false },
      { id: 3, name: "Alex Rivera", avatar: null, isHost: false },
      { id: 4, name: "Emma Wilson", avatar: null, isHost: false },
      { id: 5, name: "Mike Johnson", avatar: null, isHost: false },
    ],
    messages: [
      {
        id: 1,
        sender: "Kenji Tanaka",
        senderId: 1,
        message: "Hello everyone! Welcome to our Mount Fuji hiking group! 🏔️",
        timestamp: "2024-03-10T10:00:00Z",
        type: "text",
      },
      {
        id: 2,
        sender: "Sarah Chen",
        senderId: 2,
        message:
          "Hi Kenji! So excited for this adventure! What should we bring?",
        timestamp: "2024-03-10T10:05:00Z",
        type: "text",
      },
      {
        id: 3,
        sender: "Kenji Tanaka",
        senderId: 1,
        message:
          "Great question! Here's what you'll need:\n• Warm layers (it gets cold!)\n• Headlamp/flashlight\n• Water and snacks\n• Good hiking boots\n• Camera for the sunrise! 📸",
        timestamp: "2024-03-10T10:10:00Z",
        type: "text",
      },
      {
        id: 4,
        sender: "Alex Rivera",
        senderId: 3,
        message:
          "Perfect! I'm bringing my camera gear. Can't wait to capture that sunrise!",
        timestamp: "2024-03-10T14:30:00Z",
        type: "text",
      },
      {
        id: 5,
        sender: "Emma Wilson",
        senderId: 4,
        message:
          "Question about the meeting point - where exactly are we meeting at 4 AM?",
        timestamp: "2024-03-11T09:15:00Z",
        type: "text",
      },
      {
        id: 6,
        sender: "Kenji Tanaka",
        senderId: 1,
        message:
          "We'll meet at Kawaguchiko Station. I'll be there with a TravelBuddy sign! 🚂",
        timestamp: "2024-03-11T09:20:00Z",
        type: "text",
      },
      {
        id: 7,
        sender: "Mike Johnson",
        senderId: 5,
        message:
          "Should we exchange phone numbers in case we need to contact each other?",
        timestamp: "2024-03-11T16:45:00Z",
        type: "text",
      },
      {
        id: 8,
        sender: "Sarah Chen",
        senderId: 2,
        message: "Good idea! My number is +81-XXX-XXXX-XXXX",
        timestamp: "2024-03-11T16:50:00Z",
        type: "text",
      },
      {
        id: 9,
        sender: "Alex Rivera",
        senderId: 3,
        message:
          "Just checked the weather forecast - looks perfect for our hike! Clear skies expected 🌤️",
        timestamp: "2024-03-12T12:00:00Z",
        type: "text",
      },
    ],
  },
];

export default function Chat() {
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(activityChats[0]?.messages || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 3; // Alex Rivera

  const chat =
    activityChats.find((chat) => chat.id === chatId) || activityChats[0];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Alex Rivera",
        senderId: currentUserId,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        type: "text" as const,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const groupMessagesByDate = (messages: typeof chat.messages) => {
    const groups: { [key: string]: typeof messages } = {};
    messages.forEach((message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-6 h-[80vh]">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to="/activities">
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                    </Button>
                    <div>
                      <CardTitle className="text-lg">
                        {chat.activityName}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(chat.activityDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {chat.location}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {Object.entries(messageGroups).map(
                      ([date, dayMessages]) => (
                        <div key={date}>
                          {/* Date Separator */}
                          <div className="flex items-center justify-center my-4">
                            <div className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                              {date}
                            </div>
                          </div>

                          {/* Messages for this date */}
                          <div className="space-y-3">
                            {dayMessages.map((msg) => {
                              const isCurrentUser =
                                msg.senderId === currentUserId;
                              const participant = chat.participants.find(
                                (p) => p.id === msg.senderId,
                              );

                              return (
                                <div
                                  key={msg.id}
                                  className={`flex items-start gap-3 ${
                                    isCurrentUser ? "flex-row-reverse" : ""
                                  }`}
                                >
                                  {!isCurrentUser && (
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage
                                        src={participant?.avatar || undefined}
                                      />
                                      <AvatarFallback className="text-xs">
                                        {participant?.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("") || ""}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}

                                  <div
                                    className={`max-w-[70%] ${
                                      isCurrentUser ? "text-right" : ""
                                    }`}
                                  >
                                    {!isCurrentUser && (
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-foreground">
                                          {msg.sender}
                                        </span>
                                        {participant?.isHost && (
                                          <Badge
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            Host
                                          </Badge>
                                        )}
                                      </div>
                                    )}

                                    <div
                                      className={`rounded-lg px-3 py-2 ${
                                        isCurrentUser
                                          ? "bg-primary text-primary-foreground ml-auto"
                                          : "bg-muted"
                                      }`}
                                    >
                                      <p className="text-sm whitespace-pre-wrap">
                                        {msg.message}
                                      </p>
                                    </div>

                                    <div
                                      className={`text-xs text-muted-foreground mt-1 ${
                                        isCurrentUser ? "text-right" : ""
                                      }`}
                                    >
                                      {formatTime(msg.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Activity Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {chat.activityName}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(chat.activityDate).toLocaleDateString()} at{" "}
                        {chat.activityTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{chat.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>{chat.participants.length} participants</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Participants ({chat.participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chat.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-3"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={participant.avatar || undefined} />
                        <AvatarFallback className="text-xs">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {participant.name}
                            {participant.id === currentUserId && " (You)"}
                          </span>
                          {participant.isHost && (
                            <Badge variant="secondary" className="text-xs">
                              Host
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  View Activity Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Leave Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
