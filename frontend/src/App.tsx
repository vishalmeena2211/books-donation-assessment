import { useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/hero-section"
import InfoSection from "./components/info-section"
import NewsletterSection from "./components/news-latter-section"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <>
      {/* <BookDonationForm/> */}
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <HeroSection />
          <InfoSection />
          <NewsletterSection />
        </main>
        <footer />
      </div>
    </>
  )
}

export default App
