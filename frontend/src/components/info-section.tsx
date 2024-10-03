import { BookOpen } from 'lucide-react'

export default function InfoSection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Why Donate?</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Promote literacy in your community
          </li>
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Give books a second life
          </li>
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Help those who can't afford new books
          </li>
          <li className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Clear space on your bookshelves
          </li>
        </ul>
      </div>
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="space-y-2">
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
            Sign up for an account
          </li>
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
            List the books you want to donate
          </li>
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
            Connect with local readers
          </li>
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
            Arrange a meetup to share your books
          </li>
        </ol>
      </div>
    </section>
  )
}