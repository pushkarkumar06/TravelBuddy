import { useState } from "react";
import { Button } from "@/components/ui/button";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Edit,
  Camera,
  MapPin,
  Calendar,
  Star,
  Upload,
  Save,
  Settings,
  Globe,
  Languages,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";

const userProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@email.com",
  bio: "Adventure photographer seeking hiking buddies and cultural experiences. Love exploring hidden gems and capturing beautiful moments.",
  location: "Barcelona, Spain",
  joinDate: "2023-08-15",
  rating: 4.8,
  totalActivities: 23,
  languages: ["English", "Spanish", "French"],
  interests: [
    "Photography",
    "Hiking",
    "Food",
    "Culture",
    "Architecture",
    "Museums",
    "Local Markets",
    "Street Art",
  ],
  avatar: null,
};

const upcomingDestinations = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    dates: "Mar 15 - Mar 25, 2024",
    status: "confirmed",
  },
  {
    id: 2,
    destination: "Bali, Indonesia",
    dates: "Apr 10 - Apr 20, 2024",
    status: "planning",
  },
];

const joinedActivities = [
  {
    id: 1,
    title: "Mount Fuji Sunrise Hike",
    date: "2024-03-20",
    host: "Kenji Tanaka",
    status: "upcoming",
    category: "Hiking",
  },
  {
    id: 2,
    title: "Tokyo Street Food Tour",
    date: "2024-03-18",
    host: "Sarah Chen",
    status: "upcoming",
    category: "Food",
  },
  {
    id: 3,
    title: "Barcelona Tapas Crawl",
    date: "2024-02-15",
    host: "Carlos Silva",
    status: "completed",
    category: "Food",
  },
  {
    id: 4,
    title: "Sagrada Familia Photography",
    date: "2024-02-08",
    host: "Maria Garcia",
    status: "completed",
    category: "Photography",
  },
];

export default function Profile() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [newInterest, setNewInterest] = useState("");

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    console.log("Profile updated:", editedProfile);
    setIsEditDialogOpen(false);
  };

  const handleAddInterest = () => {
    if (
      newInterest.trim() &&
      !editedProfile.interests.includes(newInterest.trim())
    ) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter((i) => i !== interest),
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={userProfile.avatar || undefined} />
                  <AvatarFallback className="text-3xl">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 rounded-full shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {userProfile.name}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {userProfile.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {formatDate(userProfile.joinDate)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {userProfile.rating}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          ({userProfile.totalActivities} activities)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Languages className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {userProfile.languages.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your profile information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editedProfile.name}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={editedProfile.bio}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                bio: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editedProfile.location}
                            onChange={(e) =>
                              setEditedProfile({
                                ...editedProfile,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Interests</Label>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add new interest..."
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddInterest();
                                  }
                                }}
                              />
                              <Button
                                onClick={handleAddInterest}
                                variant="outline"
                              >
                                Add
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {editedProfile.interests.map((interest) => (
                                <Badge
                                  key={interest}
                                  variant="secondary"
                                  className="cursor-pointer"
                                  onClick={() => handleRemoveInterest(interest)}
                                >
                                  {interest} ×
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">
                  {userProfile.bio}
                </p>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="destinations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Upcoming Destinations
                </CardTitle>
                <CardDescription>
                  Places you're planning to visit
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingDestinations.length === 0 ? (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No upcoming destinations
                    </p>
                    <Button>Add Your First Trip</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingDestinations.map((destination) => (
                      <div
                        key={destination.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {destination.destination}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {destination.dates}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            destination.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {destination.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Upcoming Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {joinedActivities
                      .filter((activity) => activity.status === "upcoming")
                      .map((activity) => (
                        <div
                          key={activity.id}
                          className="p-3 rounded-lg border bg-card"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">
                              {activity.title}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {activity.category}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {new Date(activity.date).toLocaleDateString()} •
                              Host: {activity.host}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <MessageCircle className="w-3 h-3 mr-2" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-muted-foreground" />
                    Past Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {joinedActivities
                      .filter((activity) => activity.status === "completed")
                      .map((activity) => (
                        <div
                          key={activity.id}
                          className="p-3 rounded-lg border bg-card opacity-75"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">
                              {activity.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {activity.category}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              {new Date(activity.date).toLocaleDateString()} •
                              Host: {activity.host}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account preferences and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Contact support to change your email address
                  </p>
                </div>

                <div>
                  <Label>Profile Visibility</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="public"
                        name="visibility"
                        defaultChecked
                      />
                      <Label htmlFor="public" className="text-sm">
                        Public - Visible to all travelers
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="private" name="visibility" />
                      <Label htmlFor="private" className="text-sm">
                        Private - Only visible to activity members
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">Delete Account</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    This action cannot be undone
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <FloatingActionButtons showProfile={false} />
      </div>
    </div>
  );
}
