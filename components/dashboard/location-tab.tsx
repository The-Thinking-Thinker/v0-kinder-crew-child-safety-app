"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockChildren } from "@/lib/mock-data"
import { MapPin, Clock, Navigation } from "lucide-react"

export function LocationTab() {
  const formatLastUpdated = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Live Location Tracking</h2>
        <p className="text-muted-foreground">Monitor your children's real-time location and movement history</p>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Live Map View</CardTitle>
          <CardDescription>Real-time location of all children</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
              <p className="text-xs text-muted-foreground mt-1">
                Showing live locations of {mockChildren.length} children
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockChildren.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={child.isOnline ? "default" : "secondary"}>
                      {child.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Location */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Current Location</span>
                </div>
                <p className="text-sm pl-6">{child.location.address}</p>
                <div className="flex items-center space-x-2 pl-6">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Last updated {formatLastUpdated(child.location.lastUpdated)}
                  </span>
                </div>
              </div>

              {/* Coordinates */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Coordinates</span>
                </div>
                <p className="text-xs text-muted-foreground pl-6">
                  {child.location.lat.toFixed(6)}, {child.location.lng.toFixed(6)}
                </p>
              </div>

              {/* Location History */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Locations</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span>Lincoln Elementary School</span>
                    <span className="text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span>Home - 123 Main St</span>
                    <span className="text-muted-foreground">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span>Central Park</span>
                    <span className="text-muted-foreground">Yesterday</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
