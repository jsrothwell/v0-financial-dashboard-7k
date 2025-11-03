"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AddIncomeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    amount: number
    description: string
    date: string
    category: string
  }) => void
}

export function AddIncomeModal({ open, onOpenChange, onSubmit }: AddIncomeModalProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [category, setCategory] = useState("freelance")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!amount || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (numAmount <= 0) {
      toast({
        title: "Error",
        description: "Amount must be greater than 0",
        variant: "destructive",
      })
      return
    }

    onSubmit({
      amount: numAmount,
      description,
      date,
      category,
    })

    setAmount("")
    setDescription("")
    setDate(new Date().toISOString().split("T")[0])
    setCategory("freelance")
    onOpenChange(false)

    toast({
      title: "Success",
      description: "Income added successfully",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="income-amount">Amount</Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="income-description">Description/Source</Label>
            <Input
              id="income-description"
              placeholder="e.g., Freelance project, Side gig"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="income-date">Date</Label>
            <Input id="income-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="income-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Add Income
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
