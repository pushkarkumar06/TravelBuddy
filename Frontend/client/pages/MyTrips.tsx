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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Plus,
  Users,
  Edit,
  Trash2,
  Plane,
  Clock,
  Globe,
} from "lucide-react";

export default function MyTrips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: "Tokyo, Japan",
      country: "Japan",
      startDate: "2024-03-15",
      endDate: "2024-03-25",
      status: "upcoming",
      matchingTravelers: [
        { id: 1, name: "Sarah Chen", avatar: null, overlap: "Full trip" },
        { id: 2, name: "Mike Johnson", avatar: null, overlap: "Mar 18-22" },
        { id: 3, name: "Emma Wilson", avatar: null, overlap: "Mar 20-25" },
      ],
    },
    {
      id: 2,
      destination: "Barcelona, Spain",
      country: "Spain",
      startDate: "2024-04-10",
      endDate: "2024-04-20",
      status: "upcoming",
      matchingTravelers: [
        { id: 4, name: "Carlos Silva", avatar: null, overlap: "Full trip" },
        { id: 5, name: "Anna Martinez", avatar: null, overlap: "Apr 15-20" },
      ],
    },
    {
      id: 3,
      destination: "Bali, Indonesia",
      country: "Indonesia",
      startDate: "2024-01-15",
      endDate: "2024-01-30",
      status: "completed",
      matchingTravelers: [
        { id: 6, name: "Lisa Park", avatar: null, overlap: "Jan 20-25" },
      ],
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
  });
  const handleAddTrip = () => {
    if (newTrip.destination && newTrip.startDate && newTrip.endDate) {
      const trip = {
        id: Date.now(),
        destination: newTrip.destination,
        country: newTrip.destination.split(", ")[1] || "Unknown",
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        status: "upcoming" as const,
        matchingTravelers: [],
      };
      setTrips([...trips, trip]);
      setNewTrip({ destination: "", startDate: "", endDate: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteTrip = (tripId: number) => {
    setTrips(trips.filter((trip) => trip.id !== tripId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const tripDate = new Date(dateString);
    const diffTime = tripDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingTrips = trips.filter((trip) => trip.status === "upcoming");
  const completedTrips = trips.filter((trip) => trip.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Trips
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your travel plans and connect with fellow travelers
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="mt-4 md:mt-0">
                <Plus className="w-5 h-5 mr-2" />
                Add New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Trip</DialogTitle>
                <DialogDescription>
                  Add your travel plans to find matching travelers and
                  activities.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    value={newTrip.destination}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, destination: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newTrip.startDate}
                      onChange={(e) =>
                        setNewTrip({ ...newTrip, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newTrip.endDate}
                      onChange={(e) =>
                        setNewTrip({ ...newTrip, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddTrip}>Add Trip</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Upcoming Trips */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Upcoming Trips
            </h2>
            <Badge variant="secondary">{upcomingTrips.length}</Badge>
          </div>

          {upcomingTrips.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No upcoming trips planned
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add your first trip to start connecting with fellow travelers
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Plan Your First Trip
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <Card
                  key={trip.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {trip.destination}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(trip.startDate)} -{" "}
                            {formatDate(trip.endDate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteTrip(trip.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {getDaysUntil(trip.startDate)} days to go
                        </span>
                      </div>
                      <Badge variant="outline">
                        {trip.matchingTravelers.length} matching travelers
                      </Badge>
                    </div>

                    {trip.matchingTravelers.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">
                          Matching Travelers
                        </h4>
                        <div className="space-y-2">
                          {trip.matchingTravelers
                            .slice(0, 3)
                            .map((traveler) => (
                              <div
                                key={traveler.id}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage
                                      src={traveler.avatar || undefined}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {traveler.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">
                                    {traveler.name}
                                  </span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {traveler.overlap}
                                </Badge>
                              </div>
                            ))}
                          {trip.matchingTravelers.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{trip.matchingTravelers.length - 3} more
                              travelers
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        View Matches
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        Find Activities
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Completed Trips */}
        {completedTrips.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground">
                Past Trips
              </h2>
              <Badge variant="outline">{completedTrips.length}</Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {completedTrips.map((trip) => (
                <Card
                  key={trip.id}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          {trip.destination}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(trip.startDate)} -{" "}
                          {formatDate(trip.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Connected with {trip.matchingTravelers.length} travelers
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <FloatingActionButtons showCreate={false} />
      </div>
    </div>
  );
}
