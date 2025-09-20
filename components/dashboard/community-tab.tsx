"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCommunityReports } from "@/lib/mock-data"
import { ThumbsUp, MessageSquare, Plus, MapPin, Clock } from "lucide-react"

export function CommunityTab() {
  const [reports, setReports] = useState(mockCommunityReports)
  const [showReportForm, setShowReportForm] = useState(false)
  const [newReport, setNewReport] = useState({
    type: "",
    description: "",
    location: "",
  })

  const getReportIcon = (type: string) => {
    switch (type) {
      case "suspicious_person":
        return "👤"
      case "inappropriate_content":
        return "🚫"
      case "cyberbullying":
        return "💬"
      default:
        return "⚠️"
    }
  }

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "suspicious_person":
        return "destructive"
      case "inappropriate_content":
        return "default"
      case "cyberbullying":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
  }

  const upvoteReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) => (report.id === reportId ? { ...report, upvotes: report.upvotes + 1 } : report)),
    )
  }

  const submitReport = () => {
    if (!newReport.type || !newReport.description) return

    const report = {
      id: Date.now().toString(),
      reporterId: "current-user",
      reporterName: "You",
      type: newReport.type as any,
      description: newReport.description,
      location: newReport.location,
      timestamp: new Date(),
      verified: false,
      upvotes: 0,
    }

    setReports((prev) => [report, ...prev])
    setNewReport({ type: "", description: "", location: "" })
    setShowReportForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Community Safety</h2>
          <p className="text-muted-foreground">Share and view safety reports from your local community</p>
        </div>
        <Button onClick={() => setShowReportForm(!showReportForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Report Form */}
      {showReportForm && (
        <Card>
          <CardHeader>
            <CardTitle>Report a Safety Concern</CardTitle>
            <CardDescription>Help keep the community safe by reporting suspicious activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select
                value={newReport.type}
                onValueChange={(value) => setNewReport((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suspicious_person">Suspicious Person</SelectItem>
                  <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                  <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location (Optional)</label>
              <input
                type="text"
                placeholder="Where did this occur?"
                className="w-full p-2 border rounded-md"
                value={newReport.location}
                onChange={(e) => setNewReport((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe the safety concern in detail..."
                value={newReport.description}
                onChange={(e) => setNewReport((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={submitReport} disabled={!newReport.type || !newReport.description}>
                Submit Report
              </Button>
              <Button variant="outline" onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Community Reports */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{getReportIcon(report.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getReportTypeColor(report.type) as any}>
                        {report.type.replace("_", " ").toUpperCase()}
                      </Badge>
                      {report.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(report.timestamp)}
                    </div>
                  </div>

                  <p className="text-sm mb-3">{report.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Reported by {report.reporterName}</span>
                      {report.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => upvoteReport(report.id)}
                        className="flex items-center space-x-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{report.upvotes}</span>
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Discuss
                      </Button>
                    </div>
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
