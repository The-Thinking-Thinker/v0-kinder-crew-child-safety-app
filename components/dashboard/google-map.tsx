"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Maximize2 } from "lucide-react"

interface Child {
  id: string
  name: string
  location: {
    lat: number
    lng: number
    address: string
    lastUpdated: Date
  }
  isOnline: boolean
  avatar?: string
}

interface GoogleMapProps {
  children: Child[]
  height?: string
}

export function GoogleMap({ children, height = "400px" }: GoogleMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })
  const [zoom, setZoom] = useState(12)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = "#212842"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw grid pattern to simulate map
    ctx.strokeStyle = "#2a3458"
    ctx.lineWidth = 1
    for (let x = 0; x < rect.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, rect.height)
      ctx.stroke()
    }
    for (let y = 0; y < rect.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Draw water areas (rivers/lakes)
    ctx.fillStyle = "#1a1f3a"
    ctx.beginPath()
    ctx.ellipse(rect.width * 0.3, rect.height * 0.7, 80, 30, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(rect.width * 0.8, rect.height * 0.2, 60, 40, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw roads
    ctx.strokeStyle = "#3a4563"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, rect.height * 0.5)
    ctx.lineTo(rect.width, rect.height * 0.5)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(rect.width * 0.6, 0)
    ctx.lineTo(rect.width * 0.6, rect.height)
    ctx.stroke()

    // Draw child markers
    children.forEach((child, index) => {
      if (child.location.lat === 0 && child.location.lng === 0) return

      // Convert lat/lng to canvas coordinates (mock conversion)
      const x = rect.width * 0.2 + index * 120 + Math.random() * 100
      const y = rect.height * 0.3 + index * 80 + Math.random() * 100

      // Draw marker circle
      ctx.fillStyle = child.isOnline ? "#10b981" : "#6b7280"
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Draw marker border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw inner dot
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw child name
      ctx.fillStyle = "#FOE7D5"
      ctx.font = "12px system-ui"
      ctx.textAlign = "center"
      ctx.fillText(child.name, x, y + 25)
    })

    // Draw center crosshair
    ctx.strokeStyle = "#FOE7D5"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(rect.width / 2 - 10, rect.height / 2)
    ctx.lineTo(rect.width / 2 + 10, rect.height / 2)
    ctx.moveTo(rect.width / 2, rect.height / 2 - 10)
    ctx.lineTo(rect.width / 2, rect.height / 2 + 10)
    ctx.stroke()
    ctx.setLineDash([])
  }, [children, mapCenter, zoom])

  const centerOnChild = (child: Child) => {
    if (child.location.lat === 0) return
    setSelectedChild(child)
    setMapCenter({ lat: child.location.lat, lng: child.location.lng })
    setZoom(16)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Map View</CardTitle>
            <CardDescription>Real-time location of all children</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            style={{ height }}
            className="w-full rounded-lg border cursor-pointer"
            onClick={() => setSelectedChild(null)}
          />

          {/* Info Window */}
          {selectedChild && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <h3 className="font-semibold text-[#212842] mb-2">{selectedChild.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{selectedChild.location.address}</p>
              <p className="text-xs text-gray-500 mb-2">
                Last updated: {selectedChild.location.lastUpdated.toLocaleTimeString()}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs text-white ${
                  selectedChild.isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {selectedChild.isOnline ? "Online" : "Offline"}
              </span>
              <button
                onClick={() => setSelectedChild(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {children.map((child) => (
            <Button
              key={child.id}
              variant="outline"
              size="sm"
              onClick={() => centerOnChild(child)}
              className="flex items-center space-x-2"
            >
              <div className={`w-2 h-2 rounded-full ${child.isOnline ? "bg-green-500" : "bg-gray-500"}`} />
              <span>{child.name}</span>
              <Navigation className="h-3 w-3" />
            </Button>
          ))}
        </div>

        {/* Map Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>Offline</span>
            </div>
          </div>
          <span>Click markers for details</span>
        </div>
      </CardContent>
    </Card>
  )
}
