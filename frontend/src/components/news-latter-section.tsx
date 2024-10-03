import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  return (
    <section className="bg-muted p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
      <p className="mb-4">Stay updated with our latest events and book donations.</p>
      <form className="flex gap-2">
        <Input type="email" placeholder="Enter your email" className="max-w-sm" />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  )
}