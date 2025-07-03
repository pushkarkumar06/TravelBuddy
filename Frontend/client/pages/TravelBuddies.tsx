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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Filter,
  Search,
  Map,
  Plane,
  MessageCircle,
  User,
  Users,
  Globe,
  Navigation,
} from "lucide-react";

const travelBuddies = [
  {
    id: 1,
    name: "Sarah Chen",
    bio: "Digital nomad exploring Southeast Asia",
    currentLocation: "Bangkok, Thailand",
    nextDestination: "Chiang Mai, Thailand",
    travelDates: "Mar 15 - Mar 25, 2024",
    avatar: null,
    interests: ["Backpacking", "Food", "Co-working"],
    distance: "2.3 km away",
    languages: ["English", "Mandarin"],
    travelStyle: "Budget",
    age: 28,
  },
  {
    id: 2,
    name: "Alex Rivera",
    bio: "Adventure photographer seeking hiking buddies",
    currentLocation: "Barcelona, Spain",
    nextDestination: "Lisbon, Portugal",
    travelDates: "Apr 10 - Apr 20, 2024",
    avatar: null,
    interests: ["Hiking", "Photography", "Museums"],
    distance: "5.1 km away",
    languages: ["English", "Spanish"],
    travelStyle: "Mid-range",
    age: 32,
  },
  {
    id: 3,
    name: "Emma Johnson",
    bio: "Solo traveler looking for cultural experiences",
    currentLocation: "Tokyo, Japan",
    nextDestination: "Kyoto, Japan",
    travelDates: "Mar 20 - Mar 30, 2024",
    avatar: null,
    interests: ["Culture", "Food", "Art"],
    distance: "12.8 km away",
    languages: ["English", "Japanese"],
    travelStyle: "Luxury",
    age: 25,
  },
  {
    id: 4,
    name: "Marco Silva",
    bio: "Surf enthusiast and beach lover",
    currentLocation: "Lisbon, Portugal",
    nextDestination: "Morocco",
    travelDates: "May 1 - May 15, 2024",
    avatar: null,
    interests: ["Surfing", "Beach", "Music"],
    distance: "18.5 km away",
    languages: ["Portuguese", "Spanish", "English"],
    travelStyle: "Budget",
    age: 29,
  },
  {
    id: 5,
    name: "Zoe Kim",
    bio: "Foodie exploring local cuisines",
    currentLocation: "Seoul, South Korea",
    nextDestination: "Ho Chi Minh City, Vietnam",
    travelDates: "Apr 5 - Apr 18, 2024",
    avatar: null,
    interests: ["Food", "Cooking", "Markets"],
    distance: "3.7 km away",
    languages: ["Korean", "English"],
    travelStyle: "Mid-range",
    age: 26,
  },
  {
    id: 6,
    name: "Jake Thompson",
    bio: "Remote worker seeking co-working spaces",
    currentLocation: "Mexico City, Mexico",
    nextDestination: "San José, Costa Rica",
    travelDates: "Mar 25 - Apr 8, 2024",
    avatar: null,
    interests: ["Co-working", "Tech", "Startups"],
    distance: "8.9 km away",
    languages: ["English", "Spanish"],
    travelStyle: "Mid-range",
    age: 31,
  },
];

const destinations = [
  { name: "Tokyo, Japan", travelers: 23, flag: "🇯🇵" },
  { name: "Barcelona, Spain", travelers: 18, flag: "🇪🇸" },
  { name: "Bangkok, Thailand", travelers: 31, flag: "🇹🇭" },
  { name: "Lisbon, Portugal", travelers: 15, flag: "🇵🇹" },
  { name: "Mexico City, Mexico", travelers: 12, flag: "🇲🇽" },
  { name: "Seoul, South Korea", travelers: 20, flag: "🇰🇷" },
];

