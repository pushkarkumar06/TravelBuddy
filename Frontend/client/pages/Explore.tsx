import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useAuth } from "../../context/AuthContext";
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
  Checkbox
} from "@/components/ui/checkbox";
import {
  MapPin,
  Calendar,
  Filter,
  MessageCircle,
  User,
  Search,
  Map,
} from "lucide-react";

const interestsList = [
  "Hiking", "Co-working", "Food", "Backpacking", "Photography", "Museums",
  "Culture", "Art", "Surfing", "Beach", "Music", "Cooking", "Markets", "Tech", "Startups",
];

export default function Explore() {
  const { userId } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedInterests.length > 0) params.interests = selectedInterests.join(",");

      const res = await axios.get("/users/explore", { params });
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, selectedInterests]);

  const handleInterestChange = (interest: string, checked: boolean) => {
    setSelectedInterests(prev =>
      checked ? [...prev, interest] : prev.filter(i => i !== interest)
    );
  };

  const filteredUsers = users.filter(user => user._id !== userId); // Avoid showing self

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explore Travelers</h1>
          <p className="text-muted-foreground text-lg">
            Discover fellow travelers near you or heading to similar destinations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="text-sm font-medium">
                    Search Location or Destination
                  </Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="City or country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2 max-h-48 overflow-y-auto">
                    {interestsList.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={(checked) =>
                            handleInterestChange(interest, checked as boolean)
                          }
                        />
                        <Label htmlFor={interest} className="text-sm cursor-pointer">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedInterests.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedInterests([]);
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
          <div className="lg:col-span-3 space-y-8">
            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-muted-foreground">Map integration coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Travelers Near You</h2>
                <p className="text-muted-foreground">{filteredUsers.length} travelers found</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredUsers.map((user) => (
                  <Card key={user._id} className="hover:shadow-lg transition-all hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.profilePicture || undefined} />
                          <AvatarFallback>
                            {user.firstName[0]}{user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {user.firstName} {user.lastName}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" /> {user.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{user.bio}</CardDescription>
                      <div>
                        <p className="text-sm font-medium mb-2">Interests</p>
                        <div className="flex flex-wrap gap-1">
                          {user.interests.map((interest: string) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" size="sm">
                          <User className="w-4 h-4 mr-2" /> View Profile
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" /> Invite to Activity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No travelers found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or filters
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <FloatingActionButtons showCreate={false} />
      </div>
    </div>
  );
}

