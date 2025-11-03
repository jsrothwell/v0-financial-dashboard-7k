"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface AddBillModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    name: string
    amount: number
    dueDate: string
    frequency: string
    category: string
    paid: boolean
  }) => void
}

export function AddBillModal({ open, onOpenChange, onSubmit }: AddBillModalProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0])
  const [frequency, setFrequency] = useState("monthly")
  const [category, setCategory] = useState("utilities")
  const [paid, setPaid] = useState(false)
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!name || !amount) {
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
      name,
      amount: numAmount,
      dueDate,
      frequency,
      category,
      paid,
    })

    setName("")
    setAmount("")
    setDueDate(new Date().toISOString().split("T")[0])
    setFrequency("monthly")
    setCategory("utilities")
    setPaid(false)
    onOpenChange(false)

    toast({
      title: "Success",
      description: "Bill added successfully",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Bill</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bill-name">Bill Name/Description</Label>
            <Input
              id="bill-name"
              placeholder="e.g., Netflix, Electric bill"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="bill-amount">Amount</Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="bill-dueDate">Due Date</Label>
            <Input id="bill-dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="bill-frequency">Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-time</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bill-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="subscriptions">Subscriptions</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="bill-paid">Paid</Label>
            <Switch id="bill-paid" checked={paid} onCheckedChange={setPaid} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Add Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