export default function TravelBuddies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedTravelStyle, setSelectedTravelStyle] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [activeTab, setActiveTab] = useState("nearby");

  const filteredBuddies = travelBuddies.filter((buddy) => {
    const matchesSearch =
      buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.nextDestination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDestination =
      !selectedDestination ||
      selectedDestination === "all" ||
      buddy.currentLocation.includes(selectedDestination) ||
      buddy.nextDestination.includes(selectedDestination);

    const matchesTravelStyle =
      !selectedTravelStyle ||
      selectedTravelStyle === "all" ||
      buddy.travelStyle === selectedTravelStyle;

    const matchesAge = () => {
      if (!selectedAgeRange || selectedAgeRange === "all") return true;
      if (selectedAgeRange === "18-25")
        return buddy.age >= 18 && buddy.age <= 25;
      if (selectedAgeRange === "26-35")
        return buddy.age >= 26 && buddy.age <= 35;
      if (selectedAgeRange === "36-45")
        return buddy.age >= 36 && buddy.age <= 45;
      if (selectedAgeRange === "46+") return buddy.age >= 46;
      return true;
    };

    return (
      matchesSearch && matchesDestination && matchesTravelStyle && matchesAge()
    );
  });

  const nearbyBuddies = filteredBuddies.filter(
    (buddy) => parseFloat(buddy.distance.split(" ")[0]) <= 10,
  );

  const sameDestionationBuddies = filteredBuddies.filter(
    (buddy) =>
      buddy.nextDestination.toLowerCase().includes("tokyo") ||
      buddy.nextDestination.toLowerCase().includes("japan"),
  );

  const TravelBuddyCard = ({ buddy }: { buddy: (typeof travelBuddies)[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={buddy.avatar || undefined} />
              <AvatarFallback>
                {buddy.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{buddy.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                {buddy.currentLocation}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Navigation className="w-3 h-3" />
                {buddy.distance}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {buddy.travelStyle}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>{buddy.bio}</CardDescription>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Next destination:
            </span>
            <span className="text-muted-foreground">
              {buddy.nextDestination}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Travel dates:</span>
            <span className="text-muted-foreground">{buddy.travelDates}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Languages:</span>
            <span className="text-muted-foreground">
              {buddy.languages.join(", ")}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
            Interests
          </h4>
          <div className="flex flex-wrap gap-1">
            {buddy.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm">
            <User className="w-4 h-4 mr-2" />
            View Profile
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Travel Buddies
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover fellow travelers near you or heading to your destination
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="text-sm font-medium">
                    Search
                  </Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Name, location, or interests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <Label className="text-sm font-medium">Destination</Label>
                  <Select
                    value={selectedDestination}
                    onValueChange={setSelectedDestination}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Any destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any destination</SelectItem>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.name} value={dest.name}>
                          {dest.flag} {dest.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Travel Style */}
                <div>
                  <Label className="text-sm font-medium">Travel Style</Label>
                  <Select
                    value={selectedTravelStyle}
                    onValueChange={setSelectedTravelStyle}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Any style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any style</SelectItem>
                      <SelectItem value="Budget">Budget</SelectItem>
                      <SelectItem value="Mid-range">Mid-range</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Range */}
                <div>
                  <Label className="text-sm font-medium">Age Range</Label>
                  <Select
                    value={selectedAgeRange}
                    onValueChange={setSelectedAgeRange}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Any age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any age</SelectItem>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-35">26-35</SelectItem>
                      <SelectItem value="36-45">36-45</SelectItem>
                      <SelectItem value="46+">46+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                {(searchQuery ||
                  (selectedDestination && selectedDestination !== "all") ||
                  (selectedTravelStyle && selectedTravelStyle !== "all") ||
                  (selectedAgeRange && selectedAgeRange !== "all")) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDestination("all");
                      setSelectedTravelStyle("all");
                      setSelectedAgeRange("all");
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-travel-blue-50 to-travel-green-50 flex items-center justify-center relative overflow-hidden">
                  {/* Decorative map pins */}
                  <div className="absolute top-1/4 left-1/3 text-primary animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div
                    className="absolute top-1/2 right-1/4 text-accent animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div
                    className="absolute bottom-1/3 left-1/2 text-primary animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>

                  <div className="text-center z-10">
                    <Map className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Interactive Travel Map
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      See travel buddies on the map (coming soon)
                    </p>
                    <Button variant="outline">
                      <Navigation className="w-4 h-4 mr-2" />
                      Enable Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Popular Destinations
                </CardTitle>
                <CardDescription>
                  Most active travel destinations right now
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destinations.map((destination) => (
                    <div
                      key={destination.name}
                      className="p-3 rounded-lg border bg-card hover:shadow-md transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedDestination(destination.name)}
                    >
                      <div className="text-2xl mb-2">{destination.flag}</div>
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        {destination.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {destination.travelers} travelers
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Travel Buddies Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="nearby">
                  Nearby ({nearbyBuddies.length})
                </TabsTrigger>
                <TabsTrigger value="destination">
                  Same Destination ({sameDestionationBuddies.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nearby" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Travel Buddies Near You
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {nearbyBuddies.map((buddy) => (
                      <TravelBuddyCard key={buddy.id} buddy={buddy} />
                    ))}
                  </div>
                  {nearbyBuddies.length === 0 && (
                    <Card>
                      <CardContent className="text-center py-12">
                        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No nearby travelers found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria or expanding your
                          location radius
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="destination" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Travelers Going to Your Destination
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sameDestionationBuddies.map((buddy) => (
                      <TravelBuddyCard key={buddy.id} buddy={buddy} />
                    ))}
                  </div>
                  {sameDestionationBuddies.length === 0 && (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No travelers found for this destination
                        </h3>
                        <p className="text-muted-foreground">
                          Be the first to plan a trip to this destination or try
                          searching for other locations
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <FloatingActionButtons showCreate={false} />
      </div>
    </div>
  );
}
