import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  Clock,
  Star,
  MessageCircle,
  Mountain,
  Utensils,
  Camera,
  Briefcase,
  Music,
  Waves,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Mount Fuji Sunrise Hike",
    description:
      "Early morning hike to catch the spectacular sunrise from Mount Fuji's peak",
    host: { name: "Kenji Tanaka", avatar: null, rating: 4.9 },
    category: "Hiking",
    date: "2024-03-20",
    time: "04:00",
    location: "Mount Fuji, Japan",
    maxParticipants: 8,
    currentParticipants: 6,
    price: "¥3,500",
    status: "open",
    tags: ["Adventure", "Nature", "Photography"],
    icon: Mountain,
  },
  {
    id: 2,
    title: "Tokyo Street Food Tour",
    description: "Explore hidden gems and taste authentic Japanese street food",
    host: { name: "Sarah Chen", avatar: null, rating: 4.8 },
    category: "Food",
    date: "2024-03-18",
    time: "18:00",
    location: "Shibuya, Tokyo",
    maxParticipants: 6,
    currentParticipants: 4,
    price: "¥2,800",
    status: "open",
    tags: ["Food", "Culture", "Local"],
    icon: Utensils,
  },
  {
    id: 3,
    title: "Night Photography Walk",
    description: "Capture Tokyo's neon-lit streets and vibrant nightlife",
    host: { name: "Alex Rivera", avatar: null, rating: 4.7 },
    category: "Photography",
    date: "2024-03-19",
    time: "20:00",
    location: "Harajuku, Tokyo",
    maxParticipants: 5,
    currentParticipants: 5,
    price: "¥1,500",
    status: "full",
    tags: ["Photography", "Night", "Urban"],
    icon: Camera,
  },
  {
    id: 4,
    title: "Co-working & Coffee",
    description:
      "Productive work session at a beautiful cafe with mountain views",
    host: { name: "Emma Wilson", avatar: null, rating: 4.9 },
    category: "Co-working",
    date: "2024-03-21",
    time: "09:00",
    location: "Kamakura, Japan",
    maxParticipants: 10,
    currentParticipants: 7,
    price: "¥800",
    status: "open",
    tags: ["Work", "Networking", "Coffee"],
    icon: Briefcase,
  },
  {
    id: 5,
    title: "Traditional Jazz Club Night",
    description: "Experience authentic Japanese jazz in an intimate setting",
    host: { name: "Yuki Sato", avatar: null, rating: 4.6 },
    category: "Music",
    date: "2024-03-22",
    time: "21:00",
    location: "Blue Note Tokyo",
    maxParticipants: 8,
    currentParticipants: 3,
    price: "¥4,200",
    status: "open",
    tags: ["Music", "Culture", "Nightlife"],
    icon: Music,
  },
  {
    id: 6,
    title: "Surfing Lesson in Shonan",
    description:
      "Learn to surf with experienced instructors at beautiful Shonan Beach",
    host: { name: "Marco Silva", avatar: null, rating: 4.8 },
    category: "Surfing",
    date: "2024-03-23",
    time: "08:00",
    location: "Shonan Beach, Japan",
    maxParticipants: 6,
    currentParticipants: 2,
    price: "¥5,500",
    status: "open",
    tags: ["Surfing", "Beach", "Lesson"],
    icon: Waves,
  },
];

const categories = [
  "All",
  "Hiking",
  "Food",
  "Photography",
  "Co-working",
  "Music",
  "Surfing",
];

export default function Activities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [joinedActivities, setJoinedActivities] = useState<number[]>([2, 4]);

  const handleJoinActivity = (activityId: number) => {
    setJoinedActivities([...joinedActivities, activityId]);
  };

  const handleLeaveActivity = (activityId: number) => {
    setJoinedActivities(joinedActivities.filter((id) => id !== activityId));
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || activity.category === selectedCategory;

    const matchesDate = !selectedDate || activity.date === selectedDate;

    return matchesSearch && matchesCategory && matchesDate;
  });

  const myActivities = activities.filter((activity) =>
    joinedActivities.includes(activity.id),
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const ActivityCard = ({
    activity,
    showJoinButton = true,
  }: {
    activity: (typeof activities)[0];
    showJoinButton?: boolean;
  }) => {
    const Icon = activity.icon;
    const isJoined = joinedActivities.includes(activity.id);
    const isFull = activity.status === "full";
    const spotsLeft = activity.maxParticipants - activity.currentParticipants;

    return (
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{activity.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {activity.category}
                  </Badge>
                  {isFull && (
                    <Badge variant="destructive" className="text-xs">
                      Full
                    </Badge>
                  )}
                  {isJoined && <Badge className="text-xs">Joined</Badge>}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-primary">{activity.price}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{activity.description}</CardDescription>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>
                {formatDate(activity.date)} at {activity.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>
                {activity.currentParticipants}/{activity.maxParticipants}{" "}
                participants
              </span>
              {spotsLeft <= 2 && spotsLeft > 0 && (
                <Badge variant="outline" className="text-xs">
                  {spotsLeft} spots left
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.host.avatar || undefined} />
                <AvatarFallback className="text-xs">
                  {activity.host.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{activity.host.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">
                    {activity.host.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {activity.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {showJoinButton && (
            <div className="flex gap-2 pt-2">
              {isJoined ? (
                <>
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    onClick={() => handleLeaveActivity(activity.id)}
                  >
                    Leave Activity
                  </Button>
                  <Button asChild className="flex-1" size="sm">
                    <Link
                      to={`/chat/${activity.id}`}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full"
                  size="sm"
                  disabled={isFull}
                  onClick={() => handleJoinActivity(activity.id)}
                >
                  {isFull
                    ? "Activity Full"
                    : `Join Activity - ${activity.price}`}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Activities
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover and join amazing activities with fellow travelers
            </p>
          </div>
          <Button asChild size="lg" className="mt-4 md:mt-0">
            <Link to="/create" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Activity
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-activities">
              My Activities ({myActivities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search" className="text-sm font-medium">
                      Search Activities
                    </Label>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by title, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Date</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                        setSelectedDate("");
                      }}
                      className="w-full"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No activities found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or create a new activity
                  </p>
                  <Button asChild>
                    <Link to="/create">Create New Activity</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-activities" className="space-y-6">
            {myActivities.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No joined activities yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start exploring and join activities to connect with fellow
                    travelers
                  </p>
                  <Button asChild>
                    <Link to="/activities">Discover Activities</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    showJoinButton={false}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <FloatingActionButtons showProfile={false} />
      </div>
    </div>
  );
}
