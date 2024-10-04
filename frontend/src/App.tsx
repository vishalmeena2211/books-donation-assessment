import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import PrivateRoute from "./components/auth/private-route";
import DonationFormPage from "./pages/donation-form-page";
import PublicRoute from "./components/auth/public-route";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DonationFormPage /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
