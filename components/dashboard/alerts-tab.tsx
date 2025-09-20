"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockAlerts, mockChildren } from "@/lib/mock-data"
import { AlertTriangle, Clock, CheckCircle, X } from "lucide-react"

export function AlertsTab() {
  const [alerts, setAlerts] = useState(mockAlerts)

  const getChildName = (childId: string) => {
    const child = mockChildren.find((c) => c.id === childId)
    return child?.name || "Unknown Child"
  }

  const getChildAvatar = (childId: string) => {
    const child = mockChildren.find((c) => c.id === childId)
    return child?.avatar || "/placeholder.svg?height=32&width=32"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "suspicious_contact":
        return "👤"
      case "cyberbullying":
        return "💬"
      case "inappropriate_content":
        return "🚫"
      case "screen_time":
        return "⏰"
      case "location":
        return "📍"
      default:
        return "⚠️"
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
  }

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const activeAlerts = alerts.filter((alert) => !alert.resolved)
  const resolvedAlerts = alerts.filter((alert) => alert.resolved)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Safety Alerts</h2>
        <p className="text-muted-foreground">Monitor and respond to safety concerns for your children</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{activeAlerts.filter((a) => a.severity === "high").length}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{activeAlerts.filter((a) => a.severity === "medium").length}</p>
                <p className="text-sm text-muted-foreground">Medium Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{resolvedAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Alerts requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No active alerts. Your children are safe!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={getChildAvatar(alert.childId) || "/placeholder.svg"}
                        alt={getChildName(alert.childId)}
                      />
                      <AvatarFallback>
                        {getChildName(alert.childId)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity.toUpperCase()}</Badge>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mb-3">Child: {getChildName(alert.childId)}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => dismissAlert(alert.id)}>
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Resolved</CardTitle>
            <CardDescription>Alerts that have been addressed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg opacity-75">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={getChildAvatar(alert.childId) || "/placeholder.svg"}
                      alt={getChildName(alert.childId)}
                    />
                    <AvatarFallback>
                      {getChildName(alert.childId)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-through">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {getChildName(alert.childId)} • {formatTimestamp(alert.timestamp)}
                    </p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
