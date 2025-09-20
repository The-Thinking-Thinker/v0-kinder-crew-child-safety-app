"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockChildren } from "@/lib/mock-data"
import { Shield, Clock, Globe } from "lucide-react"

export function ContentFilterTab() {
  const [selectedChild, setSelectedChild] = useState(mockChildren[0].id)
  const [filterSettings, setFilterSettings] = useState({
    [mockChildren[0].id]: {
      safeSearch: true,
      blockAdultContent: true,
      blockViolence: true,
      blockGambling: true,
      socialMediaRestricted: true,
      screenTimeLimit: 240, // minutes
      bedtimeMode: true,
      allowedCategories: {
        educational: true,
        entertainment: true,
        social: false,
        gaming: true,
        news: true,
      },
    },
    [mockChildren[1].id]: {
      safeSearch: true,
      blockAdultContent: true,
      blockViolence: true,
      blockGambling: true,
      socialMediaRestricted: true,
      screenTimeLimit: 180, // minutes
      bedtimeMode: true,
      allowedCategories: {
        educational: true,
        entertainment: true,
        social: false,
        gaming: false,
        news: false,
      },
    },
  })

  const selectedChildData = mockChildren.find((child) => child.id === selectedChild)
  const currentSettings = filterSettings[selectedChild]

  const updateSetting = (key: string, value: any) => {
    setFilterSettings((prev) => ({
      ...prev,
      [selectedChild]: {
        ...prev[selectedChild],
        [key]: value,
      },
    }))
  }

  const updateCategory = (category: string, value: boolean) => {
    setFilterSettings((prev) => ({
      ...prev,
      [selectedChild]: {
        ...prev[selectedChild],
        allowedCategories: {
          ...prev[selectedChild].allowedCategories,
          [category]: value,
        },
      },
    }))
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Filtering</h2>
        <p className="text-muted-foreground">Configure internet safety and content restrictions for your children</p>
      </div>

      {/* Child Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Child</CardTitle>
          <CardDescription>Choose which child's settings to configure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {mockChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  selectedChild === child.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{child.name}</p>
                  <p className="text-xs text-muted-foreground">Age {child.age}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedChildData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Basic Protection</span>
              </CardTitle>
              <CardDescription>Essential safety filters and restrictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Safe Search</p>
                  <p className="text-xs text-muted-foreground">Filter explicit content from search results</p>
                </div>
                <Switch
                  checked={currentSettings.safeSearch}
                  onCheckedChange={(value) => updateSetting("safeSearch", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Block Adult Content</p>
                  <p className="text-xs text-muted-foreground">Prevent access to mature websites</p>
                </div>
                <Switch
                  checked={currentSettings.blockAdultContent}
                  onCheckedChange={(value) => updateSetting("blockAdultContent", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Block Violence</p>
                  <p className="text-xs text-muted-foreground">Filter violent content and imagery</p>
                </div>
                <Switch
                  checked={currentSettings.blockViolence}
                  onCheckedChange={(value) => updateSetting("blockViolence", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Block Gambling</p>
                  <p className="text-xs text-muted-foreground">Prevent access to gambling sites</p>
                </div>
                <Switch
                  checked={currentSettings.blockGambling}
                  onCheckedChange={(value) => updateSetting("blockGambling", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Restrict Social Media</p>
                  <p className="text-xs text-muted-foreground">Limit social media access</p>
                </div>
                <Switch
                  checked={currentSettings.socialMediaRestricted}
                  onCheckedChange={(value) => updateSetting("socialMediaRestricted", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Screen Time Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Screen Time Controls</span>
              </CardTitle>
              <CardDescription>Manage daily usage limits and schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Daily Screen Time Limit</p>
                  <Badge variant="outline">{formatTime(currentSettings.screenTimeLimit)}</Badge>
                </div>
                <Slider
                  value={[currentSettings.screenTimeLimit]}
                  onValueChange={(value) => updateSetting("screenTimeLimit", value[0])}
                  max={480} // 8 hours
                  min={60} // 1 hour
                  step={30}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1h</span>
                  <span>8h</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Bedtime Mode</p>
                  <p className="text-xs text-muted-foreground">Automatically restrict access at night</p>
                </div>
                <Switch
                  checked={currentSettings.bedtimeMode}
                  onCheckedChange={(value) => updateSetting("bedtimeMode", value)}
                />
              </div>

              {currentSettings.bedtimeMode && (
                <div className="pl-4 border-l-2 border-muted">
                  <p className="text-xs text-muted-foreground mb-2">Bedtime Schedule</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-muted-foreground">Sleep Time</label>
                      <input type="time" defaultValue="21:00" className="w-full p-1 border rounded" />
                    </div>
                    <div>
                      <label className="block text-muted-foreground">Wake Time</label>
                      <input type="time" defaultValue="07:00" className="w-full p-1 border rounded" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Categories */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Allowed Content Categories</span>
              </CardTitle>
              <CardDescription>Choose which types of content your child can access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    key: "educational",
                    label: "Educational",
                    icon: "📚",
                    description: "Learning and educational content",
                  },
                  {
                    key: "entertainment",
                    label: "Entertainment",
                    icon: "🎬",
                    description: "Movies, TV shows, and videos",
                  },
                  { key: "social", label: "Social Media", icon: "💬", description: "Social networking platforms" },
                  { key: "gaming", label: "Gaming", icon: "🎮", description: "Video games and gaming content" },
                  { key: "news", label: "News", icon: "📰", description: "News and current events" },
                ].map((category) => (
                  <div key={category.key} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="text-2xl">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{category.label}</p>
                        <Switch
                          checked={
                            currentSettings.allowedCategories[
                              category.key as keyof typeof currentSettings.allowedCategories
                            ]
                          }
                          onCheckedChange={(value) => updateCategory(category.key, value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button>Save Filter Settings</Button>
      </div>
    </div>
  )
}
