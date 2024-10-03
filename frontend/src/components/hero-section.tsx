import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Share the Joy of Reading</h1>
      <p className="text-xl mb-8">Donate your books and make a difference in someone's life.</p>
      <div className="flex justify-center space-x-4">
        <Button size="lg">Donate Books</Button>
        <Button size="lg" variant="outline">Find Books</Button>
      </div>
    </section>
  )
}