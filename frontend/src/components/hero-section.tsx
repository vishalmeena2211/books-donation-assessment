import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

export default function HeroSection() {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Share the Joy of Reading</h1>
      <p className="text-xl mb-8">Donate your books and make a difference in someone's life.</p>
      <div className="flex justify-center space-x-4">
        <NavLink to={"/login"}><Button size="lg">Login</Button></NavLink>
        <NavLink to={"/signup"}><Button size="lg" variant="outline">Sign Up</Button></NavLink>
      </div>
    </section>
  )
}