import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ReturnPage() {
  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Return a Book</CardTitle>
          <CardDescription>Enter the book details to process your return.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookId">Book ID</Label>
              <Input id="bookId" placeholder="Enter the book ID" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Book Condition</Label>
              <select id="condition" className="w-full h-10 px-3 rounded-md border border-input bg-background" required>
                <option value="">Select condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Process Return
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

