import { BookOpen } from 'lucide-react'

export default function InfoSection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Why Donate?</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Help others read
          </li>
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Reuse books
          </li>
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Support those in need
          </li>
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Free up space
          </li>
        </ul>
      </div>
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="space-y-2">
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
            Sign up
          </li>
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
            List books
          </li>
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
            Connect
          </li>
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
            Share books
          </li>
        </ol>
      </div>
    </section>
  )
}