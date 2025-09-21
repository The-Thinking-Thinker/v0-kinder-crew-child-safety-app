"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, User } from "lucide-react"

interface AddChildDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddChild: (child: any) => void
}

export function AddChildDialog({ open, onOpenChange, onAddChild }: AddChildDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    school: "",
    emergencyContact: "",
    notes: "",
    avatar: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new child object
    const newChild = {
      id: `child-${Date.now()}`,
      name: formData.name,
      age: Number.parseInt(formData.age),
      grade: formData.grade,
      school: formData.school,
      emergencyContact: formData.emergencyContact,
      notes: formData.notes,
      avatar: formData.avatar || "/placeholder.svg",
      isOnline: false,
      location: {
        address: "Location not available",
        lat: 0,
        lng: 0,
        lastUpdated: new Date(),
      },
      safetyScore: 85,
      screenTime: {
        today: 0,
        limit: 120,
        weekly: 0,
      },
    }

    onAddChild(newChild)

    // Reset form
    setFormData({
      name: "",
      age: "",
      grade: "",
      school: "",
      emergencyContact: "",
      notes: "",
      avatar: "",
    })

    onOpenChange(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Child</DialogTitle>
          <DialogDescription>
            Add a new child to your KinderCrew dashboard for monitoring and protection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={formData.avatar || "/placeholder.svg"} alt="Child avatar" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                  <Upload className="h-4 w-4" />
                  <span>Upload Photo</span>
                </div>
              </Label>
              <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter child's name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Select value={formData.age} onValueChange={(value) => setFormData((prev) => ({ ...prev, age: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age} years old
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Class</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData((prev) => ({ ...prev, grade: e.target.value }))}
                placeholder="e.g., 5th Grade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => setFormData((prev) => ({ ...prev, school: e.target.value }))}
                placeholder="School name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
              placeholder="Phone number or contact info"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information about your child..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.age}>
              Add Child
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
