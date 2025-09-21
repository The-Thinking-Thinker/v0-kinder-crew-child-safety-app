"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddChildDialog } from "./add-child-dialog"
import { mockChildren, mockScreenTimeData } from "@/lib/mock-data"
import { Clock, MapPin, Shield, Plus } from "lucide-react"

export function ChildrenTab() {
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [children, setChildren] = useState(mockChildren)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getScreenTimeProgress = (today: number, limit: number) => {
    return Math.min((today / limit) * 100, 100)
  }

  const getChildScreenTimeData = (childId: string) => {
    return mockScreenTimeData.filter((entry) => entry.childId === childId)
  }

  const handleAddChild = (newChild: any) => {
    setChildren((prev) => [...prev, newChild])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Children Management</h2>
          <p className="text-muted-foreground">Monitor and manage your children's digital activity</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Child
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children.map((child) => (
          <Card key={child.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={child.isOnline ? "default" : "secondary"}>
                        {child.isOnline ? "Online" : "Offline"}
                      </Badge>
                      <Badge variant="outline">Age {child.age}</Badge>
                    </div>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {child.location.address}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Safety Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Safety Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={child.safetyScore} className="w-20" />
                  <span className="text-sm font-bold">{child.safetyScore}%</span>
                </div>
              </div>

              {/* Screen Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Screen Time Today</span>
                  </div>
                  <span className="text-sm">
                    {formatTime(child.screenTime.today)} / {formatTime(child.screenTime.limit)}
                  </span>
                </div>
                <Progress
                  value={getScreenTimeProgress(child.screenTime.today, child.screenTime.limit)}
                  className="w-full"
                />
              </div>

              {/* Recent Apps */}
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                <div className="space-y-1">
                  {getChildScreenTimeData(child.id)
                    .slice(0, 3)
                    .map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              entry.category === "educational"
                                ? "bg-green-500"
                                : entry.category === "entertainment"
                                  ? "bg-blue-500"
                                  : entry.category === "gaming"
                                    ? "bg-purple-500"
                                    : entry.category === "social"
                                      ? "bg-pink-500"
                                      : "bg-gray-500"
                            }`}
                          />
                          <span className={entry.blocked ? "line-through text-muted-foreground" : ""}>{entry.app}</span>
                        </div>
                        <span className="text-muted-foreground">{formatTime(entry.duration)}</span>
                      </div>
                    ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setSelectedChild(selectedChild === child.id ? null : child.id)}
              >
                {selectedChild === child.id ? "Hide Details" : "View Details"}
              </Button>

              {/* Detailed Screen Time Log */}
              {selectedChild === child.id && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-base">Detailed Screen Time Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getChildScreenTimeData(child.id).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                entry.category === "educational"
                                  ? "bg-green-500"
                                  : entry.category === "entertainment"
                                    ? "bg-blue-500"
                                    : entry.category === "gaming"
                                      ? "bg-purple-500"
                                      : entry.category === "social"
                                        ? "bg-pink-500"
                                        : "bg-gray-500"
                              }`}
                            />
                            <div>
                              <p className={`text-sm font-medium ${entry.blocked ? "line-through" : ""}`}>
                                {entry.app}
                              </p>
                              {entry.website && <p className="text-xs text-muted-foreground">{entry.website}</p>}
                              <p className="text-xs text-muted-foreground">{entry.timestamp.toLocaleTimeString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatTime(entry.duration)}</p>
                            <Badge variant={entry.blocked ? "destructive" : "secondary"} className="text-xs">
                              {entry.blocked ? "Blocked" : entry.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AddChildDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAddChild={handleAddChild} />
    </div>
  )
}
