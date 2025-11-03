"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddSavingsGoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    name: string
    targetAmount: number
    currentAmount: number
    targetDate?: string
    description?: string
  }) => void
}

export function AddSavingsGoalModal({ open, onOpenChange, onSubmit }: AddSavingsGoalModalProps) {
  const [name, setName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("0")
  const [targetDate, setTargetDate] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!name || !targetAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const numTarget = Number.parseFloat(targetAmount)
    const numCurrent = Number.parseFloat(currentAmount)

    if (numTarget <= 0) {
      toast({
        title: "Error",
        description: "Target amount must be greater than 0",
        variant: "destructive",
      })
      return
    }

    if (numCurrent < 0) {
      toast({
        title: "Error",
        description: "Current amount cannot be negative",
        variant: "destructive",
      })
      return
    }

    onSubmit({
      name,
      targetAmount: numTarget,
      currentAmount: numCurrent,
      targetDate: targetDate || undefined,
      description: description || undefined,
    })

    setName("")
    setTargetAmount("")
    setCurrentAmount("0")
    setTargetDate("")
    setDescription("")
    onOpenChange(false)

    toast({
      title: "Success",
      description: "Savings goal created successfully",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Savings Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g., Emergency Fund, Vacation"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="goal-target">Target Amount</Label>
            <Input
              id="goal-target"
              type="number"
              placeholder="0.00"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="goal-current">Current Amount</Label>
            <Input
              id="goal-current"
              type="number"
              placeholder="0.00"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="goal-targetDate">Target Date (Optional)</Label>
            <Input
              id="goal-targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="goal-description">Description (Optional)</Label>
            <Textarea
              id="goal-description"
              placeholder="Add any details about your goal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Create Goal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
