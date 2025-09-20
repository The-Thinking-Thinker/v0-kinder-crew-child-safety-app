"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Shield, Users, MapPin, Filter, Bell, LogOut } from "lucide-react"
import { ChildrenTab } from "./children-tab"
import { LocationTab } from "./location-tab"
import { AlertsTab } from "./alerts-tab"
import { CommunityTab } from "./community-tab"
import { ContentFilterTab } from "./content-filter-tab"

export function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">KinderCrew</h1>
              <p className="text-sm text-muted-foreground">Child Safety Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Shield },
              { id: "children", label: "Children", icon: Users },
              { id: "location", label: "Location", icon: MapPin },
              { id: "filtering", label: "Content Filter", icon: Filter },
              { id: "community", label: "Community", icon: Users },
              { id: "alerts", label: "Alerts", icon: Bell },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">Monitor your children's digital safety and activity</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Children</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Currently monitored</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Screen Time Today</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2h</div>
                  <p className="text-xs text-muted-foreground">Average across children</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Overall safety rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your children's devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Emma - Safe browsing session</p>
                      <p className="text-xs text-muted-foreground">Educational content on Khan Academy - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Alex - Screen time limit reached</p>
                      <p className="text-xs text-muted-foreground">Gaming apps blocked for today - 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Emma - Suspicious contact attempt</p>
                      <p className="text-xs text-muted-foreground">Unknown number blocked - 3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "children" && <ChildrenTab />}
        {activeTab === "location" && <LocationTab />}
        {activeTab === "filtering" && <ContentFilterTab />}
        {activeTab === "community" && <CommunityTab />}
        {activeTab === "alerts" && <AlertsTab />}
      </main>
    </div>
  )
}
