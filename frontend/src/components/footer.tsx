import {NavLink} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BookOpen, Menu, LogIn, LogOut, UserPlus } from 'lucide-react'

type NavbarProps = {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

export default function Navbar({ isLoggedIn, onLogin, onLogout }: NavbarProps) {
  const NavItems = ({ isMobile = false }) => (
    <>
      <NavLink to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isMobile ? 'block py-2' : ''}`}>
        About
      </NavLink>
      <NavLink to="/donate" className={`text-sm font-medium transition-colors hover:text-primary ${isMobile ? 'block py-2' : ''}`}>
        Donate
      </NavLink>
      <NavLink to="/find-books" className={`text-sm font-medium transition-colors hover:text-primary ${isMobile ? 'block py-2' : ''}`}>
        Find Books
      </NavLink>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">BookShare</span>
        </NavLink>
        <div className="hidden md:flex md:space-x-4">
          <NavItems />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through BookShare
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                <NavItems isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
          {isLoggedIn ? (
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}